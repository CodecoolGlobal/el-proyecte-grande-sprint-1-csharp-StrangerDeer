using System.Reflection;
using Microsoft.EntityFrameworkCore;
using MovieForum.Models;

namespace MovieForum.Services;

public class MovieDbService : IMovieService
{
    private readonly MovieContext _context;

    public MovieDbService(MovieContext context)
    {
        _context = context;
    }
    
    public async Task<List<Movie?>> GetMovies()
    {
        return await _context.movies.ToListAsync().ConfigureAwait(true);
    }

    public async Task<string> AddNewMovie(Movie? movie)
    {
        _context.movies.Add(movie);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        return movie.Title;
    }

    public async Task<Movie?> GetMovieById(string id)
    {
        Movie? movie = await _context.movies
            .AsNoTracking()
            .Where(movie => movie != null && movie.Id.Equals(Guid.Parse(id)))
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);
        
        return movie;
    }

    public async Task DeleteMovieById(string id)
    {
        var movieToDelete = _context.movies.FirstOrDefault(movie => movie != null && movie.Id.Equals(Guid.Parse(id)));
        if (movieToDelete == null) return;
        _context.movies.Remove(movieToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        
    }

    public async Task UpdateMovie(string id, Movie? updatedMovie)
    {
        var movieToUpdate = await _context.movies.AsNoTracking()
            .Where(movie => movie != null && movie.Id.Equals(Guid.Parse(id)))
            .FirstOrDefaultAsync()
            .ConfigureAwait(true);

        if (movieToUpdate == null) return;

        var oldProperties = _context.Entry(movieToUpdate).CurrentValues;
        UpdateMovieProperties(movieToUpdate, updatedMovie);
        
        oldProperties.SetValues(movieToUpdate);
        
        await _context.SaveChangesAsync();
    }

    private void UpdateMovieProperties(Movie movieToUpdate, Movie? updatedMovie)
    {
        PropertyInfo[] movieProperties = movieToUpdate.GetType().GetProperties();

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