namespace MovieForum.Repositories;

public interface IMovieRepository<T>
{
    HashSet<Movie> GetAllMovies();
}