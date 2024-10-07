using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;

namespace PM_Application.Interfaces.Services;

public interface IAuthenticationService
{
    public Task<bool> Register(RegisterCreate create);
    public Task<string> Login(LoginRequest request);
}