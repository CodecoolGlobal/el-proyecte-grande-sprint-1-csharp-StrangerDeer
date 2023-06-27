using MovieForum.Repositories;

namespace MovieForum.Services;

public class MovieService : IMovieService
{
    
    private readonly IMovieRepository<Movie> _movieRepository;

    public MovieService(IMovieRepository<Movie> movieRepository)
    {
        _movieRepository = movieRepository;
    }
    public HashSet<Movie> GetMovies()
    {
        return _movieRepository.GetMovies();
    }

    public Movie GetMovieById(string id)
    {
        return _movieRepository.GetMovieById(id);
    }

    public void DeleteMovieById(string id) => _movieRepository.DeleteMovieById(id);
    public void UpdateMovie(string id, Movie updatedMovie) => _movieRepository.UpdateMovie(id, updatedMovie);

    public void AddNewMovie(Movie movie) => _movieRepository.AddNewMovie(movie);
}