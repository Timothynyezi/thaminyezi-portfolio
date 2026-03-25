using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
    [HttpGet]
    public IActionResult GetProfile()
    {
        var profile = new Profile
        {
            Name = "Thamsanqa Timothy Nyezi",
            Title = "Junior C# / .NET Developer",
            Location = "Belhar, Cape Town, South Africa",
            Bio = "Results-driven junior C# / .NET developer with formal NQF Level 6 training in Software Engineering from WeThinkCode_ and a specialisation in Data Engineering. Practical experience in software design, development, testing, and database management. Actively building a C#/.NET portfolio within the Microsoft ecosystem with a strong appetite for growth and a commitment to writing clean, maintainable code. Eager to contribute to and learn from an Agile development team.",
            GithubUrl = "https://github.com/Timothynyezi",
            LinkedinUrl = "https://www.linkedin.com/in/tt-nyezi",
            Email = "timothynyezi@gmail.com",
            PhotoUrl = "/profile.jpg"
        };

        return Ok(profile);
    }
}
