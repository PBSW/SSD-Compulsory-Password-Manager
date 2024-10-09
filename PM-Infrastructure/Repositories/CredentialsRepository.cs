using Microsoft.EntityFrameworkCore;
using PM_Application.Interfaces.Repositories;
using PM_Domain;

namespace PM_Infrastructure.Repositories;

public class CredentialsRepository : ICredentialsRepository
{
    private readonly DatabaseContext _dbContext;
    
    public CredentialsRepository(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
        _dbContext.Database.EnsureCreated();
    }

    public async Task<ServiceCredentials> Create(ServiceCredentials create)
    {
        var returnEntry = await _dbContext.CredentialsTable.AddAsync(create);
        await _dbContext.SaveChangesAsync();
        return returnEntry.Entity;
    }

    public async Task<ServiceCredentials> Read(int read)
    {
        //TODO: FIX THIS. METHOD DOESN'T WORK
        var returnEntry = await _dbContext.CredentialsTable.Where(x => x.Id == read).FirstAsync();

        if (returnEntry == null)
            throw new Exception();
        return returnEntry;
    }

    public async Task<List<ServiceCredentials>> ReadAllByUser(int user)
    {
        return await _dbContext.CredentialsTable.Where(x => x.UserId == user).ToListAsync();
    }

    public async Task<ServiceCredentials> Update(ServiceCredentials update)
    {
        var existingCredentials = await _dbContext.CredentialsTable.FindAsync(update.Id);

        if (existingCredentials != null)
        {
            existingCredentials.ServiceUsername = update.ServiceUsername;
            existingCredentials.ServiceUsername = update.ServicePassword;
            existingCredentials.IV = update.IV;

            var result = await _dbContext.SaveChangesAsync();

            if (result > 0)
                return existingCredentials;
            else
                throw new Exception();
        }
        throw new Exception();
    }

    public async Task<bool> Delete(ServiceCredentials delete)
    {
        var entityToDelete = await _dbContext.CredentialsTable.FindAsync(delete.Id);
        
        if (entityToDelete == null)
        {
            return false;
        }
        
        _dbContext.CredentialsTable.Remove(entityToDelete);

        int result = await _dbContext.SaveChangesAsync();

        return result > 0;
    }
}