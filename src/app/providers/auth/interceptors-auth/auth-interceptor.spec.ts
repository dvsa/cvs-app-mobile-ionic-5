import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { of} from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthInterceptor } from '@providers/auth';
import { AuthenticationService } from '@providers/auth';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { NetworkService } from '@providers/global/network.service';
import { AUTH, CONNECTION_STATUS } from '@app/app.enums';
import { default as AppConfig } from '@config/application.hybrid';

describe('AuthInterceptor', () => {
  let authInterceptor: AuthInterceptor;
  let authenticateService: AuthenticationService;
  let netWorkService: NetworkService;
  let networkServiceSpy: any;

  const API_URL = '/test-stations';
  const AUTH_HEADER_KEY = 'Authorization';

  beforeEach(() => {
    networkServiceSpy = jasmine.createSpyObj('NetworkService', ['getNetworkState']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: NetworkService, useValue: networkServiceSpy }
      ]
    });

    authInterceptor = TestBed.inject(AuthInterceptor);
    authenticateService = TestBed.inject(AuthenticationService);
    netWorkService = TestBed.inject(NetworkService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('intercept', () => {
    let nextMock: any;
    let updatedReq: HttpRequest<any>;

    beforeEach(() => {
      nextMock = {
        handle: (req: HttpRequest<any>) => {
          updatedReq = req;
          return of(updatedReq);
        }
      };
    });

    it('should reject request with "internet is required" error if network is not accessible', fakeAsync(() => {
      netWorkService.getNetworkState = jasmine
        .createSpy('netWorkService.getNetworkState')
        .and.returnValue(CONNECTION_STATUS.OFFLINE);

      const requestMock: HttpRequest<any> = new HttpRequest<any>('GET', `${API_URL}`);

      const result = authInterceptor.intercept(requestMock, nextMock).subscribe(
        () => {},
        (error) => {
          expect(error.error).toEqual(AUTH.INTERNET_REQUIRED);
        }
      );

      tick();

      expect(netWorkService.getNetworkState).toHaveBeenCalled();

    }));

    it('should add bearer token to the request header if network is accessible', fakeAsync(() => {
      netWorkService.getNetworkState = jasmine
        .createSpy('netWorkService.getNetworkState')
        .and.returnValue(CONNECTION_STATUS.ONLINE);

      const requestMock: HttpRequest<any> = new HttpRequest<any>('GET', `${API_URL}`);

      authInterceptor
        .intercept(requestMock, nextMock)
        .pipe(take(1))
        .subscribe();

      tick();

      expect(updatedReq.url).toEqual(API_URL);
      expect(updatedReq.headers.has(AUTH_HEADER_KEY)).toBeTruthy();
      expect(updatedReq.headers.get(AUTH_HEADER_KEY)).toEqual(
        `Bearer ${authenticateService.tokenInfo.token}`
      );
    }));

    it('should not proceed with the request observable if url is missing', fakeAsync(() => {
      const requestMock: HttpRequest<any> = new HttpRequest<any>('GET', '');
      spyOn(nextMock, 'handle');

      authInterceptor
        .intercept(requestMock, nextMock)
        .pipe(take(1))
        .subscribe();

      tick();

      expect(nextMock.handle).not.toHaveBeenCalled();
    }));

    it('should not proceed with the request observable if auth status is falsy', fakeAsync(() => {
      const requestMock: HttpRequest<any> = new HttpRequest<any>('GET', API_URL);
      spyOn(nextMock, 'handle');
      spyOn(authenticateService, 'checkUserAuthStatus').and.returnValue(Promise.resolve(false));

      authInterceptor
        .intercept(requestMock, nextMock)
        .pipe(take(1))
        .subscribe();

      tick();

      expect(nextMock.handle).not.toHaveBeenCalled();
    }));

    it('should not attach token for URL_LATEST_VERSION endpoint', fakeAsync(() => {
      netWorkService.getNetworkState = jasmine
        .createSpy('netWorkService.getNetworkState')
        .and.returnValue(CONNECTION_STATUS.ONLINE);

      const requestMock: HttpRequest<any> = new HttpRequest<any>('GET', AppConfig.app.URL_LATEST_VERSION);
      spyOn(nextMock, 'handle').and.returnValue(of());
      spyOn(authenticateService, 'checkUserAuthStatus');

      authInterceptor
        .intercept(requestMock, nextMock)
        .pipe(take(1))
        .subscribe();

      tick();

      expect(nextMock.handle).toHaveBeenCalled();
      expect(authenticateService.checkUserAuthStatus).not.toHaveBeenCalled();
    }));
  });
});
