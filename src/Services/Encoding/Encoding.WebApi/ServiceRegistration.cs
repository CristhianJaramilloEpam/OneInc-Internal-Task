namespace Encoding.WebApi
{
    public static class ServiceRegistration
    {
        /// <summary>
        /// Adds application-specific services to the specified service collection using the provided configuration.
        /// </summary>
        /// <remarks>This method is typically called in the application's startup code to register
        /// dependencies for dependency injection.</remarks>
        /// <param name="services">The service collection to which the services will be added. This parameter cannot be null.</param>
        /// <param name="configuration">The configuration settings used to configure the services being added. This parameter cannot be null.</param>
        /// <returns>The service collection with the added services.</returns>
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            return services;
        }

        /// <summary>
        /// Registers application services required for encoding functionality with the specified dependency injection
        /// container.
        /// </summary>
        /// <remarks>This method adds the IEncodingService implementation to the service collection,
        /// allowing consumers to resolve encoding-related services via dependency injection.</remarks>
        /// <param name="services">The service collection to which the application services will be added. Cannot be null.</param>
        /// <param name="configuration">The configuration settings used to configure the application services. Cannot be null.</param>
        /// <returns>The updated IServiceCollection instance, enabling method chaining.</returns>
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IEncodingService, EncodingService>();
            return services;
        }

        /// <summary>
        /// Adds infrastructure-related services to the specified dependency injection container.
        /// </summary>
        /// <remarks>This method registers the IEncoderStrategy as a scoped service using the Base64Service
        /// implementation.</remarks>
        /// <param name="services">The service collection to which the infrastructure services will be added. Cannot be null.</param>
        /// <param name="configuration">The configuration settings used to configure the infrastructure services. Cannot be null.</param>
        /// <returns>The updated IServiceCollection instance, enabling method chaining.</returns>
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IEncoderStrategy, Base64Strategy>();
            return services;
        }
    }
}
