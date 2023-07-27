using System.Collections;
using System.Reflection;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using MovieForum.Models;

namespace MovieForum.Services;

public class MovieDbService : IMovieService
{
    private readonly MovieContext _context;
    private readonly HashSet<Genre> _movieGenres;

    public MovieDbService(MovieContext context)
    {
        _context = context;
        _movieGenres = new HashSet<Genre>()
        {
            new("Horror"),
            new("Gangster"),
            new("Comedy"),
            new("Drama"),
            new("Romantic"),
            new("Thriller"),
            new("Crime"),
            new("Fantasy"),
            new("Sci-Fi"),
            new("Biography"),
            new("Action"),
            new("Documentary"),
            new("Short"),
            new("Adventure"),
            new("Animation"),
            new("Musical"),
            new("Family"),
            new("Sport"),
            new("Mystery"),
            new("War"),
            new("Western"),
        };
    }
    
    public async Task<List<Movie?>> GetMovies()
    {
        return await _context.movies.ToListAsync().ConfigureAwait(true);
    }

    public async Task<string> AddNewMovie(Movie? movie)
    {
        _context.movies.Add(movie);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        return movie.Title;
    }

    public async Task<MovieInfo?> GetMovieById(string id)
    {
        Movie? movie = await _context.movies
            .AsNoTracking()
            .Where(movie => movie != null && movie.Id.Equals(Guid.Parse(id)))
            .Include(movie => movie.Genres)
            .FirstOrDefaultAsync();

        MovieInfo movieInfo = convertMovieToMovieInfo(movie);

        return movieInfo;
    }

    public async Task DeleteMovieById(string id)
    {
        var movieToDelete = _context.movies.FirstOrDefault(movie => movie != null && movie.Id.Equals(Guid.Parse(id)));
        if (movieToDelete == null) return;
        _context.movies.Remove(movieToDelete);
        await _context.SaveChangesAsync().ConfigureAwait(true);
        
    }

    public async Task UpdateMovie(string id, MovieInfo updatedMovieInfoObj)
    {
        var movieToUpdate = await _context.movies.FirstOrDefaultAsync(movie => movie.Id.Equals(Guid.Parse(id)));
        Movie convertedMovie = await movieObjToMovieType(updatedMovieInfoObj);
        
        if (movieToUpdate != null)
        {
            UpdateMovieProperties(movieToUpdate, convertedMovie);
        }

        genreDbMoviesCoulumnUpdate(movieToUpdate);
        await _context.SaveChangesAsync().ConfigureAwait(true);
    }

    private MovieInfo convertMovieToMovieInfo(Movie movie)
    {
        MovieInfo movieInfo = new(
            movie.Title,
            movie.ReleaseYear,
            movie.Story,
            movie.Ratings
        );
        HashSet<string> movieInfoGenres = new HashSet<string>();
        foreach (var genre in movie.Genres)
        {
            movieInfoGenres.Add(genre.Name);
        }

        movieInfo.Genres = movieInfoGenres;

        return movieInfo;
    }
    private async void genreDbMoviesCoulumnUpdate(Movie movie)
    {
        HashSet<Genre> movieToUpdateGenres = movie.Genres;
        
        foreach (Genre updateMovieGenre in movieToUpdateGenres)
        {
            Genre genre = await _context.genres.FirstOrDefaultAsync(currGenre => currGenre.Name.Equals(updateMovieGenre.Name));
            if (!genre.Movies.Contains(movie))
            {
                genre.Movies.Add(movie);
                movie.Genres.Add(genre);
            }
        }
    }

    private async Task<Movie> movieObjToMovieType(MovieInfo movieInfoObj)
    {
        Movie newMovie = new(
            movieInfoObj.Title,
            movieInfoObj.ReleaseYear,
            movieInfoObj.Story,
            movieInfoObj.Ratings
            );
        newMovie.MovieImage = movieInfoObj.MovieImage;
        newMovie.Genres = await convertMovieObjGenre(movieInfoObj.Genres);

        return newMovie;
    }

    private async Task<HashSet<Genre>> convertMovieObjGenre(HashSet<string> movieObjGenres)
    {
        HashSet<Genre> movieGenres = new();
        foreach (var updatingGenre in movieObjGenres)
        {
            var foundGenre = await _context.genres.FirstOrDefaultAsync(genre => genre.Name.Equals(updatingGenre));
            movieGenres.Add(foundGenre);
        }

        return movieGenres;
    }

    private void UpdateMovieProperties(Movie movieToUpdate, Movie updatedMovie)
    {
        PropertyInfo[] movieProperties = movieToUpdate.GetType().GetProperties();

        foreach (PropertyInfo movieProperty in movieProperties)
        {
            if (movieProperty.CanWrite)
            {
                var newPropertyValue = movieProperty.GetValue(updatedMovie);
                movieProperty
                    .SetValue(movieToUpdate,
                        newPropertyValue,
                        null);
            }
        }
    }
    
    public async Task<List<Genre>> GetGenres()
    {
        fillGenresDb();
        return await _context.genres.ToListAsync().ConfigureAwait(true);
    }
    
    private async void fillGenresDb()
    {
        foreach (Genre genre in _movieGenres)
        {
            if (!_context.genres.Contains(genre))
            {
                _context.genres.Add(genre);
                await _context.SaveChangesAsync();
            }
        }
    }
}