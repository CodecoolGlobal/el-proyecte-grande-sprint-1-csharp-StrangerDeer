using Microsoft.AspNetCore.Cors;
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
            _movieService.GetAllMovies());

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
}