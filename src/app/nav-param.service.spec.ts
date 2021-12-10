import { TestBed } from '@angular/core/testing';

import { NavParamService } from './nav-param.service';

describe('NavParamService', () => {
  let service: NavParamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavParamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
