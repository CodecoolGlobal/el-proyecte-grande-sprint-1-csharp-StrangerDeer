using Microsoft.EntityFrameworkCore;

namespace MovieForum.Models;

public class MovieContext : DbContext
{
    public DbSet<Movie> movies { get; set; }
    public DbSet<Genre> genres { get; set; }

    public MovieContext(DbContextOptions<MovieContext> options) : base(options)
    {
        
    }
    

}