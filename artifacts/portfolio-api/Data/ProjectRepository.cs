using Dapper;
using Npgsql;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public class ProjectRepository : IProjectRepository
{
    private readonly NpgsqlConnection _conn;

    public ProjectRepository(NpgsqlConnection conn)
    {
        _conn = conn;
    }

    public async Task<IEnumerable<Project>> GetAllAsync()
    {
        const string sql = @"
            SELECT p.id, p.name, p.description, p.language, p.github_url AS GithubUrl,
                   p.stars, p.featured, p.updated_at AS UpdatedAt,
                   COALESCE(ARRAY_AGG(t.tag) FILTER (WHERE t.tag IS NOT NULL), '{}') AS tags
            FROM projects p
            LEFT JOIN project_tags t ON t.project_id = p.id
            GROUP BY p.id
            ORDER BY p.featured DESC, p.updated_at DESC";

        var projectDict = new Dictionary<int, Project>();

        await _conn.OpenAsync();
        try
        {
            var rows = await _conn.QueryAsync<dynamic>(sql);
            foreach (var row in rows)
            {
                var project = new Project
                {
                    Id = (int)row.id,
                    Name = (string)row.name,
                    Description = (string)row.description,
                    Language = row.language is DBNull ? null : (string?)row.language,
                    GithubUrl = (string)row.githuburl,
                    Stars = (int)row.stars,
                    Featured = (bool)row.featured,
                    UpdatedAt = ((DateTime)row.updatedat).ToString("yyyy-MM-dd"),
                    Tags = row.tags is string[] tagArr ? tagArr.ToList() : new List<string>()
                };
                projectDict[project.Id] = project;
            }
        }
        finally
        {
            await _conn.CloseAsync();
        }

        return projectDict.Values;
    }
}
