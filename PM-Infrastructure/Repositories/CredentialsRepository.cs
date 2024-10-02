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
    public Task<ServiceCredentials> Create(ServiceCredentials credentials)
    {
        throw new NotImplementedException();
    }
}