using FluentValidation;
using PM_Application.DTOs.Create;
using PM_Application.DTOs.Request;
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

        RuleFor(x => x.Username).NotNull().NotEmpty().WithMessage("Username cannot be empty.");
        RuleFor(x => x.Username).MinimumLength(3).WithMessage("Username must be at least 3 characters long.");
        RuleFor(x => x.Username).MaximumLength(20).WithMessage("Username must be at most 20 characters long.");
        RuleFor(x => x.Username).Matches("^[a-zA-Z0-9]*$").WithMessage("Username must only contain alphanumeric characters, and can not contain spaces.");

        RuleFor(x => x.Password).NotNull().NotEmpty().WithMessage("Password cannot be empty.");
        RuleFor(x => x.Password).MinimumLength(8).WithMessage("Password must be 8 characters long.");

        RuleFor(x => x.Email).NotNull().NotEmpty().WithMessage("Email cannot be empty.");
        RuleFor(x => x.Email).EmailAddress().WithMessage("Email must be a valid email.");
    }
}

public class ValidatorLoginRequest : AbstractValidator<LoginRequest>
{
    public ValidatorLoginRequest()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;

        RuleFor(x => x.Username).NotNull().NotEmpty().WithMessage("Username cannot be empty.");
        RuleFor(x => x.Username).MinimumLength(3).WithMessage("Username must be at least 3 characters long.");
        RuleFor(x => x.Username).MaximumLength(20).WithMessage("Username must be at most 20 characters long.");
        RuleFor(x => x.Username).Matches("^[a-zA-Z0-9]*$").WithMessage("Username must only contain alphanumeric characters, and can not contain spaces.");

        RuleFor(x => x.Password).NotNull().NotEmpty().WithMessage("Password cannot be empty.");
        RuleFor(x => x.Password).MinimumLength(8).WithMessage("Password must be 8 characters long.");
    }
}

public class ValidatorCredentialsRequest : AbstractValidator<CredentialsRequest>
{
    public ValidatorCredentialsRequest()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;

        RuleFor(x => x.Id).NotNull().WithMessage("Id can not be empty or null");
        RuleFor(x => x.Id).GreaterThan(0).WithMessage("Id can not be negative");
    }
}