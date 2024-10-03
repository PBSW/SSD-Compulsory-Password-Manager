using PM_Domain;

namespace PM_Application.Interfaces.Repositories;

public interface ICredentialsRepository
{
    public Task<ServiceCredentials> Create(ServiceCredentials create);
    public Task<ServiceCredentials> Read(ServiceCredentials read);
    public Task<List<ServiceCredentials>> ReadAllByUser(int user);
    public Task<ServiceCredentials> Update(ServiceCredentials update);
    public Task<bool> Delete(ServiceCredentials delete);
}