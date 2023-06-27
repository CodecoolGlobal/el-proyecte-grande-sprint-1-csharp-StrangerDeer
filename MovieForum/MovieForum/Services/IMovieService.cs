namespace MovieForum.Services;

public interface IMovieService
{
    IEnumerable<Movie> GetMovies();
    void AddNewMovie(Movie movie);
}