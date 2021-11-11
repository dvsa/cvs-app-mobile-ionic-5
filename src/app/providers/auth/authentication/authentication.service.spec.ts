import { TestBed } from '@angular/core/testing';
import { PlatformMock, StorageMock } from 'ionic-mocks';
import { Platform } from '@ionic/angular';
import { of } from 'rxjs/observable/of';
import { Storage } from '@ionic/storage';

import { VaultService } from '@providers/auth';
import { CommonFunctionsService } from '../../utils/common-functions';
import { AuthenticationService } from '@providers/auth';
import { LogsProvider } from '@store/logs/logs.service';
import { AUTH, CONNECTION_STATUS, TESTER_ROLES } from '@app/app.enums';
import { NetworkService } from '../../global';
import Spy = jasmine.Spy;

describe('AuthenticationService', () => {
  let platform: Platform;
  let vaultService: VaultService;
  let logProvider: LogsProvider;
  let commFunc: CommonFunctionsService;
  let authenticationService: AuthenticationService;
  let networkService: NetworkService;

  const randomStr = 'xs@o';
  const obsStr = '***-nerd';
  const JWT_TOKEN_MOCK = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSld
  UIEJ1aWxkZXIiLCJpYXQiOjE2MTYwODYyMjMsImV4cCI6MTY0NzYyMjIyMywiYXVkIjoid3d3LmV4YW1wbGUuY29
  tIiwic3ViIjoiZjllNjQwOGUiLCJuYW1lIjoiY3ZzLXRlc3RpbmciLCJlbWFpbCI6ImphbWluZUB0ZXN0LmNvbSIsIn
  JvbGVzIjpbIkNWU0Z1bGxBY2Nlc3MiLCJDVlNQc3ZUZXN0ZXIiXSwiZW1wbG95ZWVJZCI6ImY5ZTY0MDhlLTc1Z
  GYtNDBhZS1hNWJhLTQxNjhhNDgwOGMzNSJ9.zW_4CbBPTbEq-OeV7McuGEXTrZLTwhFYvV6KNMc2cQE`;

  const vaultServiceSpy = {
    ...jasmine.createSpyObj('VaultService', [
      'logout',
      'storeTesterObfuscatedId',
      'setDesiredAuthMode'
    ]),
    lockChanged: of(true)
  } as jasmine.SpyObj<VaultService>;

  const logProviderSpy = jasmine.createSpyObj('LogsProvider', {
    dispatchLog: () => true
  });

  const commonFuncSpy = jasmine.createSpyObj('CommonFunctionsService', {
    randomString: randomStr,
    getObfuscatedTesterOid: obsStr
  });

  const networkServiceSpy = jasmine.createSpyObj('NetworkService', [
    'getNetworkState',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthenticationService,
        { provide: NetworkService, useValue: networkServiceSpy },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: VaultService, useValue: vaultServiceSpy },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: CommonFunctionsService, useValue: commonFuncSpy },
        { provide: Storage, useFactory: () => StorageMock.instance() },
      ]
    });

    platform = TestBed.inject(Platform);
    vaultService = TestBed.inject(VaultService);
    logProvider = TestBed.inject(LogsProvider);
    commFunc = TestBed.inject(CommonFunctionsService);
    authenticationService = TestBed.inject(AuthenticationService);
    networkService = TestBed.inject(NetworkService);
    networkService.getNetworkState = jasmine
      .createSpy('netWorkService.getNetworkState')
      .and.returnValue(CONNECTION_STATUS.ONLINE);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('execute', () => {

    beforeEach(() => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
      spyOn(authenticationService.auth, 'getAuthResponse').and.returnValue(Promise.resolve({ id_token: JWT_TOKEN_MOCK }));
      spyOn(authenticationService.auth, 'expire').and.returnValue(Promise.resolve());
      spyOn(authenticationService.auth, 'login').and.returnValue(Promise.resolve());
      spyOn(authenticationService.auth, 'isAccessTokenAvailable').and.returnValue(Promise.resolve(true));
      spyOn(authenticationService.auth, 'refreshSession').and.returnValue(Promise.resolve());
    });

    it('should compile', () => {
      expect(authenticationService).toBeDefined();
    });

    describe('expireTokens', () => {
      it('should call through to ionic auth expire() method', async () => {
        await authenticationService.expireTokens();

        expect(authenticationService.auth.expire).toHaveBeenCalled();
      });
    });

    describe('login', () => {
      beforeEach(() => {
        (authenticationService.auth.getAuthResponse as Spy).and.returnValue(undefined);
      });

      it('should call through to ionic auth login() method', async () => {
        await authenticationService.login();

        expect(vaultService.logout).toHaveBeenCalled();
        expect(vaultService.setDesiredAuthMode).toHaveBeenCalled();
        expect(authenticationService.auth.login).toHaveBeenCalled();
        expect(vaultService.storeTesterObfuscatedId).toHaveBeenCalledWith(obsStr);
      });
    });

    // @TODO - Ionic 5 - fix this unit test
    xdescribe('hasUserRights', () => {
      it('should return truthy if user has access rights', async () => {
        await authenticationService.updateTokenInfo();

        const hasAccess = await authenticationService.hasUserRights([
          TESTER_ROLES.FULL_ACCESS,
          TESTER_ROLES.HGV
        ]);

        expect(hasAccess).toBeTruthy();
      });

      it('should return falsy if user do not have access rights', async () => {
        await authenticationService.updateTokenInfo();

        const hasAccess = await authenticationService.hasUserRights([TESTER_ROLES.TIR]);
        expect(hasAccess).toBeFalsy();
      });
    });

    describe('isUserAuthenticated', () => {
      // @TODO - Ionic 5 - fix this unit test
      xit('should not attempt a new login when connection status is OFFLINE', async () => {
        (networkService.getNetworkState as Spy).and.returnValue(CONNECTION_STATUS.OFFLINE);
        const authResult = await authenticationService.isUserAuthenticated();

        expect(authResult).toEqual({ active: true, action: AUTH.CONTINUE });
      });

      it('should return token status as "re-login" if token is not available via auth isAccessTokenAvailable', async () => {

        (authenticationService.auth.isAccessTokenAvailable as Spy).and.returnValue(Promise.resolve(false));

        const authResult = await authenticationService.isUserAuthenticated();

        expect(authResult).toEqual({ active: false, action: AUTH.RE_LOGIN });
      });

      it(`should return token status as "re-login" if token has expired and cannot be
      refreshed via auth refreshSession`, async () => {
        networkService.getNetworkState = jasmine
          .createSpy('netWorkService.getNetworkState')
          .and.returnValue(CONNECTION_STATUS.ONLINE);
        (authenticationService.auth.isAccessTokenAvailable as Spy).and.returnValue(Promise.resolve(true));
        spyOn(authenticationService, 'isTokenExpired').and.returnValue(Promise.resolve(true));
        (authenticationService.auth.refreshSession as Spy).and.throwError('smth');
        const authResult = await authenticationService.isUserAuthenticated();
        expect(authResult).toEqual({ active: false, action: AUTH.RE_LOGIN });
      });

      it(`should return token status as continue if token has not expired`, async () => {
        (authenticationService.auth.isAccessTokenAvailable as Spy).and.returnValue(Promise.resolve(true));
        spyOn(authenticationService, 'isTokenExpired').and.returnValue(Promise.resolve(false));

        const authResult = await authenticationService.isUserAuthenticated();
        expect(authResult).toEqual({ active: true, action: AUTH.CONTINUE });
      });
    });

    describe('checkUserAuthStatus', () => {
      let authStatus: jasmine.Spy;
      beforeEach(() => {
        authStatus = spyOn(authenticationService, 'isUserAuthenticated');
      });

      it('should return falsy on error if user auth status is to "re-login"', async () => {
        spyOn(authenticationService, 'login').and.returnValue(
          Promise.reject(new Error('something'))
        );
        authStatus.and.returnValue({ active: false, action: AUTH.RE_LOGIN });

        const result = await authenticationService.checkUserAuthStatus();

        expect(logProvider.dispatchLog).toHaveBeenCalled();
        expect(result).toBeFalsy();
      });

      it('should return truthy if user auth status is active', async () => {
        authStatus.and.returnValue({ active: true, action: AUTH.CONTINUE });

        const result = await authenticationService.checkUserAuthStatus();
        expect(result).toBeTruthy();
      });
    });

    // @TODO - Ionic 5 - this spec is causing intermittent failures which need to be resolved
    xdescribe('isTokenExpired()', () => {
      it('should return true if token is invalid', async () => {
        spyOn(authenticationService.auth, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        spyOn(authenticationService.auth, 'getIdToken').and.returnValue(Promise.resolve(null));
        const isExpired = await authenticationService.isTokenExpired();
        expect(isExpired).toEqual(true);
      });
      it('should return false if token is valid', async () => {
        spyOn(authenticationService.auth, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        spyOn(authenticationService.auth, 'getIdToken').and.returnValue(Promise.resolve({
          exp: 1919506719
        }));
        (authenticationService.auth.refreshSession as Spy).and.returnValue(Promise.resolve());
        const isExpired = await authenticationService.isTokenExpired();
        expect(isExpired).toEqual(false);
      });
    });
  });
});
