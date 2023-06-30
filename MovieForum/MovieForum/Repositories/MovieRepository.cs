using System.Reflection;

namespace MovieForum.Repositories;

public class MovieRepository : IMovieRepository<Movie>
{
    private HashSet<Movie> _movies = SeedMovies();

    private static HashSet<Movie> SeedMovies()
    {
        return new HashSet<Movie>()
        {
            new Movie("The Godfather", 1972, "",3.00),
            new Movie("The Chainsaw Massacre", 1974, "", 4.00)
        };
    }

    public HashSet<Movie> GetMovies()
    {
        return _movies;
    }

    public void AddNewMovie(Movie movie)
    {
        _movies.Add(movie);
    }

    public Movie? GetMovieById(string id)
    {
        return _movies.FirstOrDefault(movie => movie.Id.Equals(Guid.Parse(id)));
    }

    public void DeleteMovieById(string id)
    {
        var movieToDelete = _movies.FirstOrDefault(movie => movie.Id.Equals(Guid.Parse(id)));
        if (movieToDelete == null) return;
        _movies.Remove(movieToDelete);
    }

    public void UpdateMovie(string id, Movie updatedMovie)
    {
        var movieToUpdate = _movies.FirstOrDefault(movie => movie.Id.Equals(Guid.Parse(id)));
        if (movieToUpdate == null) return;
        PropertyInfo[] movieProperties = movieToUpdate.GetType().GetProperties();
        
        UpdateMovieProperties(movieProperties, movieToUpdate, updatedMovie);
    }

    private void UpdateMovieProperties(PropertyInfo[] movieProperties, Movie movieToUpdate, Movie updatedMovie)
    {
        foreach (PropertyInfo movieProperty in movieProperties)
        {
            if (movieProperty.CanWrite)
            {
                var newPropertyValue = movieProperty.GetValue(updatedMovie);
                movieProperty
                    .SetValue(movieToUpdate,
                        newPropertyValue,
                        null);
            }
        }
    }
}
