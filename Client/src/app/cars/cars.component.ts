import {Component, OnInit} from '@angular/core';
import {Car} from '../models/car';
import {ApiService} from '../api/api.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cars',
    imports: [
        NgForOf,
        FormsModule,
        NgIf,

    ],
  standalone: true,
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent implements OnInit{
  public cars?: Car[];
  public make: string | undefined;
  public loading = true;
  public errorMessage?: string;

  constructor(private apiService: ApiService) {
  }

  public ngOnInit() {
    this.getCars();
  }

  public getCars() {
    this.loading = true;
    this.apiService.getCars(this.make).subscribe( {
      next: (cars) => {
        this.cars = cars;
        this.loading = false
      },
      error: (err) => {
        this.errorMessage = err.error.message
        this.loading = false;
        // dont show any cars if it errors out;
        this.cars = [];
      }
    });
  }

  public reset() {
    this.make = undefined;
    this.errorMessage = undefined;
    this.getCars();
  }
}
