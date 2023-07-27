namespace MovieForum.Services;

public interface IMovieService
{
    Task<List<Movie?>> GetMovies();
    Task<string> AddNewMovie(Movie? movie);
    Task<MovieInfo?> GetMovieById(string id);
    Task DeleteMovieById(string id);
    Task UpdateMovie(string id, MovieInfo updatedMovieInfoObj);
    public Task<List<Genre>> GetGenres();
}