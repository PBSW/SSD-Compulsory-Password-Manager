using PM_Domain;

namespace PM_Application.Interfaces.Repositories;

public interface ICredentialsRepository
{
    public Task<ServiceCredentials> Create(ServiceCredentials credentials);
}