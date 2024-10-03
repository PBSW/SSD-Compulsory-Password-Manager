using System.Data;
using FluentValidation;
using PM_Domain;

namespace PM_Application.Validators;

public class ValidatorApplicationUser : AbstractValidator<ApplicationUser>
{
     public ValidatorApplicationUser()
     {
         RuleLevelCascadeMode = CascadeMode.Stop;

         RuleFor(u => u.Id).NotNull().NotEmpty().WithMessage("");
         
         RuleFor(u => u.Username).NotNull().NotEmpty().WithMessage("");
         RuleFor(u => u.Username).MaximumLength(20).WithMessage("");
         RuleFor(u => u.Username).MinimumLength(4).WithMessage("");
         RuleFor(u => u.Username).Matches("^[a-zA-Z0-9]*$").WithMessage("");

         RuleFor(u => u.PasswordHash).NotEmpty().WithMessage("");
         RuleFor(u => u.PasswordHash).MinimumLength(20).WithMessage("");

         RuleFor(u => u.Email).NotEmpty().WithMessage("");
         RuleFor(u => u.Email).EmailAddress().WithMessage("");
     }
}

public class ValidatorServiceCredentials : AbstractValidator<ServiceCredentials>
{
    public ValidatorServiceCredentials()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(s => s.Id).NotNull().NotEmpty().WithMessage("");

        RuleFor(s => s.ServiceUsername).NotNull().WithMessage("");
        RuleFor(s => s.ServiceUsername).MaximumLength(20).WithMessage("");
        RuleFor(s => s.ServiceUsername).MinimumLength(4).WithMessage("");
            
        RuleFor(s => s.ServiceName).NotNull().NotEmpty().WithMessage("");
        RuleFor(s => s.ServiceName).MaximumLength(20).WithMessage("");
        RuleFor(s => s.ServiceName).MinimumLength(4).WithMessage("");
        
        RuleFor(s => s.ServicePassword).NotNull().NotEmpty().WithMessage("");
        RuleFor(s => s.ServicePassword).MaximumLength(20).WithMessage("");
        RuleFor(s => s.ServicePassword).MinimumLength(4).WithMessage("");
    }
}