using Microsoft.EntityFrameworkCore;
using PM_Domain;

namespace PM_Infrastructure;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Primary Keys
        modelBuilder.Entity<ServiceCredentials>()
            .HasKey(x => x.Id)
            .HasName("PK_Id");
        
        modelBuilder.Entity<ApplicationUser>()
            .HasKey(x => x.Id)
            .HasName("PK_Id");
        
        // Foreign Keys
        
        // Auto Increment
        modelBuilder.Entity<ServiceCredentials>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<ApplicationUser>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();
        
        // Unique
        modelBuilder.Entity<ApplicationUser>()
            .HasIndex(x => x.Username)
            .IsUnique();

        modelBuilder.Entity<ApplicationUser>()
            .HasIndex(x => x.Email)
            .IsUnique();

        // One-To-Many Relation
        //modelBuilder.Entity<ServiceCredentials>()
        //    .HasOne<ApplicationUser>()
        //    .WithMany()
        //    .HasForeignKey(x => x.Id);
    }
    
    public DbSet<ApplicationUser> UsersTable { get; set; }
    public DbSet<ServiceCredentials> CredentialsTable { get; set; }
}