using PlanCareTakeHome;

public interface ICarService
{
    IEnumerable<Car> GetCars();
}

public class CarService : ICarService
{
    public static readonly List<Car> _cars = new List<Car>()
    {
        new Car { Make = "Toyota", Model = "Supra", RegistrationExpiry = DateTime.Now.AddDays(-30) },  // Past
        new Car { Make = "Toyota", Model = "Hilux", RegistrationExpiry = DateTime.Now.AddDays(-30) },  // Past
        new Car { Make = "Honda", Model = "Civic TypeR", RegistrationExpiry = DateTime.Now },                 // Now
        new Car { Make = "Ford", Model = "Mustang", RegistrationExpiry = DateTime.Now.AddDays(60) },      // Future
        new Car { Make = "BMW", Model = "M4", RegistrationExpiry = DateTime.Now.AddDays(-15) },   // Past
        new Car { Make = "Audi", Model = "Q8", RegistrationExpiry = DateTime.Now.AddDays(10) },         // Future
        new Car { Make = "Mercedes", Model = "Maybach", RegistrationExpiry = DateTime.Now.AddDays(-60) }, // Past
        new Car { Make = "Hyundai", Model = "Santa Fe", RegistrationExpiry = DateTime.Now },             // Now
        new Car { Make = "Nissan", Model = "GTR", RegistrationExpiry = DateTime.Now.AddDays(90) },   // Future
        new Car { Make = "Volkswagen", Model = "Toureg", RegistrationExpiry = DateTime.Now.AddDays(-120) }, // Past
        new Car { Make = "Subaru", Model = "WRX", RegistrationExpiry = DateTime.Now.AddDays(180) }, // Future
        new Car { Make = "Chevrolet", Model = "Impala", RegistrationExpiry = DateTime.Now.AddDays(-1) }, // Past
        new Car { Make = "Kia", Model = "Stinger", RegistrationExpiry = DateTime.Now.AddDays(30) },      // Future
        new Car { Make = "Mazda", Model = "6", RegistrationExpiry = DateTime.Now.AddDays(-300) },       // Past
        new Car { Make = "Volvo", Model = "XC90", RegistrationExpiry = DateTime.Now.AddDays(7) },        // Future
        new Car { Make = "Tesla", Model = "Roadster", RegistrationExpiry = DateTime.Now.AddDays(-7) },   // Past
        new Car { Make = "Jeep", Model = "Wrangler", RegistrationExpiry = DateTime.Now },              // Now
        new Car { Make = "Porsche", Model = "911", RegistrationExpiry = DateTime.Now.AddDays(365) },    // Future
        new Car { Make = "Ferrari", Model = "Roma", RegistrationExpiry = DateTime.Now.AddDays(-365) },  // Past
        new Car { Make = "Lexus", Model = "GX", RegistrationExpiry = DateTime.Now.AddDays(3) },         // Future
        new Car { Make = "Jaguar", Model = "F Type", RegistrationExpiry = DateTime.Now.AddSeconds(20) }  // Future
    };

    public IEnumerable<Car> GetCars()
    {
        return _cars;
    }
}

