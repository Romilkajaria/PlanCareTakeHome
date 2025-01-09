import { TestBed } from '@angular/core/testing';
import {SignalRService} from './signalr.service';

describe('SignalrService', () => {
  let service: SignalRService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRService<any>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
