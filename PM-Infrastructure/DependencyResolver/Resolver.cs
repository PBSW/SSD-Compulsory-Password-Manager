using Microsoft.Extensions.DependencyInjection;
using PM_Application.Interfaces.Repositories;
using PM_Infrastructure.Repositories;

namespace PM_Infrastructure.DependencyResolver;

public class Resolver
{
    public static void RegisterRepositoryLayer(IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ICredentialsRepository, CredentialsRepository>();
        serviceCollection.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
    }
}