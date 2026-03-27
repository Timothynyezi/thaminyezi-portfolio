using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly NpgsqlConnection _conn;
    private static readonly string AdminPassword =
        Environment.GetEnvironmentVariable("ADMIN_PASSWORD") ?? "portfolio-admin-2024";

    public AdminController(NpgsqlConnection conn)
    {
        _conn = conn;
    }

    [HttpGet("messages")]
    public async Task<IActionResult> GetMessages([FromHeader(Name = "X-Admin-Password")] string? password)
    {
        if (password != AdminPassword)
            return Unauthorized(new { error = "Invalid password." });

        const string sql = @"
            SELECT id, name, email, message, created_at AS createdAt
            FROM contact_submissions
            ORDER BY created_at DESC";

        await _conn.OpenAsync();
        try
        {
            var rows = await _conn.QueryAsync<dynamic>(sql);
            var messages = rows.Select(r => new
            {
                id = (int)r.id,
                name = (string)r.name,
                email = (string)r.email,
                message = (string)r.message,
                createdAt = ((DateTime)r.createdat).ToString("yyyy-MM-dd HH:mm")
            });
            return Ok(messages);
        }
        finally
        {
            await _conn.CloseAsync();
        }
    }
}
