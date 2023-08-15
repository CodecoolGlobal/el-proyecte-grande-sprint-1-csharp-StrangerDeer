using System.Reflection;
using System.Transactions;
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
        var transaction = await _context.Database.BeginTransactionAsync();
        _context.movies.Add(movie);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
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
        var transaction = await _context.Database.BeginTransactionAsync();
        var movieToDelete = _context.movies.FirstOrDefault(movie => movie != null && movie.Id.Equals(Guid.Parse(id)));
        if (movieToDelete == null) return;
        _context.movies.Remove(movieToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
        
    }

    public async Task UpdateMovie(string id, Movie? updatedMovie)
    {
        var transaction = await _context.Database.BeginTransactionAsync();
        var movieToUpdate = await _context.movies.FirstOrDefaultAsync(movie => movie.Id.Equals(Guid.Parse(id)));
        if (movieToUpdate != null)
        {
            UpdateMovieProperties(movieToUpdate, updatedMovie);
        }
        await _context.SaveChangesAsync().ConfigureAwait(true);
        await transaction.CommitAsync();
    }

    private void UpdateMovieProperties(Movie movieToUpdate, Movie? updatedMovie)
    {
        PropertyInfo[] movieProperties = movieToUpdate.GetType().GetProperties();

        foreach (PropertyInfo movieProperty in movieProperties)
        {
            if (movieProperty.CanWrite
                && movieProperty.Name != "DateOfCreation")
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