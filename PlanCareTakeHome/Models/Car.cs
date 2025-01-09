using System.Text.Json.Serialization;

namespace PlanCareTakeHome;

public class Car
{
    public required string Make { get; set; }

    public required string Model { get; set; }

    [JsonIgnore]
    public DateTime RegistrationExpiry { get; set; }
}

