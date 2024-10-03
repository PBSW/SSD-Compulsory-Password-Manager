using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;

namespace PM_Application.Interfaces.Services;

public interface ICredentialsService
{
    public Task<CredentialResponse> Create(ServiceCredentialsCreate create);
    public Task<CredentialResponse> GetById(CredentialRequest request);
    public Task<List<CredentialResponse>> GetAllByUser(int user);
    public Task<CredentialResponse> Update(CredentialRequest update);
    public Task<bool> Delete(CredentialRequest delete);
}