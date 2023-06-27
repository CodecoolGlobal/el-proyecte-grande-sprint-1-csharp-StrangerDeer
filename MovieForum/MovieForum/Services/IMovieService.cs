namespace MovieForum.Services;

public interface IMovieService
{
    HashSet<Movie> GetAllMovies();
    Movie GetMovieById(string id);
}