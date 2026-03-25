using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private readonly IContactRepository _contactRepository;

    public ContactController(IContactRepository contactRepository)
    {
        _contactRepository = contactRepository;
    }

    [HttpPost]
    public async Task<IActionResult> SubmitContact([FromBody] ContactRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new { error = "Name, email, and message are required." });
        }

        var submission = new ContactSubmission
        {
            Name = request.Name,
            Email = request.Email,
            Message = request.Message,
            CreatedAt = DateTime.UtcNow
        };

        await _contactRepository.SaveAsync(submission);

        return Ok(new ContactResponse
        {
            Success = true,
            Message = "Thank you for your message! I'll get back to you soon."
        });
    }
}
