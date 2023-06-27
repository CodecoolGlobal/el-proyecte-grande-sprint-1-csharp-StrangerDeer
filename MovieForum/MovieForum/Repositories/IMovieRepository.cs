namespace MovieForum.Repositories;

public interface IMovieRepository<T>
{

    HashSet<Movie> GetMovies();
    void AddNewMovie(Movie movie);
    Movie GetMovieById(string id);
}