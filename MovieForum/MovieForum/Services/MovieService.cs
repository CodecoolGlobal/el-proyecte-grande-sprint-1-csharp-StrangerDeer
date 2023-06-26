using MovieForum.Repositories;

namespace MovieForum.Services;

public class MovieService : IMovieService
{
    
    private readonly IMovieRepository<Movie> _movieRepository;

    public MovieService(IMovieRepository<Movie> movieRepository)
    {
        _movieRepository = movieRepository;
    }
    public IEnumerable<Movie> GetMovies()
    {
        return _movieRepository.GetMovies();
    }
}