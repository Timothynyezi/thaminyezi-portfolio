using PortfolioApi.Models;

namespace PortfolioApi.Data;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync();
}
