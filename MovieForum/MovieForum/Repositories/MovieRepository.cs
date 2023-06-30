using System.Reflection;

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
            new Movie("The Silence of the Lambs", 1991, "",10.00),
            new Movie("The Chainsaw Massacre", 1974, "", 4.00),
            new Movie("The Life of Brian", 1979, "", 6.00),
            new Movie("Doctor Strangelove - or How I Learned to Stop Worrying and Love the Bomb", 1964, "", 7.00),
            new Movie("South park - Bigger, Longer and Uncut", 2000, "", 8.00)
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

    public Movie GetMovieById(string id)
    {
        var movieWithId = _movies.FirstOrDefault(movie => movie.Id.Equals(Guid.Parse(id)));
        if (movieWithId == null) return null;
        return movieWithId;
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
