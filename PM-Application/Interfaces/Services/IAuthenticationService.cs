using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;

namespace PM_Application.Interfaces.Services;

public interface IAuthenticationService
{
    public Task<RegisterResponse> Register(RegisterRequest request);
    public Task<LoginResponse> Login(LoginRequest request);
}