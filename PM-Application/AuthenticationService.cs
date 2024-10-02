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
    
    public async Task<RegisterResponse> Register(RegisterRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        throw new NotImplementedException();
    }
}