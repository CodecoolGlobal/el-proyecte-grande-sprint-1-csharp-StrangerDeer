namespace MovieForum.Services;

public interface IMovieService
{
    HashSet<Movie?> GetMovies();
    void AddNewMovie(Movie? movie);
    Movie? GetMovieById(string id);
    void DeleteMovieById(string id);
    void UpdateMovie(string id, Movie? updatedMovie);
}