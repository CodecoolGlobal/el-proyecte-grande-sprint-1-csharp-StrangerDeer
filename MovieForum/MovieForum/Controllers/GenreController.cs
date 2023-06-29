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
    private readonly IGenreService _genreService;

    public GenreController(IGenreService genreService)
    {
        _genreService = genreService;
    }

    [HttpGet]
    public IActionResult GetAllMovies()
        => new JsonResult(
            _genreService.GetGenres());
}