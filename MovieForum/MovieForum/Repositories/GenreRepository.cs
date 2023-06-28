namespace MovieForum.Repositories;

public class GenreRepository : IGenreRepository<Genre>
{
    private HashSet<Genre> _genres;

    public GenreRepository()
    {
        SeedGenres();
    }

    private void SeedGenres()
    {
        _genres = new HashSet<Genre>()
        {
            new Genre("Horror"),
            new Genre("Gangster")
        };
    }

    public HashSet<Genre> GetGenres()
    {
        return _genres;
    }
}