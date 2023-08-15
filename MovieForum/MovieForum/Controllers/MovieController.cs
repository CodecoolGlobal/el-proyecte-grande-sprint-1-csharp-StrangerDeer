using Microsoft.AspNetCore.Cors;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
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
    private readonly IWebHostEnvironment _environment;

    public MovieController(IMovieService movieService, IWebHostEnvironment environment)
    {
        _movieService = movieService;
        _environment = environment;
        

    }

    [HttpGet]
    public async Task<IActionResult> GetAllMovies()
    {
        List<Movie> movies = await _movieService.GetMovies();

        foreach (Movie? movie in movies)
        {
            movie!.MovieImage = GetImagesByMovie(movie.Id.ToString());
        }

        return Ok(movies);
    }

    [Route("/add-new-movie")]
    [HttpPost]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> AddNewMovie([FromBody] JsonElement body)
    {
        var jsonObject = JsonSerializer.Deserialize<Movie>(body);
        string title = await _movieService.AddNewMovie(jsonObject);
        return StatusCode(StatusCodes.Status200OK, $"{title} added");

    }

    [HttpGet("{id}")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> GetMovieById([FromRoute] string id)
    {
        var movieWithId = await _movieService.GetMovieById(id);
        if (movieWithId == null)
        {
            return NotFound();
        }

        movieWithId.MovieImage = GetImagesByMovie(id);

        return Ok(movieWithId);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "User")]
    public IActionResult DeleteMovieById([FromRoute] string id)
    {
        _movieService.DeleteMovieById(id);
        return Ok();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> UpdateMovie([FromRoute] string id, [FromBody] JsonElement body)
    {
        var updatedMovie = JsonSerializer.Deserialize<Movie>(body);
        await _movieService.UpdateMovie(id, updatedMovie);
        return Ok();
    }

    
    [HttpPost("{id}/uploadimage")]
    [Authorize(Roles = "User")]
    [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<ActionResult> UploadImage([FromRoute] string id)
    {
        
        bool results = false;

        try
        {
            var uploadedFiles = Request.Form.Files;
            foreach (IFormFile source in uploadedFiles)
            {
                string imgName = source.FileName;
                
                string filepath = GetFilePath(id);
                
                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                string imagepath = filepath + "\\" + imgName;

                if (System.IO.File.Exists(imagepath))
                {
                    System.IO.File.Delete(imagepath);
                }

                await using FileStream stream = System.IO.File.Create(imagepath);
                await source.CopyToAsync(stream);
                results = true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
        return Ok(results);
    }

    [NonAction]
    private string GetFilePath(string productCode)
    {
        return @"wwwroot/Uploads/Movie/" + productCode;
    }

    [NonAction]
    private string GetImagesByMovie(string movieId)
    {
        string imageUrl = string.Empty;
        string filePath = GetFilePath(movieId);
        string movieImgName = "";
       


        if(Directory.Exists(filePath))
        {
            movieImgName = Path.GetFileName(Directory.GetFiles(filePath)[0]);
            imageUrl = "/Uploads/Movie/" + movieId + "/" + movieImgName;
        }
        else
        {
            imageUrl = "Uploads/common/noImage.png";
        }
        
        return imageUrl;
    }
}