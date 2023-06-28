namespace MovieForum.Services;

public interface IGenreService
{
    HashSet<Genre> GetGenres();
}