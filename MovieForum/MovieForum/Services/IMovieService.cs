namespace MovieForum.Services;

public interface IMovieService
{
    Task<List<Movie?>> GetMovies();
    Task<string> AddNewMovie(Movie? movie);
    Task<Movie?> GetMovieById(string id);
    Task DeleteMovieById(string id);
    Task UpdateMovie(string id, Movie? updatedMovie);
    Task<UserModel?> AuthenticateUser(LoginModel loginModel);
    Task RegisterUser(RegisterModel registerModel);
    Task UpdateUserRatings(string username);
    Task<UserModel?> GetUserData(string username);
}