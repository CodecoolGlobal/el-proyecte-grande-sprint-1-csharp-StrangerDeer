using Microsoft.EntityFrameworkCore;

namespace MovieForum.Models;

public class MovieContext : DbContext
{
    public DbSet<Movie> movies { get; set; }
    public DbSet<Genre> genres { get; set; }
    public DbSet<GenreMovie> GenreMovies { get; set; }

    public MovieContext(DbContextOptions<MovieContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GenreMovie>().HasKey(gm => new { gm.GenreName, gm.MovieId });
    }

    
}