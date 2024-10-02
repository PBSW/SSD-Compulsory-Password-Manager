using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;

namespace PM_Application.Interfaces.Services;

public interface ICredentialsService
{
    public Task<CredentialResponse> Create(CredentialRequest request);
}