using Microsoft.Extensions.DependencyInjection;
using PM_Application.Interfaces.Repositories;
using PM_Application.Interfaces.Services;

namespace PM_Application.DependencyResolver;

public class Resolver
{
    public static void RegisterApplicationLayer(IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IAuthenticationService, AuthenticationService>();
        serviceCollection.AddScoped<ICredentialsService, CredentialsService>();
    }
}