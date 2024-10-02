using PM_Domain;

namespace PM_Application.Interfaces.Repositories;

public interface IAuthenticationRepository
{
    public Task<ApplicationUser> Create(ApplicationUser create);
}