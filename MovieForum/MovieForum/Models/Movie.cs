using System.Runtime.CompilerServices;
using Microsoft.VisualBasic.CompilerServices;

namespace MovieForum;

public class Movie
{
    public string Title { get; set; }
    public Guid Id { get; }
    
    public double Ratings { get; set; }
    public int ReleaseYear { get; set; }
    

    public Movie(string title, int releaseYear, double ratings)
    {
        Id = Guid.NewGuid();
        Title = title;
        ReleaseYear = releaseYear;
        Ratings = ratings;
    }
}