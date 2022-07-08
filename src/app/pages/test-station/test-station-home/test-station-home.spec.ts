import { TestStationHomePage } from './test-station-home';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertController, NavController } from '@ionic/angular';
import { AppService } from '@providers/global/app.service';
import { StorageService } from '@providers/natives/storage.service';
import { VisitService } from '@providers/visit/visit.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { AlertControllerMock } from 'ionic-mocks';
import { ANALYTICS_SCREEN_NAMES, PAGE_NAMES, TESTER_ROLES } from '@app/app.enums';
import { Store } from '@ngrx/store';
import { TestStore } from '@store/logs/data-store.service.mock';
import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { SyncService } from '@providers/global/sync.service';
import { LogsProvider } from '@store/logs/logs.service';
import { AnalyticsService, AppAlertService } from '@providers/global';
import { AuthenticationService } from '@providers/auth';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SignaturePadPage } from '@app/pages/signature-pad/signature-pad';
import { TestStationSearchPage } from '@app/pages/test-station/test-station-search/test-station-search';

describe('Component: TestStationHomePage', () => {
  let comp: TestStationHomePage;
  let fixture: ComponentFixture<TestStationHomePage>;
  let appService: AppService;
  let screenOrientation: ScreenOrientation;
  let screenOrientationSpy: ScreenOrientation;
  let syncService: SyncService;
  let syncServiceSpy: any;
  let logProviderSpy: any;
  let appAlertSpy: any;
  let appAlertService: AppAlertService;
  let authenticationService: AuthenticationService;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: Router;

  beforeEach(waitForAsync(() => {

    screenOrientationSpy = jasmine.createSpyObj('ScreenOrientation', {
      lock: () => {},
      ORIENTATIONS: 'PORTRAIT_PRIMARY'
    });

    syncServiceSpy = jasmine.createSpyObj('SyncService', {
      startSync: [null, true]
    });

    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    appAlertSpy = jasmine.createSpyObj('AppAlertService', ['alertUnAuthorise']);

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['setCurrentPage']);

    TestBed.configureTestingModule({
      declarations: [TestStationHomePage],
      imports:  [
        RouterTestingModule.withRoutes([
          {
            path: PAGE_NAMES.TEST_STATION_SEARCH_PAGE,
            component: TestStationSearchPage
          }
        ])
      ],
      providers: [
        { provide: AppService, useClass: AppServiceMock },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: ScreenOrientation, useValue: screenOrientationSpy },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: AppAlertService, useValue: appAlertSpy },
        { provide: Store, useClass: TestStore },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: SyncService, useValue: syncServiceSpy },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStationHomePage);
    comp = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    screenOrientation = TestBed.inject(ScreenOrientation);
    syncService = TestBed.inject(SyncService);
    authenticationService = TestBed.inject(AuthenticationService);
    appAlertService = TestBed.inject(AppAlertService);
    analyticsService = TestBed.inject(AnalyticsService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    appService = null;
    screenOrientation = null;
    screenOrientationSpy = null;
    syncService = null;
  });

  it('should create component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    done();
  });

  it('should check if appService.enableCache has been called', () => {
    spyOn(appService, 'enableCache');
    comp.enableCache();
    expect(appService.enableCache).toHaveBeenCalled();
  });

  it('should set app orientation on initialization', () => {
    // spyOn(appService, 'isCordova').and.returnValue(true);
    // appService.isCordova = true;

    comp.ngOnInit();

    expect(screenOrientation.lock).toHaveBeenCalledWith(
      screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
    expect(analyticsService.setCurrentPage).toHaveBeenCalledWith(
      ANALYTICS_SCREEN_NAMES.GET_STARTED
    );
  });

  describe('ionViewDidEnter', () => {
    it('should alert unauthorise if user has no right', async () => {
      spyOn(authenticationService, 'hasUserRights').and.returnValue(Promise.resolve(false));

      await comp.ionViewDidEnter();

      expect(authenticationService.hasUserRights).toHaveBeenCalledWith([
        TESTER_ROLES.FULL_ACCESS,
        TESTER_ROLES.PSV,
        TESTER_ROLES.HGV,
        TESTER_ROLES.ADR,
        TESTER_ROLES.TIR
      ]);
      expect(appAlertService.alertUnAuthorise).toHaveBeenCalled();
    });
  });

  it('should test getStarted flow', async () => {
    await comp.getStarted();

    expect(syncService.startSync).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([PAGE_NAMES.TEST_STATION_SEARCH_PAGE]);

    // appService.isCordova = true;
    appService.isSignatureRegistered = true;
    await comp.getStarted();
    expect(router.navigate).toHaveBeenCalledWith([PAGE_NAMES.TEST_STATION_SEARCH_PAGE]);
  });
});
