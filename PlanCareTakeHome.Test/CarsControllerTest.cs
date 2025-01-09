
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json.Linq;
using PlanCareTakeHome.Controllers;

namespace PlanCareTakeHome.Tests.Controllers
{
    public class CarsControllerTests
    {
        private readonly CarsController _controller;

        private readonly Mock<ICarService> _mockCarService;

        public CarsControllerTests()
        {
            _mockCarService = new Mock<ICarService>();
            _controller = new CarsController(_mockCarService.Object);
        }

        [Fact]
        public void Get_ReturnsAllCars_WhenMakeIsNull()
        {
            // Arrange
            var cars = new List<Car>
            {
                new Car { Make = "Toyota", Model = "Camry", RegistrationExpiry = DateTime.Now.AddMonths(6) },
                new Car { Make = "Honda", Model = "Civic", RegistrationExpiry = DateTime.Now.AddMonths(3) },
            };
            _mockCarService.Setup(service => service.GetCars()).Returns(cars);

            // Act
            var result = _controller.Get(null) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(cars, result.Value);
        }

        [Fact]
        public void Get_ReturnsFilteredCars_WhenMakeIsProvided()
        {
            // Arrange
            var cars = new List<Car>
            {
                new Car { Make = "Toyota", Model = "Camry", RegistrationExpiry = DateTime.Now.AddMonths(6) },
                new Car { Make = "Honda", Model = "Civic", RegistrationExpiry = DateTime.Now.AddMonths(3) },
            };
            _mockCarService.Setup(service => service.GetCars()).Returns(cars);

            // Act
            var result = _controller.Get("Toyota") as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            var filteredCars = result.Value as IEnumerable<Car>;
            Assert.Single(filteredCars);
            Assert.Equal("Toyota", filteredCars.First().Make);
        }

        [Fact]
        public void Get_ReturnsBadRequest_WhenMakeIsProvidedButNoCarsMatch()
        {
            // Arrange
            var cars = new List<Car>
            {
                new Car { Make = "Toyota", Model = "Camry", RegistrationExpiry = DateTime.Now.AddMonths(6) },
                new Car { Make = "Honda", Model = "Civic", RegistrationExpiry = DateTime.Now.AddMonths(3) },
            };
            _mockCarService.Setup(service => service.GetCars()).Returns(cars);

            // Act
            var result = _controller.Get("Ford") as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode);
            // yeah this is a hack. but ((dynamic)result.Value).Message doesn't work.
            var r = result.Value!.ToString();
            Assert.Equal("{ Message = No cars found for the specified make: Ford }", r);
        }

        [Fact]
        public void Get_ThrowsException_WhenServiceFails()
        {
            // Arrange
            _mockCarService.Setup(service => service.GetCars()).Throws(new Exception("Service error"));

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => _controller.Get(null));
            Assert.Equal("Failed to get cars", exception.Message);
            Assert.Equal("Service error", exception.InnerException.Message);
        }
    }
}
