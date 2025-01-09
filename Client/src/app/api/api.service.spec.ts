import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Car } from '../models/car';
import { environment } from '../environment';
import {provideHttpClient} from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCars without query parameters', () => {
    const mockCars: Car[] = [
      { make: 'Toyota', model: 'Corolla' },
      { make: 'Honda', model: 'Civic' },
    ];

    service.getCars().subscribe((cars) => {
      expect(cars).toEqual(mockCars);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/cars`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.keys().length).toBe(0);
    req.flush(mockCars);
  });

  it('should call getCars with query parameters', () => {
    const make = 'Toyota';
    const mockCars: Car[] = [
      { make: 'Toyota', model: 'Corolla' },
    ];

    service.getCars(make).subscribe((cars) => {
      expect(cars).toEqual(mockCars);
    });

    const req = httpMock.expectOne((request) =>
      request.url === `${environment.apiUrl}/cars` && request.params.get('make') === make
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCars);
  });

  it('should handle an empty array response', () => {
    service.getCars('NonExistentMake').subscribe({
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.error).toBe('No cars found for the specified make: dfgdfg');
      }
    });

    const req = httpMock.expectOne((request) =>
      request.url === `${environment.apiUrl}/cars` && request.params.get('make') === 'NonExistentMake'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should handle HTTP error response', () => {
    const make = 'dfgdfg';
    const errorMessage = 'No cars found for the specified make: dfgdfg';

    service.getCars(make).subscribe({
      next: () => fail('Expected an error, not cars'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.error).toBe(errorMessage);
      },
    });

    const req = httpMock.expectOne((request) =>
      request.url === `${environment.apiUrl}/cars` && request.params.get('make') === make
    );
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });
});
