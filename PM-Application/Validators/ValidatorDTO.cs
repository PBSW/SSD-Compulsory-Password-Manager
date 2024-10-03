using FluentValidation;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Update;

namespace PM_Application.Validators;

public class ValidatorCredentialsCreate : AbstractValidator<CredentialsCreate>
{
    public ValidatorCredentialsCreate()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;
        
        RuleFor(x => x.ServiceUsername).NotNull().WithMessage("Message");
        RuleFor(x => x.ServiceUsername).NotEmpty().WithMessage("Message 2");
    }
}

public class ValidatorCredentialsUpdate : AbstractValidator<CredentialsUpdate>
{
    public ValidatorCredentialsUpdate()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;
    }
}

public class ValidatorRegisterCreate : AbstractValidator<RegisterCreate>
{
    public ValidatorRegisterCreate()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;
    }
}