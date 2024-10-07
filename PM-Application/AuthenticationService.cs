using AutoMapper;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.Interfaces;
using PM_Application.Interfaces.Repositories;
using PM_Application.Interfaces.Services;
using PM_Domain;

namespace PM_Application;

public class AuthenticationService : IAuthenticationService
{
    private readonly IAuthenticationRepository _repository;
    private readonly IValidatorFactory _validator;
    private readonly IMapper _mapper;

    public AuthenticationService(IAuthenticationRepository repository, IValidatorFactory validator, IMapper mapper)
    {
        _repository = repository;
        _validator = validator;
        _mapper = mapper;
    }
    
    public async Task<bool> Register(RegisterCreate create)
    {
        _validator.ValidateAsync(create);
        
        var createDb = _mapper.Map<ApplicationUser>(create);

        return await _repository.Create(createDb);
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        throw new NotImplementedException();
    }
}