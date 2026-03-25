namespace PortfolioApi.Models;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Language { get; set; }
    public string GithubUrl { get; set; } = string.Empty;
    public int Stars { get; set; }
    public bool Featured { get; set; }
    public List<string> Tags { get; set; } = new();
    public string UpdatedAt { get; set; } = string.Empty;
}
