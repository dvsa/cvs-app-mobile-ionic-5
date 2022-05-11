import { TestBed } from '@angular/core/testing';

import { VehicleCheckGuard } from './vehicle-check.guard';
import { AuthenticationService } from '@providers/auth';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('VehicleCheckGuard', () => {
  let guard: VehicleCheckGuard;
  let authenticationService: AuthenticationService;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
      ]
    });
    guard = TestBed.inject(VehicleCheckGuard);
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
