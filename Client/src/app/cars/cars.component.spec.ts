import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CarsComponent } from './cars.component';
import { ApiService } from '../api/api.service';
import { Car } from '../models/car';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

describe('CarsComponent', () => {
  let component: CarsComponent;
  let fixture: ComponentFixture<CarsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getCars']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, NgForOf, CarsComponent], // Add necessary imports
      providers: [
        { provide: ApiService, useValue: spy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarsComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCars on initialization', () => {
    const mockCars: Car[] = [
      { make: 'Toyota', model: 'Corolla' },
    ];
    apiServiceSpy.getCars.and.returnValue(of(mockCars));

    component.ngOnInit();

    expect(apiServiceSpy.getCars).toHaveBeenCalledOnceWith(undefined);
    expect(component.cars).toEqual(mockCars);
  });

  it('should call ApiService with the correct "make" parameter in getCars', () => {
    const mockCars: Car[] = [
      { make: 'Honda', model: 'Civic' },
    ];
    component.make = 'Honda';
    apiServiceSpy.getCars.and.returnValue(of(mockCars));

    component.getCars();

    expect(apiServiceSpy.getCars).toHaveBeenCalledOnceWith('Honda');
    expect(component.cars).toEqual(mockCars);
  });

  it('should reset the "make" property and fetch all cars when reset is called', () => {
    const mockCars: Car[] = [
      { make: 'Toyota', model: 'Corolla' },
    ];
    component.make = 'Honda';
    apiServiceSpy.getCars.and.returnValue(of(mockCars));

    component.reset();

    expect(component.make).toBeUndefined();
    expect(apiServiceSpy.getCars).toHaveBeenCalledOnceWith(undefined);
    expect(component.cars).toEqual(mockCars);
  });
});
