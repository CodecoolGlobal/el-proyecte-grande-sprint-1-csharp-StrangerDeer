using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MovieForum.Models;

public class MovieContext : IdentityDbContext<IdentityUser>
{
    public MovieContext(DbContextOptions<MovieContext> options) : base(options)
    {
        
    }

    public DbSet<Movie> movies { get; set; }
    public DbSet<Genre> genres { get; set; }
    public DbSet<User> users { get; set; }

}