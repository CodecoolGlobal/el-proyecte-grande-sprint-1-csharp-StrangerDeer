﻿using System.ComponentModel.DataAnnotations.Schema;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace MovieForum;


[PrimaryKey(nameof(UserName))]
public class UserModel
{
    public string UserName { get; set; }
    public string EmailAddress { get; set; }
    public string Role { get; set; }
    public string Password { get; set; }
    public int Rates { get; set; }
    public string Badge { get; set; }

    public UserModel(string userName, string emailAddress, string role, string password)
    {
        UserName = userName;
        EmailAddress = emailAddress;
        Role = role;
        Password = password;
        Rates = 0;
        Badge = "Newbie";
    }
}