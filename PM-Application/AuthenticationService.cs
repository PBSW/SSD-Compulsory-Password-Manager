using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.Interfaces.Repositories;
using PM_Application.Interfaces.Services;

namespace PM_Application;

public class AuthenticationService : IAuthenticationService
{
    private readonly IAuthenticationRepository _repository;

    public AuthenticationService(IAuthenticationRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<bool> Register(RegisterCreate create)
    {
        throw new NotImplementedException();
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        throw new NotImplementedException();
    }
}