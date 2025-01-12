import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalRService} from '../signalr/signalr.service';
import {CarRegistration} from '../models/car';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [
    NgForOf,
    NgIf,
  ],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public cars: CarRegistration[] = [];
  public loading = true;
  public errorMessage?: string;

  constructor(private signalRService: SignalRService<CarRegistration>) {}

  ngOnInit(): void {
    this.signalRService.connect(`/notificationHub`, 'ReceiveMessage');
    this.signalRService.data$.subscribe({
      next: (data) => {
        this.cars = data as CarRegistration[];
        this.loading = this.cars.length === 0;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }
}
