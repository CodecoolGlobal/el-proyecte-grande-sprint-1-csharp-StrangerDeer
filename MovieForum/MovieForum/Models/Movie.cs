namespace MovieForum;

public class Movie
{
    public string Title { get; }
    public Guid Id { get; }

    public Movie(string title)
    {
        Title = title;
        Id = Guid.NewGuid();
    }
}