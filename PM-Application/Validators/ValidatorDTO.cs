using FluentValidation;
using PM_Application.DTOs.Create;

namespace PM_Application.Validators;

public class ValidatorCredentialsCreate : AbstractValidator<CredentialsCreate>
{
    ValidatorCredentialsCreate()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;
    }
}

public class ValidatorRegisterCreate : AbstractValidator<RegisterCreate>
{
    ValidatorRegisterCreate()
    {
        ClassLevelCascadeMode = CascadeMode.Stop;
    }
}