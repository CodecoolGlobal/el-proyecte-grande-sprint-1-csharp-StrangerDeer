using Microsoft.AspNetCore.Cors;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using MovieForum.Services;

namespace MovieForum.Controllers;

[ApiController]
[Route("/movies")]
[Produces("application/json")] 
[EnableCors("AllowAllHeaders")]

public class MovieController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MovieController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    public IActionResult GetAllMovies()
        => new JsonResult(
            _movieService.GetMovies());
    
    [Route("/add-new-movie")]
    [HttpPost]
    public IActionResult AddNewMovie([FromBody] JsonElement body)
    {
        var jsonObject = JsonSerializer.Deserialize<Movie>(body);
        _movieService.AddNewMovie(jsonObject);
        return Ok();

    }

    [HttpGet("{id}")]
    public IActionResult GetMovieById([FromRoute] string id)
    {
        var movieWithId = _movieService.GetMovieById(id);
        if (movieWithId == null)
        {
            return NotFound();
        }

        return Ok(movieWithId);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteMovieById([FromRoute] string id)
    {
        _movieService.DeleteMovieById(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult UpdateMovie([FromRoute] string id, [FromBody] JsonElement body)
    {
        var updatedMovie = JsonSerializer.Deserialize<Movie>(body);
        _movieService.UpdateMovie(id, updatedMovie);
        return Ok();
    }
}