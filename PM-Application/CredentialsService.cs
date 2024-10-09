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
    private readonly ICryptographyHelper _cryptography;

    public CredentialsService(
        ICredentialsRepository repository, 
        IMapper mapper, 
        IValidatorFactory validator,
        ICryptographyHelper cryptographyHelper
        )
    {
        _repository = repository;
        _mapper = mapper;
        _validator = validator;
        _cryptography = cryptographyHelper;
    }
    
    public async Task<CredentialsResponse> Create(CredentialsCreate create, int userId)
    {
        await _validator.ValidateAsync(create);
        ServiceCredentials createDb = _mapper.Map<ServiceCredentials>(create);
        
        // Encrypt the password
        var (cipher, iv) = _cryptography.Encrypt(createDb.ServicePassword);
  
        // Apply the encryption to the password
        createDb.ServicePassword = cipher;
        createDb.IV = iv;
        
        // Set User foreign key
        createDb.UserId = userId;
        
        var createReturn = await _repository.Create(createDb);
        return _mapper.Map<CredentialsResponse>(createReturn);
    }

    public async Task<CredentialsResponse> GetById(int request)
    {
        var getReturn = await _repository.Read(request);
        
        // Decrypt the password
        getReturn.ServicePassword = _cryptography.DecryptWithIV(getReturn.ServicePassword, getReturn.IV);
        
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
        
        // Encrypt the password
        var (cipher, iv) = _cryptography.Encrypt(updateDb.ServicePassword);
        
        // Apply the encryption to the password
        updateDb.ServicePassword = cipher;
        updateDb.IV = iv;
        
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