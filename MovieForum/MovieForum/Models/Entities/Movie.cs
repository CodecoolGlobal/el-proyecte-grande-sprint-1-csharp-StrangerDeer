using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.CompilerServices;

namespace MovieForum;

[PrimaryKey(nameof(Id))]

public class Movie
{
    public Guid Id { get; }
    public string Title { get; set; }
    public int ReleaseYear { get; set; }
    public string Story { get; set; }
    public double Ratings { get; set; }
    public DateTime DateOfCreation { get; set; } = DateTime.UtcNow;
    public string? MovieImage { get; set; }
    public HashSet<Genre> Genres { get; set; }
    public IList<GenreMovie> GenreMovies { get; set; }
    public Movie(string title, int releaseYear, string story, double ratings)
    {
        Id = Guid.NewGuid();
        Title = title;
        ReleaseYear = releaseYear;
        Story = story;
        Ratings = ratings;
        MovieImage = null;
        Genres = new();
    }
}