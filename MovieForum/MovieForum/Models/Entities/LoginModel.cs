using System.ComponentModel.DataAnnotations;

namespace MovieForum;

public class LoginModel
{
    [Required]  
    public String Username { get; set; }  
  
    [Required]  
    public String Password { get; set; }  
}