using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using MovieForum;
using MovieForum.Models;
using MovieForum.Repositories;
using MovieForum.Services;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.Configure<FormOptions>(o => {  
    o.ValueLengthLimit = int.MaxValue;  
    o.MultipartBodyLengthLimit = long.MaxValue;  
    o.MemoryBufferThreshold = int.MaxValue;  
});  

builder.Services.AddTransient<IGenreService, GenreService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAllHeaders");


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();