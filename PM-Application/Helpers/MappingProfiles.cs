using AutoMapper;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Application.DTOs.Update;
using PM_Domain;

namespace PM_Application.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Auth
        CreateMap<RegisterCreate, ApplicationUser>()
            .ForMember(x => x.PasswordHash, opt => opt.MapFrom(src => src.Password));
        CreateMap<ApplicationUser, LoginResponse>();
        CreateMap<LoginRequest, ApplicationUser>()
            .ForMember(x => x.PasswordHash, opt => opt.MapFrom(src => src.Password));
        
        // Service Credentials
        CreateMap<CredentialsCreate, ServiceCredentials>();
        CreateMap<ServiceCredentials, CredentialsResponse>();
        CreateMap<CredentialsUpdate, ServiceCredentials>();
        CreateMap<ServiceCredentials, PartialCredentialResponse>();
        CreateMap<CredentialsRequest, ServiceCredentials>();
    }
}