import {Component, OnInit} from '@angular/core';
import {Car} from '../models/car';
import {ApiService} from '../api/api.service';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cars',
  imports: [
    NgForOf,
    FormsModule,

  ],
  standalone: true,
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent implements OnInit{
  public cars: Car[] = []
  make: string | undefined;
  constructor(private apiService: ApiService) {
  }

  public ngOnInit() {
    this.getCars();
  }

  public getCars() {
    this.apiService.getCars(this.make).subscribe((cars) => this.cars = cars);
  }

  public reset() {
    this.make = undefined;
    this.getCars();
  }
}
