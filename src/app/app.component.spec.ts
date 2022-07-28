import { waitForAsync, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Store } from '@ngrx/store';
import { EventsMock, NetworkMock } from 'ionic-mocks';

import { AppComponent } from './app.component';
import { StorageService } from '@providers/natives/storage.service';
import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';
import { AppService, SyncService, AnalyticsService, NetworkService } from '@providers/global';
import { VisitService } from '@providers/visit/visit.service';
import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { AuthenticationService } from '@providers/auth';
import { ActivityService } from '@providers/activity/activity.service';
import { ActivityServiceMock } from '@test-config/services-mocks/activity-service.mock';
import { PAGE_NAMES, CONNECTION_STATUS } from './app.enums';
import { LogsProvider } from '@store/logs/logs.service';
import { TestStore } from '@store/logs/data-store.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {SignaturePadPage} from '@app/pages/signature-pad/signature-pad';
import {TestStationHomePage} from '@app/pages/test-station/test-station-home/test-station-home';
import { EventsService } from '@providers/events/events.service';

describe('Component: Root', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appService: AppService;
  let events: EventsService;
  let activityService;
  let syncService;
  let syncServiceSpy: any;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let storageService;
  let visitService;
  let screenOrientation: ScreenOrientation;
  let screenOrientationSpy: any;
  let authenticationService: AuthenticationService;
  let authenticationSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let networkService: NetworkService;
  let router: Router;


  beforeEach(waitForAsync(() => {
    syncServiceSpy = jasmine.createSpyObj('SyncService', {
      checkForUpdate: () => true
    });

    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    authenticationSpy = jasmine.createSpyObj('AuthenticationService', [
      'expireTokens',
      'checkUserAuthStatus',
      'initialiseAuth'
    ]);

    screenOrientationSpy = jasmine.createSpyObj('ScreenOrientation', ['lock']);

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'addCustomDimension'
    ]);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: PAGE_NAMES.SIGNATURE_PAD_PAGE,
            component: SignaturePadPage
          },
          {
            path: PAGE_NAMES.TEST_STATION_HOME_PAGE,
            component: TestStationHomePage
          }
        ])
      ],
      providers: [
        MobileAccessibility,
        NetworkService,
        { provide: AuthenticationService, useValue: authenticationSpy },
        { provide: AppService, useClass: AppServiceMock },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: EventsService, useFactory: () => EventsMock.instance() },
        { provide: Network, useFactory: () => NetworkMock.instance('wifi') },
        { provide: ScreenOrientation, useValue: screenOrientationSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: ActivityService, useClass: ActivityServiceMock },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: SyncService, useValue: syncServiceSpy },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: Store, useClass: TestStore },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    events = TestBed.inject(EventsService);
    authenticationService = TestBed.inject(AuthenticationService);
    syncService = TestBed.inject(SyncService);
    storageService = TestBed.inject(StorageService);
    appService = TestBed.inject(AppService);
    visitService = TestBed.inject(VisitService);
    activityService = TestBed.inject(ActivityService);
    screenOrientation = TestBed.inject(ScreenOrientation);
    analyticsService = TestBed.inject(AnalyticsService);
    logProvider = TestBed.inject(LogsProvider);
    networkService = TestBed.inject(NetworkService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(comp instanceof AppComponent).toBe(true);
  });

  describe('when loading app', () => {
    beforeEach(() => {
      spyOn(networkService, 'initialiseNetworkStatus');
      spyOn(networkService, 'getNetworkState').and.returnValue(CONNECTION_STATUS.ONLINE);
      spyOn(appService, 'manageAppInit').and.callFake(() => Promise.resolve());
      // spyOn(comp, 'setupLogNetworkStatus');
    });

    it('should set app defaults and navigate to signature page', async () => {
      authenticationService.checkUserAuthStatus = jasmine
        .createSpy('authenticationService.checkUserAuthStatus')
        .and.returnValue(true);

      await comp.initApp();

      expect(authenticationService.expireTokens).toHaveBeenCalledWith();
      expect(networkService.initialiseNetworkStatus).toHaveBeenCalled();
      expect(appService.manageAppInit).toHaveBeenCalled();

      expect(networkService.getNetworkState).toHaveBeenCalled();
      // expect(comp.navElem.setRoot).toHaveBeenCalledWith(PAGE_NAMES.SIGNATURE_PAD_PAGE);
    });
  });

  it('should SyncService and Root Component share the same instance', inject(
    [SyncService],
    (injectService: SyncService) => {
      expect(injectService).toBe(syncService);
    }
  ));

  it('should StorageService and Root Component share the same instance', inject(
    [StorageService],
    (injectService: StorageService) => {
      expect(injectService).toBe(storageService);
    }
  ));

  it('should VisitService and Root Component share the same instance', inject(
    [VisitService],
    (injectService: VisitService) => {
      expect(injectService).toBe(visitService);
    }
  ));

  //TODO - add the 3 following tests back when StateReformingService is implemented

  // it('Should check manageAppState method state resp: true, visit resp: true, activities resp: false', () => {
  //   storageService.read = jasmine.createSpy('read').and.callFake((key) => {
  //     let keyReturn;
  //     switch (key) {
  //       case STORAGE.STATE: {
  //         keyReturn = true;
  //         break;
  //       }
  //       case STORAGE.VISIT: {
  //         keyReturn = true;
  //         break;
  //       }
  //       case STORAGE.ACTIVITIES: {
  //         keyReturn = false;
  //         break;
  //       }
  //     }
  //     return new Promise((resolve) => resolve(keyReturn));
  //   });
  //   comp.manageAppState();
  //   expect(storageService.read).toHaveBeenCalled();
  // });

  // it('Should check manageAppState method state resp: true, visit resp: true, activities resp: true', () => {
  //   storageService.read = jasmine.createSpy('read').and.callFake((key) => {
  //     let keyReturn;
  //     switch (key) {
  //       case STORAGE.STATE: {
  //         keyReturn = true;
  //         break;
  //       }
  //       case STORAGE.VISIT: {
  //         keyReturn = true;
  //         break;
  //       }
  //       case STORAGE.ACTIVITIES: {
  //         keyReturn = true;
  //         break;
  //       }
  //     }
  //     return new Promise((resolve) => resolve(keyReturn));
  //   });
  //   comp.manageAppState();
  //   expect(storageService.read).toHaveBeenCalled();
  // });

  // it('Should check manageAppState method false state response', async () => {
  //   storageService.read = jasmine.createSpy('read').and.callFake((key) => {
  //     let keyReturn;
  //     switch (key) {
  //       case STORAGE.STATE: {
  //         keyReturn = false;
  //         break;
  //       }
  //       case STORAGE.VISIT: {
  //         keyReturn = true;
  //         break;
  //       }
  //       case STORAGE.ACTIVITIES: {
  //         keyReturn = false;
  //         break;
  //       }
  //     }
  //     return new Promise((resolve) => resolve(keyReturn));
  //   });
  //   await comp.manageAppState();
  // });
});
