using Microsoft.AspNetCore.SignalR;
using PlanCareTakeHome.Controllers;
using PlanCareTakeHome.Models;

namespace PlanCareTakeHome
{
    public class RegistrationExpiryCheckingService : BackgroundService
    {
        private readonly IConfiguration _configuration;
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly ICarService _carService;

        public RegistrationExpiryCheckingService(IConfiguration configuration, IHubContext<NotificationHub> hubContext, ICarService carService)
        {
            _configuration = configuration;
            _hubContext = hubContext;
            _carService = carService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var interval = _configuration.GetValue<int>("TaskIntervalSeconds");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    List<CarRegistration> carRegistrations  = new List<CarRegistration>();

                    foreach(var car in _carService.GetCars())
                    {
                        carRegistrations.Add(new CarRegistration
                        {
                            Make = car.Make,
                            Model = car.Model,
                            IsRegistrationExpired = car.RegistrationExpiry < DateTime.Now
                        });
                    }

                    await _hubContext.Clients.All.SendAsync("ReceiveMessage", carRegistrations, stoppingToken);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"An error occurred: {ex.Message}");
                }

                await Task.Delay(TimeSpan.FromSeconds(interval), stoppingToken);
            }
        }
    }
}

