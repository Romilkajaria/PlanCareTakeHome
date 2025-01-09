import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Car} from '../models/car';
import {environment} from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = `${environment.apiUrl}/cars`
  constructor(private http: HttpClient) { }

  public getCars(make?: string) {
    let params = new HttpParams();
    if(make) {
      params = params.set("make", make);
    }

    return this.http.get<Car[]>(this.baseUrl, {params})
  }
}
