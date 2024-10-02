using Microsoft.Extensions.DependencyInjection;
using PM_Application.Interfaces.Services;

namespace PM_Application.DependencyResolver;

public class DependencyResolverService
{
    public static void RegisterApplicationLayer(IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IAuthenticationService, AuthenticationService>();
    }
}