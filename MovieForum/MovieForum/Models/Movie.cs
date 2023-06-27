using System.Runtime.CompilerServices;
using Microsoft.VisualBasic.CompilerServices;

namespace MovieForum;

public class Movie
{
    public string Title { get; set; }
    public Guid Id { get; }
    
    public int ReleaseYear { get; }
    

    public Movie(string title, int releaseYear)
    {
        Id = Guid.NewGuid();
        Title = title;
        ReleaseYear = releaseYear;
    }
}