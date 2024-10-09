using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.DTOs.Update;

namespace PM_Application.Interfaces.Services;

public interface ICredentialsService
{
    public Task<CredentialsResponse> Create(CredentialsCreate create, int userId);
    public Task<CredentialsResponse> GetById(int request);
    public Task<List<PartialCredentialResponse>> GetAllByUser(int user);
    public Task<CredentialsResponse> Update(CredentialsUpdate update);
    public Task<bool> Delete(CredentialsRequest delete);
}