using System.Collections.Generic;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace PlanCareTakeHome.Controllers;

[ApiController]
[Route("[controller]")]
public class CarsController : ControllerBase
{
    private readonly ICarService _carService;

    public CarsController(ICarService carService)
    {
        _carService = carService;
    }

    [HttpGet]
    public IActionResult Get([FromQuery] string? make)
    {
        try
        {
            IEnumerable<Car> cars = _carService.GetCars();
            if (!string.IsNullOrWhiteSpace(make))
            {
                var response = cars.Where(c => c.Make.ToLower() == make.ToLower());

                if (!response.Any())
                {
                    return BadRequest(new { Message = $"No cars found for the specified make: {make}" });
                }

                return Ok(response);
            }

            return Ok(cars);
        }
        catch(Exception ex)
        {
            throw new InvalidOperationException("Failed to get cars", ex);
        }

    }
}

