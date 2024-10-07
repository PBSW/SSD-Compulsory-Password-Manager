using Microsoft.Extensions.DependencyInjection;
using PM_Application.Interfaces;
using PM_Security.Cryptography;
using PM_Security.Hasher;


namespace PM_Security.DependencyResolver;

public class Resolver
{
    public static void RegisterRepositoryLayer(IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ICryptographyHelper, CryptographyHelper>();
        serviceCollection.AddScoped<IJwtProvider, JwtProvider>();
        serviceCollection.AddScoped<IPasswordHasher, PasswordHasher>();
    }
}