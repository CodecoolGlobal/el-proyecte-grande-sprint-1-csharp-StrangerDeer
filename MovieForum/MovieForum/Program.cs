using Microsoft.AspNetCore.Http.Features;
using MovieForum;
using MovieForum.Repositories;
using MovieForum.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IMovieRepository<Movie>, MovieRepository>();
builder.Services.AddTransient<IMovieService, MovieService>();
builder.Services.Configure<FormOptions>(o => {  
    o.ValueLengthLimit = int.MaxValue;  
    o.MultipartBodyLengthLimit = long.MaxValue;  
    o.MemoryBufferThreshold = int.MaxValue;  
});  


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllHeaders",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

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