import { TestStationDetailsPage } from './test-station-details';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  IonicModule,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { PipesModule } from '@pipes/pipes.module';
import {
  NavControllerMock,
  AlertControllerMock,
  ViewControllerMock,
  LoadingControllerMock
} from 'ionic-mocks';
import { CallNumber } from '@ionic-native/call-number';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import { NavParamsMock } from '@test-config/ionic-mocks/nav-params.mock';
import { Store } from '@ngrx/store';
import { TestStore } from '@store/logs/data-store.service.mock';
import { AppService, AnalyticsService } from '@providers/global';
import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { LogsProvider } from '@store/logs/logs.service';
import { AuthenticationService } from '@providers/auth';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_VALUE
} from '@app/app.enums';

describe('Component: TestStationDetailsPage', () => {
  let component: TestStationDetailsPage;
  let fixture: ComponentFixture<TestStationDetailsPage>;
  let callNumberSpy: any;
  let openNativeSettingsSpy: any;
  let navParams: NavParams;
  let visitServiceMock: VisitService;
  let alertCtrl: AlertController;
  let logProvider: LogsProvider;
  let logProviderSpy;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;

  beforeEach(() => {
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);
    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'setCurrentPage'
    ]);

    TestBed.configureTestingModule({
      declarations: [TestStationDetailsPage],
      imports: [
        IonicModule,
        PipesModule
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: CallNumber, useValue: callNumberSpy },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: OpenNativeSettings, useValue: openNativeSettingsSpy },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: Store, useClass: TestStore },
        { provide: AppService, useClass: AppServiceMock },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStationDetailsPage);
    component = fixture.componentInstance;
    navParams = TestBed.inject(NavParams);
    visitServiceMock = TestBed.inject(VisitService);
    alertCtrl = TestBed.inject(AlertController);
    analyticsService = TestBed.inject(AnalyticsService);
    logProvider = TestBed.inject(LogsProvider);
  });

  beforeEach(() => {
    //@TODO replace with angular router
    // const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        testStation: {} as TestStationReferenceDataModel
      };
      return params[param];
    });
  });

  beforeEach(() => {
    component.testStation = navParams.get('testStation');
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    navParams = null;
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test ionViewDidEnterLogic', () => {
    component.ionViewDidEnter();

    expect(analyticsService.setCurrentPage).toHaveBeenCalledWith(
      ANALYTICS_SCREEN_NAMES.TEST_STATION_DETAILS
    );
  });

  it('should test confirmStartVisit if error', () => {
    //@TODO - resolve this error
    // visitServiceMock.isError = true;
    component.confirmStartVisit();
    expect(analyticsService.logEvent).toHaveBeenCalledWith({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.TEST_ERROR,
      label: ANALYTICS_VALUE.START_ACTIVITY_FAILED
    });
  });

  it('should create reportIssue alert', () => {
    component.reportIssueHandler();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should create alert for starting a visit', () => {
    component.startVisit();
    expect(alertCtrl.create).toHaveBeenCalled();
  });
});
