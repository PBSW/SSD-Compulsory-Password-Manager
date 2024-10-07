using System.Net.Mime;
using PM_Domain;

namespace PM_Application.Interfaces.Repositories;

public interface IAuthenticationRepository
{
    public Task<bool> Create(ApplicationUser create);
    public Task<ApplicationUser> Read(ApplicationUser read);
}