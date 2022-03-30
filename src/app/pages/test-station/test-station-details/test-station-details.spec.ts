import { TestStationDetailsPage } from './test-station-details';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  IonicModule,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { PipesModule } from '@pipes/pipes.module';
import {
  AlertControllerMock,
  LoadingControllerMock
} from 'ionic-mocks';
import { VisitService } from '@providers/visit/visit.service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  ANALYTICS_VALUE, PAGE_NAMES
} from '@app/app.enums';
import {Router} from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {RouterTestingModule} from '@angular/router/testing';
import {VisitServiceMock} from '@test-config/services-mocks/visit-service.mock';
import {VisitTimelinePage} from '@app/pages/visit/visit-timeline/visit-timeline';
import {TestStationDataMock} from '@assets/data-mocks/reference-data-mocks/test-station-data.mock';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

fdescribe('Component: TestStationDetailsPage', () => {
  let component: TestStationDetailsPage;
  let fixture: ComponentFixture<TestStationDetailsPage>;
  let callNumberSpy: any;
  let openNativeSettingsSpy: any;
  let visitServiceMock: VisitService;
  let alertCtrl: AlertController;
  let logProvider: LogsProvider;
  let logProviderSpy;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: Router;
  const testStationMock = TestStationDataMock.TestStationData[0];

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
        PipesModule,
        RouterTestingModule.withRoutes([
          {
            path: PAGE_NAMES.VISIT_TIMELINE_PAGE,
            component: VisitTimelinePage
          }
        ])
      ],
      providers: [
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
    visitServiceMock = TestBed.inject(VisitService);
    alertCtrl = TestBed.inject(AlertController);
    analyticsService = TestBed.inject(AnalyticsService);
    logProvider = TestBed.inject(LogsProvider);
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              testStation: testStationMock
            }
          }
      } as any
      );
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
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

  it('should test confirmStartVisit if error', async () => {
    spyOn(visitServiceMock, 'startVisit').and.returnValue(throwError(new HttpErrorResponse({})));
    await component.confirmStartVisit();
    expect(analyticsService.logEvent).toHaveBeenCalledWith({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.TEST_ERROR,
      label: ANALYTICS_VALUE.START_ACTIVITY_FAILED
    });
  });

  it('should create reportIssue alert', async () => {
    component.ionViewWillEnter();
    await component.reportIssueHandler();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should create alert for starting a visit', async () => {
    component.ionViewWillEnter();
    await component.startVisit();
    expect(alertCtrl.create).toHaveBeenCalled();
  });
});
