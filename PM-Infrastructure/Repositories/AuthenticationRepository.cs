using Microsoft.EntityFrameworkCore;
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

    public async Task<bool> Create(ApplicationUser create)
    {
        await _dbContext.UsersTable.AddAsync(create);
        var result = _dbContext.SaveChangesAsync();

        if (result.Result > 0)
        {
            return true;
        }

        return false;
    }

    public async Task<ApplicationUser> Read(ApplicationUser read)
    {
        var user = await _dbContext.UsersTable.Where(x => x.Username == read.Username).FirstAsync();

        if (user == null)
        {
            throw new ArgumentException("User not found");
        }
        return user;
    }
}