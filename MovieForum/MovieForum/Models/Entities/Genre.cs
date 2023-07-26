using Microsoft.EntityFrameworkCore;

namespace MovieForum;

[PrimaryKey(nameof(Name))]
public class Genre
{
    public string Name { get; set; }
    public HashSet<Movie> Movies { get; set; } = new();

    public Genre(string name)
    {
        Name = name;
    }
}