import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { SignalRService } from '../signalr/signalr.service';
import { CarRegistration } from '../models/car';
import { Subject } from 'rxjs';
import { NgForOf } from '@angular/common';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let signalRServiceSpy: jasmine.SpyObj<SignalRService<CarRegistration>>;
  let dataSubject: Subject<CarRegistration[]>;

  beforeEach(async () => {
    dataSubject = new Subject<CarRegistration[]>();

    const spy = jasmine.createSpyObj('SignalRService', ['connect', 'disconnect'], {
      data$: dataSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [NgForOf, RegistrationComponent], // Include necessary imports
      providers: [{ provide: SignalRService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    signalRServiceSpy = TestBed.inject(SignalRService) as jasmine.SpyObj<SignalRService<CarRegistration>>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should connect to SignalR hub on initialization', () => {
    component.ngOnInit();

    expect(signalRServiceSpy.connect).toHaveBeenCalledOnceWith(
      '/notificationHub',
      'ReceiveMessage'
    );
  });

  it('should update cars when new data is received', () => {
    const mockCars: CarRegistration[] = [
      { make: 'Toyota', model: 'Corolla', isRegistrationExpired: true },
      { make: 'Honda', model: 'Civic', isRegistrationExpired: false },
    ];

    component.ngOnInit();
    dataSubject.next(mockCars);

    expect(component.cars).toEqual(mockCars);
  });

  it('should disconnect from SignalR on component destruction', () => {
    component.ngOnDestroy();

    expect(signalRServiceSpy.disconnect).toHaveBeenCalled();
  });
});
