import { Injectable } from '@angular/core';
import {environment} from '../environment';
import {BehaviorSubject} from 'rxjs';
import * as signalR from '@microsoft/signalr'

@Injectable({
  providedIn: 'root',
})
export class SignalRService<T> {
  private hubConnection?: signalR.HubConnection;
  private dataSubject = new BehaviorSubject<T[]>([]);
  public data$ = this.dataSubject.asObservable(); // Observable for components to subscribe to

    constructor() {}

    connect(hubEndpoint: string, eventName: string): void {
      const hubUrl = `${environment.apiUrl}${hubEndpoint}`
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .build();

      this.hubConnection
        .start()
        .then(() => console.log(`Connected to ${hubUrl}`))
        .catch(err => console.error('SignalR Connection Error: ', err));

      this.hubConnection.on(eventName, (data: T[]) => {
        this.dataSubject.next(data); // Emit new data to subscribers
        console.log("data received: ", data )
      });
    }

    disconnect(): void {
      if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
