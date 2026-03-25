using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/skills")]
public class SkillsController : ControllerBase
{
    private readonly ISkillRepository _skillRepository;

    public SkillsController(ISkillRepository skillRepository)
    {
        _skillRepository = skillRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetSkills()
    {
        var skills = await _skillRepository.GetAllAsync();
        return Ok(skills);
    }
}
