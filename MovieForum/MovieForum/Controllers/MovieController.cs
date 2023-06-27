using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using MovieForum.Services;

namespace MovieForum.Controllers;

[ApiController]
[Route("/movies")]

public class MovieController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MovieController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    public IEnumerable<Movie> GetMovies()
    {
        return _movieService.GetMovies();
    }

    [Route("/add-new-movie")]
    [HttpPost]
    public IActionResult AddNewMovie([FromBody] JsonElement body)
    {
        var jsonObject = JsonSerializer.Deserialize<Movie>(body);
        _movieService.AddNewMovie(jsonObject);
        return Ok();
    }
}