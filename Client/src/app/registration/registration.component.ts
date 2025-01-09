import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalRService} from '../signalr/signalr.service';
import {CarRegistration} from '../models/car';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [
    NgForOf
  ],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public cars: CarRegistration[] = [];

  constructor(private signalRService: SignalRService<CarRegistration>) {}

  ngOnInit(): void {
    this.signalRService.connect(`/notificationHub`, 'ReceiveMessage');
    this.signalRService.data$.subscribe(data => {
      this.cars = data as CarRegistration[];
    });
  }

  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }
}
