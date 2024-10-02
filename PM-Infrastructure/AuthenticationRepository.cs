using PM_Application.Interfaces.Repositories;
using PM_Domain;

namespace PM_Infrastructure;

public class AuthenticationRepository : IAuthenticationRepository
{
    private readonly DatabaseContext _dbContext;

    public AuthenticationRepository(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ApplicationUser> Create(ApplicationUser create)
    {
        throw new NotImplementedException();
    }
}