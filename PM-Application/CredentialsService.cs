using AutoMapper;
using FluentValidation;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.DTOs.Update;
using PM_Application.Interfaces;
using PM_Application.Interfaces.Repositories;
using PM_Application.Interfaces.Services;
using PM_Application.Validators;
using PM_Domain;
using IValidatorFactory = PM_Application.Interfaces.IValidatorFactory;

namespace PM_Application;

public class CredentialsService : ICredentialsService
{
    private readonly ICredentialsRepository _repository;
    private readonly IMapper _mapper;
    private readonly IValidatorFactory _validator;

    public CredentialsService(ICredentialsRepository repository, IMapper mapper, IValidatorFactory validator)
    {
        _repository = repository;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<CredentialsResponse> Create(CredentialsCreate create)
    {
        await _validator.ValidateAsync(create);
        
        ServiceCredentials createdb = _mapper.Map<ServiceCredentials>(create);
        
        var createReturn = await _repository.Create(createdb);
        
        return _mapper.Map<CredentialsResponse>(createReturn);
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