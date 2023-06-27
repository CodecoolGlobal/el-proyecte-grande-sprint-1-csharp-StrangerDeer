namespace MovieForum.Services;

public interface IMovieService
{
    HashSet<Movie> GetMovies();
    void AddNewMovie(Movie movie);
}