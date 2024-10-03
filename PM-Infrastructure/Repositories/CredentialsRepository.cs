using PM_Application.Interfaces.Repositories;
using PM_Domain;

namespace PM_Infrastructure.Repositories;

public class CredentialsRepository : ICredentialsRepository
{
    private readonly DatabaseContext _dbContext;
    
    public CredentialsRepository(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<ServiceCredentials> Create(ServiceCredentials create)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceCredentials> Read(ServiceCredentials read)
    {
        throw new NotImplementedException();
    }

    public Task<List<ServiceCredentials>> ReadAllByUser(int user)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceCredentials> Update(ServiceCredentials update)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Delete(ServiceCredentials delete)
    {
        throw new NotImplementedException();
    }
}