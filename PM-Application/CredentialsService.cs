using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.DTOs.Update;
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
    
    public async Task<CredentialsResponse> Create(CredentialsRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task<CredentialsResponse> Create(CredentialsCreate create)
    {
        throw new NotImplementedException();
    }

    public Task<CredentialsResponse> GetById(CredentialsRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task<List<CredentialsResponse>> GetAllByUser(int user)
    {
        throw new NotImplementedException();
    }

    public async Task<CredentialsResponse> Update(CredentialsUpdate update)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> Delete(CredentialsRequest delete)
    {
        throw new NotImplementedException();
    }
}