using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.Interfaces.Repositories;
using PM_Application.Interfaces.Services;

namespace PM_Application;

public class CredentialsService : ICredentialsService
{
    private readonly ICredentialsRepository _repository;

    public CredentialsService(ICredentialsRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<CredentialResponse> Create(CredentialRequest request)
    {
        throw new NotImplementedException();
    }
}