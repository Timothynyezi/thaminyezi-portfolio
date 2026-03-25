using PortfolioApi.Models;

namespace PortfolioApi.Data;

public interface IContactRepository
{
    Task SaveAsync(ContactSubmission submission);
}
