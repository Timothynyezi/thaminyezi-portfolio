using Dapper;
using Npgsql;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public class ContactRepository : IContactRepository
{
    private readonly NpgsqlConnection _conn;

    public ContactRepository(NpgsqlConnection conn)
    {
        _conn = conn;
    }

    public async Task SaveAsync(ContactSubmission submission)
    {
        const string sql = @"
            INSERT INTO contact_submissions (name, email, message, created_at)
            VALUES (@Name, @Email, @Message, @CreatedAt)";

        await _conn.OpenAsync();
        try
        {
            await _conn.ExecuteAsync(sql, submission);
        }
        finally
        {
            await _conn.CloseAsync();
        }
    }
}
