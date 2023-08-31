using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MovieForum;
using MovieForum.Models;
using MovieForum.Repositories;
using MovieForum.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

//Connect db
builder.Services.AddDbContext<MovieContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IMovieRepository<Movie>, MovieRepository>();
builder.Services.AddSingleton<IGenreRepository<Genre>, GenreRepository>();
/*builder.Services.AddTransient<IMovieService, MovieService>();*/
builder.Services.AddTransient<IMovieService, MovieDbService>();
builder.Services.AddTransient<IGenreService, GenreService>();

builder.Services.AddHttpLogging(httpLogging =>
{
    httpLogging.LoggingFields = HttpLoggingFields.All;
});

builder.Services.Configure<FormOptions>(o => {  
    o.ValueLengthLimit = int.MaxValue;  
    o.MultipartBodyLengthLimit = long.MaxValue;  
    o.MemoryBufferThreshold = int.MaxValue;  
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };

        options.Events = new JwtBearerEvents()
        {
            OnMessageReceived = contex =>
            {
                contex.Token = contex.Request.Cookies["token"];
                return Task.CompletedTask;
            } 
        };
    });

builder.Services.AddMvc();
builder.Services.AddControllers();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAllHeaders");

app.UseHttpLogging();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();