using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;

namespace PM_Application.Interfaces.Services;

public interface ICredentialsService
{
    public Task<CredentialsResponse> Create(CredentialsCreate create);
    public Task<CredentialsResponse> GetById(CredentialsRequest request);
    public Task<List<CredentialsResponse>> GetAllByUser(int user);
    public Task<CredentialsResponse> Update(CredentialsRequest update);
    public Task<bool> Delete(CredentialsRequest delete);
}