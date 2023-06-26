namespace MovieForum.Repositories;

public interface IMovieRepository<T>
{
    IEnumerable<Movie> GetMovies();
}