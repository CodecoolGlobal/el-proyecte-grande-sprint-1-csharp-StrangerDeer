namespace MovieForum.Services;

public interface IMovieService
{
    IEnumerable<Movie> GetMovies();
}