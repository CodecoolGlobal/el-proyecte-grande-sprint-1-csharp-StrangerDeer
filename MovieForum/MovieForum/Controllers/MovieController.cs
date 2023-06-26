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
    public IActionResult GetMovies()
        => new JsonResult(
            _movieService.GetMovies());
}