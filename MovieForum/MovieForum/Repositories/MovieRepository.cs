namespace MovieForum.Repositories;

public class MovieRepository : IMovieRepository<Movie>
{
    private IEnumerable<Movie> _movies;

    public MovieRepository()
    {
        SeedMovies();
    }

    private void SeedMovies()
    {
        _movies = new List<Movie>()
        {
            new Movie("Abc"),
            new Movie("Shark")
        };
    }

    public IEnumerable<Movie> GetMovies()
    {
        return _movies;
    }
}