namespace MovieForum;

public class CurrentUser
{
    
    public string UserName { get; set; }
    public string EmailAddress { get; set; }
    public string Role { get; set; }
    public string Badge { get; set; }
    
    public CurrentUser(string userName, string emailAddress, string role, string badge)
    {
        UserName = userName;
        EmailAddress = emailAddress;
        Role = role;
        Badge = badge;
    }
}