using Microsoft.EntityFrameworkCore;
using MovieForum.Models;

namespace MovieForum.Services;

public class GenreDbService : IGenreService
{
    private readonly MovieContext _context;
    
    public GenreDbService(MovieContext context)
    {
        _context = context;
    }
    public async Task<List<Genre>> GetGenres()
    {
        return await _context.genres.ToListAsync().ConfigureAwait(true);
    }
}