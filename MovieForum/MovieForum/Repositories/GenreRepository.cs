namespace MovieForum.Repositories;

public class GenreRepository : IGenreRepository<Genre>
{
    private HashSet<Genre> _genres = new();

    public GenreRepository()
    {
        SeedGenres();
    }

    private void SeedGenres()
    {
        _genres = new HashSet<Genre>()
        {
            new Genre("Horror"),
            new Genre("Gangster"),
            new Genre("Comedy"),
            new Genre("Drama"),
            new Genre("Romantic"),
            new Genre("Thriller"),
            new Genre("Crime"),
            new Genre("Fantasy"),
            new Genre("Sci-Fi"),
            new Genre("Biography"),
            new Genre("Action"),
            new Genre("Documentary"),
            new Genre("Short"),
            new Genre("Adventure"),
            new Genre("Animation"),
            new Genre("Musical"),
            new Genre("Family"),
            new Genre("Sport"),
            new Genre("Mystery"),
            new Genre("War"),
            new Genre("Western"),
        };
    }

    public HashSet<Genre> GetGenres()
    {
        return _genres.OrderBy(genre => genre.Name).ToHashSet();
    }
}