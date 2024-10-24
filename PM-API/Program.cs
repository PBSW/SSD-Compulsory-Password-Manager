using System.Reflection;
using System.Text;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PM_API.Policies;
using PM_Infrastructure;
using PM_Security;
using PM_Security.Hasher;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddControllers();
builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());



// Register configuration options for secrets
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));
builder.Services.Configure<HashOptions>(builder.Configuration.GetSection("Hash"));

// Registers dependency layers
PM_Application.DependencyResolver.Resolver.RegisterApplicationLayer(builder.Services);
PM_Infrastructure.DependencyResolver.Resolver.RegisterRepositoryLayer(builder.Services);
PM_Security.DependencyResolver.Resolver.RegisterSecurityLayer(builder.Services);

// Ensure db.db file exists
var runtimeFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
var path = Path.Combine(runtimeFolder, "db.db");
if (!File.Exists(path))
{
    File.Create(path).Close();
}

// Database connection
builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlite("Data Source=db.db");
    options.EnableSensitiveDataLogging();
    options.EnableDetailedErrors();
});

// Authentication setup
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"], // replace with your actual issuer
            ValidAudience = builder.Configuration["Jwt:Audience"], // replace with your actual audience
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            RequireSignedTokens = true, // Ensure tokens are signed
            RequireExpirationTime = true, // Ensure tokens have an expiration time
            ValidateIssuerSigningKey = true // Validate the signing key without using 'kid'
        };
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Console.WriteLine($"Authentication failed: {context.Exception.Message}");
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                Console.WriteLine("Token successfully validated.");
                return Task.CompletedTask;
            }
        };
    });

// Authorization setup
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("OwnDataPolicy", policy =>
    {
        policy.Requirements.Add(new OwnDataRequirement());
    });
});

builder.Services.AddScoped<IAuthorizationHandler, OwnDataHandler>();
builder.Services.AddHttpContextAccessor(); // If not already added

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularLocalhost",
        corsBuilder => corsBuilder
            .WithOrigins("http://localhost:4200") // Ensure this matches the Angular app URL exactly
            .AllowAnyMethod() // Allow all HTTP methods
            .AllowAnyHeader() // Allow all headers
            .AllowCredentials() // Allow sending credentials (cookies or authorization headers)
    );
});


// Remember to put builder things before this, stupid.
// Did I do it wrong in the first place? Aaaaa -PZ
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Ensure db created
using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<DatabaseContext>();
    context.Database.EnsureCreated();
}

// Middleware order
app.UseHttpsRedirection(); // Ensures requests are redirected to HTTPS

app.UseCors("AllowAngularLocalhost"); // Apply CORS policy before authentication

app.UseAuthentication(); // Authenticate the user
app.UseAuthorization(); // Authorize the user based on the authentication

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();