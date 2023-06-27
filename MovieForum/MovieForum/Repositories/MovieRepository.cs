namespace MovieForum.Repositories;

public class MovieRepository : IMovieRepository<Movie>
{
    private HashSet<Movie> _movies;

    public MovieRepository()
    {
        SeedMovies();
    }

    private void SeedMovies()
    {
        _movies = new HashSet<Movie>()
        {
            new Movie("Abc"),
            new Movie("Shark")
        };
    }

    public HashSet<Movie> GetAllMovies()
    {
        return _movies;
    }

    public Movie GetMovieById(string id)
    {
        return _movies.FirstOrDefault(movie => movie.Id.Equals(id));
    }
}