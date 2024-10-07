using System.Security.Authentication;
using AutoMapper;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
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
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtProvider _jwtProvider;

    public AuthenticationService(IAuthenticationRepository repository, IValidatorFactory validator, IMapper mapper, IPasswordHasher passwordHasher, IJwtProvider jwtProvider)
    {
        _repository = repository;
        _validator = validator;
        _mapper = mapper;
        _passwordHasher = passwordHasher;
        _jwtProvider = jwtProvider;
    }
    
    public async Task<bool> Register(RegisterCreate create)
    {
        await _validator.ValidateAsync(create);
        
        var createDb = _mapper.Map<ApplicationUser>(create);

        return await _repository.Create(createDb);
    }

    public async Task<string> Login(LoginRequest request)
    {
        await _validator.ValidateAsync(request);

        var requestDb = _mapper.Map<ApplicationUser>(request);
        
        var responseDb = await _repository.Read(requestDb);

        var hashedPassword = _passwordHasher.Hash(request.Password, request.Username);

        if (request.Password != hashedPassword)
        {
            throw new AuthenticationException();
        }

        return _jwtProvider.GenerateToken(responseDb.Id, responseDb.Username);
    }
}