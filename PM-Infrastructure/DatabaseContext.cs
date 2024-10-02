using Microsoft.EntityFrameworkCore;
using PM_Domain;

namespace PM_Infrastructure;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
    }
    
    public DbSet<ServiceCredentials> CredentialsTable { get; set; }
}