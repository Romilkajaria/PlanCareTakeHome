import { Routes } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {CarsComponent} from './cars/cars.component';

export const routes: Routes = [
  {title: 'Home', component: CarsComponent, path: ''},
  {title: 'registration', component: RegistrationComponent, path: 'registration'},
];
