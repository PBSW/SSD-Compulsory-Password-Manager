using PM_Application.Interfaces.Repositories;
using PM_Domain;

namespace PM_Infrastructure.Repositories;

public class AuthenticationRepository : IAuthenticationRepository
{
    private readonly DatabaseContext _dbContext;

    public AuthenticationRepository(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
        _dbContext.Database.EnsureCreated();
    }

    public async Task<ApplicationUser> Create(ApplicationUser create)
    {
        throw new NotImplementedException();
    }

    public async Task<ApplicationUser> Read(ApplicationUser read)
    {
        throw new NotImplementedException();
    }
}