using AutoMapper;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
using PM_Application.DTOs.Response;
using PM_Domain;

namespace PM_Application.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Auth
        CreateMap<RegisterCreate, ApplicationUser>();
        CreateMap<ApplicationUser, LoginResponse>();
        CreateMap<LoginRequest, ApplicationUser>();
        
        // Service Credentials
        CreateMap<CredentialsCreate, ServiceCredentials>();
        CreateMap<ServiceCredentials, CredentialsResponse>();
    }
}