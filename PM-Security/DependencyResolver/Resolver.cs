using Microsoft.Extensions.DependencyInjection;
using PM_Application.Interfaces;
using PM_Security.Cryptography;

namespace PM_Security.DependencyResolver;

public class Resolver
{
    public static void RegisterRepositoryLayer(IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ICryptographyHelper, CryptographyHelper>();
    }
}