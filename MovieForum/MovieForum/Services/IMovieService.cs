namespace MovieForum.Services;

public interface IMovieService
{
    Task<List<Movie?>> GetMovies();
    Task<string> AddNewMovie(Movie? movie);
    Task<Movie?> GetMovieById(string id);
    Task DeleteMovieById(string id);
    Task UpdateMovie(string id, UpdatingMovie updatedMovieObj);
    public Task<List<Genre>> GetGenres();
}