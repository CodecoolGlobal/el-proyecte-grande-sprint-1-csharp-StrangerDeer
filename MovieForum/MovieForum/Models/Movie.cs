using System.Runtime.CompilerServices;
using Microsoft.VisualBasic.CompilerServices;

namespace MovieForum;

public class Movie
{
    public Guid Id { get; }
    public string Title { get; }
    
    public int Releaseyear { get; }
    

    public Movie(string title, int releaseyear)
    {
        Id = Guid.NewGuid();
        Title = title;
        Releaseyear = releaseyear;
    }
}