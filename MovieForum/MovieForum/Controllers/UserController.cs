using System.IdentityModel.Tokens.Jwt;
using System.Net.Security;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieForum.Services;

namespace MovieForum.Controllers;


[ApiController]
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
    [HttpPost("/registration")]
    public async Task<IActionResult> Registration([FromBody] RegisterModel registerModel)
    {
        await _movieService.RegisterUser(registerModel);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("/login")]
    public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
    {
        var user = await _movieService.AuthenticateUser(loginModel);

        if (user != null)
        {
            var token = GenerateToken(user);
            return Ok(token);
        }

        return NotFound("User not found");
    }

    private string GenerateToken(UserModel userModel)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userModel.UserName),
            new Claim(ClaimTypes.Email, userModel.EmailAddress),
            new Claim(ClaimTypes.Role, userModel.Role)
        };

        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpGet("/current_user")]
    public IActionResult GetCurrentUser()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;

        if (identity != null)
        {
            var userClaims = identity.Claims;
            CurrentUser user = new CurrentUser(
                userClaims.FirstOrDefault(user => user.Type == ClaimTypes.NameIdentifier)?.Value,
                userClaims.FirstOrDefault(user => user.Type == ClaimTypes.Email)?.Value,
                userClaims.FirstOrDefault(user => user.Type == ClaimTypes.Role)?.Value);
            

            return Ok(user);

        }
        return null;
    }
}