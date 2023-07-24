using System.Runtime.CompilerServices;
using Microsoft.VisualBasic.CompilerServices;

namespace MovieForum;

public class Movie
{
    public Guid Id { get; }
    public string Title { get; set; }
    public int ReleaseYear { get; set; }
    public string Story { get; set; }
    public double Ratings { get; set; }
    public string? MovieImage { get; set; }
    public string? Genre { get; set; }
    public Movie(string title, int releaseYear, string story, double ratings)
    {
        Id = Guid.NewGuid();
        Title = title;
        ReleaseYear = releaseYear;
        Story = story;
        Ratings = ratings;
        Genre = null;
        MovieImage = null;
    }
}