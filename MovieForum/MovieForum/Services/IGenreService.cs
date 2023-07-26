namespace MovieForum.Services;

public interface IGenreService
{
    Task<List<Genre>> GetGenres();
}