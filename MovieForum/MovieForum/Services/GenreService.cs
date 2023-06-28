using MovieForum.Repositories;

namespace MovieForum.Services;

public class GenreService : IGenreService
{
    private readonly IGenreRepository<Genre> _genreRepository;

    public GenreService(IGenreRepository<Genre> genreRepository)
    {
        _genreRepository = genreRepository;
    }

    public HashSet<Genre> GetGenres() => _genreRepository.GetGenres();
}