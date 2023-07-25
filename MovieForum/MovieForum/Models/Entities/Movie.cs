﻿using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.CompilerServices;

namespace MovieForum;

[PrimaryKey(nameof(Id))]

public class Movie
{
    public Guid Id { get; }
    public string Title { get; set; }
    public int ReleaseYear { get; set; }
    public string Story { get; set; }
    public double Ratings { get; set; }
    public DateTime DateOfCreation { get; set; }
    public string? MovieImage { get; set; }
    public string? Genre { get; set; }
    public Movie(string title, int releaseYear, string story, double ratings, DateTime dateOfCreation)
    {
        Id = Guid.NewGuid();
        Title = title;
        ReleaseYear = releaseYear;
        Story = story;
        Ratings = ratings;
        DateOfCreation = dateOfCreation;
        Genre = null;
        MovieImage = null;
    }
}