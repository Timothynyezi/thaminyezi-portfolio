using Dapper;
using Npgsql;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public class SkillRepository : ISkillRepository
{
    private readonly NpgsqlConnection _conn;

    public SkillRepository(NpgsqlConnection conn)
    {
        _conn = conn;
    }

    public async Task<IEnumerable<SkillCategory>> GetAllAsync()
    {
        const string sql = @"
            SELECT sc.id, sc.category,
                   COALESCE(ARRAY_AGG(s.skill ORDER BY s.sort_order) FILTER (WHERE s.skill IS NOT NULL), '{}') AS skills
            FROM skill_categories sc
            LEFT JOIN skills s ON s.category_id = sc.id
            GROUP BY sc.id
            ORDER BY sc.sort_order";

        await _conn.OpenAsync();
        try
        {
            var rows = await _conn.QueryAsync<dynamic>(sql);
            return rows.Select(row => new SkillCategory
            {
                Id = (int)row.id,
                Category = (string)row.category,
                Skills = row.skills is string[] arr ? arr.ToList() : new List<string>()
            });
        }
        finally
        {
            await _conn.CloseAsync();
        }
    }
}
