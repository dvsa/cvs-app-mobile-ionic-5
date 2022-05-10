import {
  NavParams,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestCancelPage } from './test-cancel';
import { TestService } from '@providers/test/test.service';
import { TestModel } from '@models/tests/test.model';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { NavParamsMock } from '@test-config/ionic-mocks/nav-params.mock';
import { VisitDataMock } from '@assets/data-mocks/visit-data.mock';
import { TestResultService } from '@providers/test-result/test-result.service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { AlertControllerMock, LoadingControllerMock } from 'ionic-mocks';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { Store } from '@ngrx/store';
import { TestStore } from '@store/logs/data-store.service.mock';
import { TestResultServiceMock } from '@test-config/services-mocks/test-result-service.mock';
import { ActivityService } from '@providers/activity/activity.service';
import { ActivityServiceMock } from '@test-config/services-mocks/activity-service.mock';
import { LogsProvider } from '@store/logs/logs.service';
import { AnalyticsService } from '@providers/global';
import { ANALYTICS_SCREEN_NAMES, AUTH, PAGE_NAMES } from '@app/app.enums';
import { RouterTestingModule } from '@angular/router/testing';
import { VisitTimelinePage } from '@app/pages/visit/visit-timeline/visit-timeline';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('Component: TestCancelPage', () => {
  let component: TestCancelPage;
  let fixture: ComponentFixture<TestCancelPage>;
  let testReportService: TestService;
  let testReportServiceSpy: any;
  let openNativeSettingsSpy: any;
  let visitService: VisitService;
  let alertCtrl: AlertController;
  let activityService: ActivityService;
  let store: Store<any>;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let testResultService: TestResultService;

  const testReport: TestModel = {
    startTime: null,
    endTime: null,
    status: null,
    reasonForCancellation: '',
    vehicles: []
  };

  beforeEach(() => {
    testReportServiceSpy = jasmine.createSpyObj('testReportService', [
      { getTestReport: testReport },
      'endTestReport'
    ]);
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', [
      {
        open: new Promise(() => true)
      }
    ]);

    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'setCurrentPage',
      'logEvent',
      'addCustomDimension'
    ]);

    TestBed.configureTestingModule({
      declarations: [TestCancelPage],
      imports: [
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
        { provide: OpenNativeSettings, useValue: openNativeSettingsSpy },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: ActivityService, useClass: ActivityServiceMock },
        { provide: TestService, useValue: testReportServiceSpy },
        { provide: TestResultService, useClass: TestResultServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: Store, useClass: TestStore },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCancelPage);
    component = fixture.componentInstance;
    visitService = TestBed.inject(VisitService);
    alertCtrl = TestBed.inject(AlertController);
    activityService = TestBed.inject(ActivityService);
    testReportService = TestBed.inject(TestService);
    store = TestBed.inject(Store);
    analyticsService = TestBed.inject(AnalyticsService);
    logProvider = TestBed.inject(LogsProvider);
    testResultService = TestBed.inject(TestResultService);
  });

  beforeEach(() => {
    const navParams = fixture.debugElement.injector.get(NavParams);

    navParams.get = jasmine.createSpy('get').and.callFake((param) => {
      const params = {
        test: VisitDataMock.VisitTestData
      };
      return params[param];
    });
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    visitService = null;
    alertCtrl = null;
    activityService = null;
    store = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test ionViewDidEnterLogic', async () => {
    await component.ionViewDidEnter();
    expect(analyticsService.setCurrentPage).toHaveBeenCalledWith(
      ANALYTICS_SCREEN_NAMES.TEST_CANCEL
    );
  });

  it('should VisitService and TestCancelPage Component share the same instance', inject(
    [VisitService],
    (injectService: VisitService) => {
      expect(injectService).toBe(visitService);
    }
  ));

  it('should verify either a string is valid or not', () => {
    component.cancellationReason = ' ';
    expect(component.isValidReason()).toBeFalsy();
    component.cancellationReason = 'reason';
    expect(component.isValidReason()).toBeTruthy();
  });

  it('should test submitting a test - success case', async () => {
    visitService.visit = VisitDataMock.VisitData;
    await component.submit(VisitDataMock.VisitTestData);
    expect(await alertCtrl.create).toHaveBeenCalled();
  });

  // TODO - this may need changing
  it('should test submitting a test - error case on submitActivity', async () => {
    visitService.visit = VisitDataMock.VisitData;
    spyOn(testResultService, 'submitTestResult').and.returnValue(
      throwError(
        new HttpErrorResponse({ error : AUTH.INTERNET_REQUIRED })
      )
    );
    await component.submit(VisitDataMock.VisitTestData);
    expect(logProvider.dispatchLog).toHaveBeenCalled();
  });

  it('should present onSubmit alert depending on cancellationReason', async () => {
    component.cancellationReason = '   ';
    await component.onSubmit();
    expect(component.cancellationReason).toEqual('');
    expect(await alertCtrl.create).toHaveBeenCalled();
  });

  it('should test the submit.s handler', async () => {
    spyOn(component, 'submit');
    component.testData = testReport;
    await component.submitHandler();
    expect(testReportService.endTestReport).toHaveBeenCalled();
    expect(await component.submit).toHaveBeenCalled();
  });
});
