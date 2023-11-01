using System.Reflection;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MovieForum.Models;
using MovieForum.Models.Entities;
using Exception = System.Exception;

namespace MovieForum.Services;

public class MovieDbService : IMovieService
{
    private readonly MovieContext _context;
    private static readonly string ErrorMessageSpace = "// ";
    public MovieDbService(MovieContext context)
    {
        _context = context;
    }
    
    public async Task<List<Movie>> GetMovies()
    {
        return await _context.movies.ToListAsync().ConfigureAwait(true);
    }


    public async Task<string> AddNewMovie(Movie movie)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        _context.movies.Add(movie);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
        return movie.Title;
    }

    public async Task<Movie?> GetMovieById(string id)
    {
        if (id.IsNullOrEmpty())
        {
            return null;
        }
        var movie = await _context.movies
            .AsNoTracking()
            .Where(movie => movie.Id.Equals(Guid.Parse(id)))
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);
        return movie;
    }

    public async Task DeleteMovieById(string id)
    {
        /*var transaction = await _context.Database.BeginTransactionAsync();*/
        var movieToDelete = _context.movies.FirstOrDefault(movie => movie.Id.Equals(Guid.Parse(id)));
        if (movieToDelete == null) return;
        _context.movies.Remove(movieToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        /*await transaction.CommitAsync();*/
        
    }

    public async Task UpdateMovie(string id, Movie updatedMovie)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var movieToUpdate = await _context.movies.FirstOrDefaultAsync(movie => movie.Id.Equals(Guid.Parse(id)));
        if (movieToUpdate != null)
        {
            UpdateMovieProperties(movieToUpdate, updatedMovie);
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    private void UpdateMovieProperties(Movie movieToUpdate, Movie updatedMovie)
    {
        PropertyInfo[] movieProperties = movieToUpdate.GetType().GetProperties();

        foreach (PropertyInfo movieProperty in movieProperties)
        {
            if (movieProperty.CanWrite
                && movieProperty.Name != "DateOfCreation")
            {
                var newPropertyValue = movieProperty.GetValue(updatedMovie);
                movieProperty
                    .SetValue(movieToUpdate,
                        newPropertyValue,
                        null);
            }
        }
    }

    public async Task<UserModel> AuthenticateUser(LoginModel loginModel)
    {
        UserModel? currentUser = await _context.users.FirstOrDefaultAsync(user =>
            user.UserName == loginModel.Username);

        if (currentUser == null)
        {
            throw new Exception("User not found");
        }

        if (!BCrypt.Net.BCrypt.EnhancedVerify(loginModel.Password, currentUser.Password))
        {
            throw new Exception("Wrong Password");
        }
        
        return currentUser;
    }

    public async Task RegisterUser(RegisterModel registerModel)
    {

        if (registerModel.Username.IsNullOrEmpty()
            || registerModel.EmailAddress.IsNullOrEmpty()
            || registerModel.Password.IsNullOrEmpty()
            || registerModel.PasswordConfirmation.IsNullOrEmpty())
        {
            throw new Exception("One of the field is empty");
        }

        await UsernameValidator(registerModel.Username);
        UserPasswordValidator(registerModel.Password, registerModel.PasswordConfirmation);
        
        string password = BCrypt.Net.BCrypt.EnhancedHashPassword(registerModel.Password);

       
        var newUser = new UserModel(registerModel.Username, registerModel.EmailAddress, "User", password);
        _context.users.Add(newUser);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        
    }

    public async Task UpdateUserRatings(string username)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var userToUpdate = await _context.users.FirstOrDefaultAsync(user => user.UserName == username);
        if (userToUpdate != null)
        {
            userToUpdate.Rates++;
            UpdateUserBadge(userToUpdate);
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    public async Task<UserModel?> GetUserData(string username)
    {
        if (username.IsNullOrEmpty())
        {
            return null;
        }
        var user = await _context.users
            .AsNoTracking()
            .Where(user => user.UserName == username)
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);
        return user;
    }

    private void UpdateUserBadge(UserModel user)
    {
        int userRatings = user.Rates;
        switch (userRatings)
        {
            case 1:
                user.Badge = "First Time?";
                break;
            case 2:
                user.Badge = "Casual";
                break;
            case 3:
                user.Badge = "Experimentalist";
                break;
            case 4:
                user.Badge = "Movie Enthusiast";
                break;
            case 5:
                user.Badge = "Binge-Watcher";
                break;
        }

        if (userRatings > 5)
        {
            user.Badge = "Movie Guru";
        }
    }

    private async Task UsernameValidator(string username)
    {
        bool isUsernameHasSpace = username.Contains(" ");
        bool isUsernameLessMinLength = username.Length < 4;
        bool isUsernameMoreMaxLength = username.Length > 25;
        bool isUsernameExists = await _context.users.FirstOrDefaultAsync(user => user.UserName.Equals(username)) == null;

        List<string> messages = new List<string>();

        if (isUsernameHasSpace)
        {
            messages.Add("Username cannot contain space");
        }

        if (isUsernameLessMinLength)
        {
            messages.Add("Username has to be minimum 4 characters");
        }

        if (isUsernameMoreMaxLength)
        {
            messages.Add("Username can be maximum 25 characters");
        }
        
        if (!isUsernameExists)
        {
            messages.Add("Username already exists");
        }

        if (messages.Count > 0)
        {
            throw new Exception(string.Join(ErrorMessageSpace, messages));
        }

    }

    private void UserPasswordValidator(string password, string confirmPassword)
    {
        bool isPasswordHasSpace = password.Contains(" ");
        bool isPasswordLessMinLength = password.Length < 8;
        bool isPasswordContainsUppercase = password.Any(char.IsUpper);
        bool isPasswordContainsLowercase = password.Any(char.IsLower);
        bool isPasswordContainsNumber = password.Any(char.IsDigit);
        bool isPasswordContainsSpecialCharacter = password.Any(ch => Char.IsPunctuation(ch) || Char.IsSymbol(ch));
        bool isPasswordMatchConfirmPassword = password.Equals(confirmPassword);

        List<string> messages = new List<string>();

        if (isPasswordHasSpace)
        {
            messages.Add("Password cannot contain space");
        }

        if (isPasswordLessMinLength)
        {
            messages.Add("Password has to be minimum 8 characters");
        }

        if (!isPasswordContainsUppercase)
        {
            messages.Add("Password must have at least one uppercase character");
        }
        
        if (!isPasswordContainsLowercase)
        {
            messages.Add("Password must have at least one lowercase character");
        }
        
        if (!isPasswordContainsNumber)
        {
            messages.Add("Password must have at least one number");
        }
        
        if (!isPasswordContainsSpecialCharacter)
        {
            messages.Add("Password must have at least one special character like: ;, !, ?, ), (");
        }
        
        if (!isPasswordMatchConfirmPassword)
        {
            messages.Add("Confirm password is not matching with password");
        }

        if (messages.Count > 0)
        {
            string errorMessages = string.Join(ErrorMessageSpace, messages);
            throw new Exception(errorMessages);
        }
    }
}