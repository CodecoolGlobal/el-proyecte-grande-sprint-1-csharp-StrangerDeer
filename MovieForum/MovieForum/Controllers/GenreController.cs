using Microsoft.AspNetCore.Cors;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using MovieForum.Services;

namespace MovieForum.Controllers;

[ApiController]
[Route("/api/genres")]
[Produces("application/json")] 
[EnableCors("AllowAllHeaders")]

public class GenreController : ControllerBase
{
    private readonly IMovieService _movieService;

    public GenreController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMovies()
    {
        List<Genre> genres = await _movieService.GetGenres();
        return Ok(genres);
    }
}