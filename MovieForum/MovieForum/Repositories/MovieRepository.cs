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

    public HashSet<Movie> GetMovies()
    {
        return _movies;
    }
}