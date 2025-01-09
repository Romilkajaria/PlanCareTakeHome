import {Component, OnInit} from '@angular/core';
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
export class RegistrationComponent implements OnInit{
  public cars: CarRegistration[] = [];

  constructor(private signalRService: SignalRService<CarRegistration>) {}

  ngOnInit(): void {
    // Connect to the SignalR hub and subscribe to the "ReceiveMessage" event
    this.signalRService.connect(`/notificationHub`, 'ReceiveMessage');
    this.signalRService.data$.subscribe(data => {
      this.cars = data as CarRegistration[];
    });
  }

  ngOnDestroy(): void {
    // Disconnect from SignalR when the component is destroyed
    this.signalRService.disconnect();
  }
}
