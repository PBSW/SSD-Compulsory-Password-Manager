using AutoMapper;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.DTOs.Update;
using PM_Application.Interfaces;
using PM_Application.Interfaces.Repositories;
using PM_Application.Interfaces.Services;
using PM_Domain;
using IValidatorFactory = PM_Application.Interfaces.IValidatorFactory;

namespace PM_Application;

public class CredentialsService : ICredentialsService
{
    private readonly ICredentialsRepository _repository;
    private readonly IMapper _mapper;
    private readonly IValidatorFactory _validator;

    public CredentialsService(
        ICredentialsRepository repository,
        IMapper mapper,
        IValidatorFactory validator
    )
    {
        _repository = repository;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<PartialCredentialResponse> Create(CredentialsCreate create, int userId)
    {
        await _validator.ValidateAsync(create);
        ServiceCredentials createDb = _mapper.Map<ServiceCredentials>(create);

        // Set User foreign key
        createDb.UserId = userId;

        var createReturn = await _repository.Create(createDb);
        return _mapper.Map<PartialCredentialResponse>(createReturn);
    }

    public async Task<CredentialsResponse> GetById(int request)
    {
        var getReturn = await _repository.Read(request);

        return _mapper.Map<CredentialsResponse>(getReturn);
    }

    public async Task<List<PartialCredentialResponse>> GetAllByUser(int user)
    {
        List<ServiceCredentials> listReturn = await _repository.ReadAllByUser(user);
        return _mapper.Map<List<PartialCredentialResponse>>(listReturn);
    }

    public async Task<CredentialsResponse> Update(CredentialsUpdate update)
    {
        await _validator.ValidateAsync(update);
        ServiceCredentials updateDb = _mapper.Map<ServiceCredentials>(update);

        var updateReturn = await _repository.Update(updateDb);
        return _mapper.Map<CredentialsResponse>(updateReturn);
    }

    public async Task<bool> Delete(CredentialsRequest delete)
    {
        await _validator.ValidateAsync(delete);
        ServiceCredentials deleteDb = _mapper.Map<ServiceCredentials>(delete);
        return await _repository.Delete(deleteDb);
    }
}