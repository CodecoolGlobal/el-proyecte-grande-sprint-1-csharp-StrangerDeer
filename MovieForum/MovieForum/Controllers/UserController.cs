using System.IdentityModel.Tokens.Jwt;
using System.Net.Security;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieForum.Services;

namespace MovieForum.Controllers;


[ApiController]
[Route("api/user")]
[Produces("application/json")] 
[EnableCors("AllowAllHeaders")]
public class UserController : ControllerBase
{
    private IConfiguration _configuration;
    private readonly IMovieService _movieService;

    public UserController(IConfiguration configuration, IMovieService movieService)
    {
        _configuration = configuration;
        _movieService = movieService;
    }

    [AllowAnonymous]
    [HttpPost("registrationXX")]
    public async Task<IActionResult> Registration([FromBody] RegisterModel registerModel)
    {
        Console.WriteLine("Hello");
        await _movieService.RegisterUser(registerModel);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
    {
        var user = await _movieService.AuthenticateUser(loginModel);

        if (user != null)
        {
            var token = GenerateToken(user);
            HttpContext.Response.Cookies.Append("token", token);
            return Ok();
        }

        return NotFound("User not found");
    }

    [Authorize(Roles = "User")]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        HttpContext.Response.Cookies.Delete("token");
        return Ok();
    }

    private string GenerateToken(UserModel userModel)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userModel.UserName),
            new Claim(ClaimTypes.Email, userModel.EmailAddress),
            new Claim(ClaimTypes.Role, userModel.Role),
            new Claim(ClaimTypes.Gender, userModel.Badge)
        };

        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPut("{username}")]
    public async Task<IActionResult> UpdateRatings([FromRoute] string username)
    {
        await _movieService.UpdateUserRatings(username);
        return Ok();
    } 

    [Authorize(Roles = "User")]
    [HttpGet("current_user")]
    public IActionResult UserEndpoint()
    {
        var currentUser = GetCurrentUser();
        return Ok(currentUser);
    }

    [Authorize(Roles = "User")]
    [HttpGet("current_user_data/{username}")]
    public IActionResult GetUserData([FromRoute] string username)
    {
        return Ok(_movieService.GetUserData(username));
    }

    [NonAction]
    private CurrentUser GetCurrentUser()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;

        if (identity != null && identity.Claims.Any()) 
        {
            var userClaims = identity.Claims;

            return new CurrentUser(userClaims.FirstOrDefault(user => user.Type == ClaimTypes.NameIdentifier)?.Value,
                userClaims.FirstOrDefault(user => user.Type == ClaimTypes.Email)?.Value,
                userClaims.FirstOrDefault(user => user.Type == ClaimTypes.Role)?.Value,
                userClaims.FirstOrDefault(user => user.Type == ClaimTypes.Gender)?.Value);

        }
        return null;
    }
}