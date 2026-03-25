namespace PortfolioApi.Models;

public class SkillCategory
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public List<string> Skills { get; set; } = new();
}
