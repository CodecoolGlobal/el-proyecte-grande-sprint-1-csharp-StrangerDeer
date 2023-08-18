using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MovieForum.Models;
using MovieForum.Models.Entities;

namespace MovieForum.Services;

public class MovieDbService : IMovieService
{
    private readonly MovieContext _context;

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

    public async Task<UserModel?> AuthenticateUser(LoginModel loginModel)
    {
        var currentUser = await _context.users.FirstOrDefaultAsync(user =>
            user.UserName == loginModel.Username && user.Password == loginModel.Password);
        return currentUser;
    }

    public async Task RegisterUser(RegisterModel registerModel)
    {
        if (!registerModel.Username.IsNullOrEmpty()
            && !registerModel.Password.IsNullOrEmpty()
            && !registerModel.EmailAddress.IsNullOrEmpty())
        {
            var newUser = new UserModel(registerModel.Username, registerModel.EmailAddress, "User", registerModel.Password);
            var transaction = await _context.Database.BeginTransactionAsync();
            _context.users.Add(newUser);
            await _context.SaveChangesAsync().ConfigureAwait(true);
            await transaction.CommitAsync();
        }
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
}