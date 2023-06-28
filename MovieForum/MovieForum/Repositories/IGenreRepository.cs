namespace MovieForum.Repositories;

public interface IGenreRepository<T>
{
    HashSet<Genre> GetGenres();

}