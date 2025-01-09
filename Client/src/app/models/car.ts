export interface Car {
  make: string;
  model: string;
}

export interface CarRegistration extends Car {
  isRegistrationExpired: boolean;
}
