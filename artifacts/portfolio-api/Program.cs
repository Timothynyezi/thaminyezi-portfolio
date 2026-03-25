using Npgsql;
using PortfolioApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var connectionString = BuildConnectionString();

builder.Services.AddScoped<NpgsqlConnection>(_ => new NpgsqlConnection(connectionString));

static string BuildConnectionString()
{
    var host = Environment.GetEnvironmentVariable("PGHOST");
    var port = Environment.GetEnvironmentVariable("PGPORT") ?? "5432";
    var user = Environment.GetEnvironmentVariable("PGUSER");
    var password = Environment.GetEnvironmentVariable("PGPASSWORD");
    var database = Environment.GetEnvironmentVariable("PGDATABASE");

    if (!string.IsNullOrEmpty(host) && !string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(database))
        return $"Host={host};Port={port};Username={user};Password={password};Database={database};SSL Mode=Disable;";

    var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
    if (!string.IsNullOrEmpty(databaseUrl))
    {
        var uri = new Uri(databaseUrl);
        var userInfo = uri.UserInfo.Split(':');
        var dbPort = uri.Port > 0 ? uri.Port : 5432;
        return $"Host={uri.Host};Port={dbPort};Username={userInfo[0]};Password={userInfo[1]};Database={uri.AbsolutePath.TrimStart('/')};SSL Mode=Disable;";
    }

    throw new InvalidOperationException("Database connection environment variables are required.");
}
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ISkillRepository, SkillRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

using (var scope = app.Services.CreateScope())
{
    var conn = scope.ServiceProvider.GetRequiredService<NpgsqlConnection>();
    await DatabaseSeeder.SeedAsync(conn);
}

app.MapControllers();
app.MapGet("/api/healthz", () => Results.Ok(new { status = "ok" }));

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Run($"http://0.0.0.0:{port}");
