using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieForum.Models.Entities;
using MovieForum.Services;

namespace MovieForum.Controllers;


[ApiController]
[Route("api/user")]
[Produces("application/json")]
[EnableCors("AllowAllHeaders")]
public class UserController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IMovieService _movieService;

    public UserController(IConfiguration configuration, IMovieService movieService)
    {
        _configuration = configuration;
        _movieService = movieService;
    }

    [AllowAnonymous]
    [HttpPost("registration")]
    public async Task<IActionResult> Registration([FromBody] RegisterModel registerModel)
    {
        await _movieService.RegisterUser(registerModel);
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
    {
        try
        {
            UserModel user = await _movieService.AuthenticateUser(loginModel);
            
            var token = GenerateToken(user);
            HttpContext.Response.Cookies.Append("token", token);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
        
    }

    [Authorize(Roles = "User")]
    [HttpPost("logout")]
    public IActionResult Logout()
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
        if (currentUser != null)
        {
            return Ok(currentUser);
        }

        return BadRequest("Couldn't find user");
    }

    [Authorize(Roles = "User")]
    [HttpGet("current_user/{username}")]
    public async Task<IActionResult> GetUserData([FromRoute] string username)
    {
        
        bool usernameCheck = !username.IsNullOrEmpty();
        if (usernameCheck)
        {
            var currentUser = await _movieService.GetUserData(username);
            return Ok(currentUser);
        }

        return BadRequest("Username not found");
    }

    [NonAction]
    private CurrentUser? GetCurrentUser()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if (identity == null)
        {
            return null;
        }

        if (identity.Claims.Any())
        {
            var userClaims = identity.Claims;
            var username = identity.FindFirst(user => user.Type == ClaimTypes.NameIdentifier)?.Value;
            var emailAddress = identity.FindFirst(user => user.Type == ClaimTypes.Email)?.Value;
            var role = identity.FindFirst(user => user.Type == ClaimTypes.Role)?.Value;
            var badge = identity.FindFirst(user => user.Type == ClaimTypes.Gender)?.Value;

            if (username == null || emailAddress == null || role == null ||
                badge == null)
            {
                return null;
            }
            return new CurrentUser(username, emailAddress, role, badge);
        }

        return null;
    }
}