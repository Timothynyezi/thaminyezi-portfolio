using PortfolioApi.Models;

namespace PortfolioApi.Data;

public interface ISkillRepository
{
    Task<IEnumerable<SkillCategory>> GetAllAsync();
}
