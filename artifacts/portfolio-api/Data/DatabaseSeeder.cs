using Dapper;
using Npgsql;

namespace PortfolioApi.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(NpgsqlConnection conn)
    {
        await conn.OpenAsync();
        try
        {
            await CreateTablesAsync(conn);
            await SeedSkillsAsync(conn);
            await SeedProjectsAsync(conn);
        }
        finally
        {
            await conn.CloseAsync();
        }
    }

    private static async Task CreateTablesAsync(NpgsqlConnection conn)
    {
        await conn.ExecuteAsync(@"
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                language VARCHAR(100),
                github_url VARCHAR(500) NOT NULL,
                stars INTEGER DEFAULT 0,
                featured BOOLEAN DEFAULT FALSE,
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS project_tags (
                id SERIAL PRIMARY KEY,
                project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
                tag VARCHAR(100) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS skill_categories (
                id SERIAL PRIMARY KEY,
                category VARCHAR(255) NOT NULL,
                sort_order INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS skills (
                id SERIAL PRIMARY KEY,
                category_id INTEGER REFERENCES skill_categories(id) ON DELETE CASCADE,
                skill VARCHAR(255) NOT NULL,
                sort_order INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS contact_submissions (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            );
        ");
    }

    private static async Task SeedSkillsAsync(NpgsqlConnection conn)
    {
        var count = await conn.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM skill_categories");
        if (count > 0) return;

        var categories = new[]
        {
            (1, "Primary Language", new[] { "C# (.NET)" }),
            (2, "Other Languages", new[] { "Java", "Python", "JavaScript" }),
            (3, "Web Technologies", new[] { "HTML5", "CSS3", "TypeScript" }),
            (4, "Real-Time / Networking", new[] { "SignalR", "WebSockets" }),
            (5, "Databases", new[] { "SQL (Relational)", "NoSQL", "PostgreSQL", "Database Design" }),
            (6, "Data Engineering", new[] { "ETL Pipelines", "Apache Spark", "Apache Kafka", "Apache Airflow" }),
            (7, "Cloud & Storage", new[] { "Amazon S3", "HDFS", "Docker" }),
            (8, "Version Control", new[] { "Git", "GitHub" }),
            (9, "Methodologies", new[] { "OOP", "Agile/Scrum", "Systems Analysis" }),
            (10, "Currently Learning", new[] { "ASP.NET Core Web API", "SQL Server", "Microsoft Azure" })
        };

        foreach (var (order, category, skills) in categories)
        {
            var categoryId = await conn.ExecuteScalarAsync<int>(
                "INSERT INTO skill_categories (category, sort_order) VALUES (@Category, @Order) RETURNING id",
                new { Category = category, Order = order });

            for (int i = 0; i < skills.Length; i++)
            {
                await conn.ExecuteAsync(
                    "INSERT INTO skills (category_id, skill, sort_order) VALUES (@CategoryId, @Skill, @Order)",
                    new { CategoryId = categoryId, Skill = skills[i], Order = i });
            }
        }
    }

    private static async Task SeedProjectsAsync(NpgsqlConnection conn)
    {
        var count = await conn.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM projects");
        if (count > 0) return;

        var projects = new[]
        {
            new {
                Name = "Real-Time Docs Clone",
                Description = "A real-time collaborative document editor inspired by Google Docs, built with C# and .NET. Implements a SignalR hub to broadcast document changes to connected clients in real time with WebSocket-based communication.",
                Language = "C#",
                Url = "https://github.com/Timothynyezi/real-time-docs-clone",
                Stars = 0,
                Featured = true,
                Updated = new DateTime(2026, 3, 18),
                Tags = new[] { "C#", ".NET", "SignalR", "WebSockets", "Real-Time" }
            },
            new {
                Name = "Calculator with File Persistence",
                Description = "A console-based calculator that persists calculation history to a text file across sessions. Demonstrates multi-file architecture, separation of concerns, and robust input validation with file I/O.",
                Language = "C#",
                Url = "https://github.com/Timothynyezi/Calculator",
                Stars = 0,
                Featured = true,
                Updated = new DateTime(2026, 3, 19),
                Tags = new[] { "C#", ".NET", "File I/O", "Console App" }
            },
            new {
                Name = "Math Game Console Application",
                Description = "An interactive console math quiz game built to solidify C# fundamentals. Features multiple game modes, score tracking, result history display, and timed randomized gameplay.",
                Language = "C#",
                Url = "https://github.com/Timothynyezi/Math-Game",
                Stars = 0,
                Featured = true,
                Updated = new DateTime(2026, 3, 14),
                Tags = new[] { "C#", ".NET", "Game", "Console App" }
            },
            new {
                Name = "Movie Data Pipeline",
                Description = "A data engineering pipeline project for processing movie data. Demonstrates ETL pipeline design and data transformation skills acquired during the Data Engineering specialisation.",
                Language = "Python",
                Url = "https://github.com/Timothynyezi/movie-pipeline",
                Stars = 0,
                Featured = true,
                Updated = new DateTime(2025, 10, 30),
                Tags = new[] { "Python", "Data Engineering", "ETL", "Pipeline" }
            },
            new {
                Name = "Codecrafters Grep (Java)",
                Description = "Building a custom grep implementation in Java to deepen understanding of regular expressions. A pet project focused on sharpening Java skills through practical systems programming.",
                Language = "Java",
                Url = "https://github.com/Timothynyezi/codecrafters-grep-java",
                Stars = 0,
                Featured = false,
                Updated = new DateTime(2025, 9, 18),
                Tags = new[] { "Java", "Regex", "Systems Programming" }
            },
            new {
                Name = "Etch-a-Sketch",
                Description = "A browser-based Etch-a-Sketch drawing application built with JavaScript. An Odin Project exercise to practice DOM manipulation and event handling.",
                Language = "JavaScript",
                Url = "https://github.com/Timothynyezi/Etch-a-Sketch",
                Stars = 0,
                Featured = false,
                Updated = new DateTime(2025, 5, 26),
                Tags = new[] { "JavaScript", "HTML", "CSS", "DOM" }
            },
            new {
                Name = "Rock Paper Scissors",
                Description = "A console-based Rock, Paper, Scissors game built in JavaScript. Focuses on game logic, user input handling, and JavaScript fundamentals.",
                Language = "JavaScript",
                Url = "https://github.com/Timothynyezi/Project-Rock-Paper-Scissors",
                Stars = 0,
                Featured = false,
                Updated = new DateTime(2025, 2, 24),
                Tags = new[] { "JavaScript", "Game", "Console" }
            }
        };

        foreach (var project in projects)
        {
            var projectId = await conn.ExecuteScalarAsync<int>(@"
                INSERT INTO projects (name, description, language, github_url, stars, featured, updated_at)
                VALUES (@Name, @Description, @Language, @Url, @Stars, @Featured, @Updated)
                RETURNING id",
                project);

            foreach (var tag in project.Tags)
            {
                await conn.ExecuteAsync(
                    "INSERT INTO project_tags (project_id, tag) VALUES (@ProjectId, @Tag)",
                    new { ProjectId = projectId, Tag = tag });
            }
        }
    }
}
