using Microsoft.EntityFrameworkCore;

namespace MovieForum;

[Keyless]
public class Genre
{
    public string Name { get; set; }

    public Genre(string name)
    {
        Name = name;
    }
}