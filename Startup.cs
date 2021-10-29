using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using RollDiceWithX.Database;
using RollDiceWithX.Services;
using RollDiceWithX.SignalR;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    private IConfiguration Configuration { get; }

    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<RoomDbContext>();
        services.AddControllers();
        services.AddSignalR();
        services.AddTransient<RoomService>();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "RollDiceWithX", Version = "v1" });
        });
    }

    public static void Configure(IApplicationBuilder app, IWebHostEnvironment env, RoomDbContext dataContext)
    {
        dataContext.Database.Migrate();
        
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RollDiceWithX v1"));
        }

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseDefaultFiles();
        app.UseStaticFiles();
        
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHub<RoomHub>("/roomhub");
        });
    }
}