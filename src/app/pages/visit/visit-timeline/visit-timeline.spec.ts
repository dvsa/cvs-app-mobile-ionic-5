import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  NavController,
  LoadingController,
  AlertController,
  NavParams,
  ToastController,
  ModalController
} from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import {
  LoadingControllerMock,
  AlertControllerMock,
  NavParamsMock,
  ToastControllerMock,
  ModalControllerMock
} from 'ionic-mocks';

import { PipesModule } from '@pipes/pipes.module';
import { VisitTimelinePage } from './visit-timeline';
import { AppService } from '@providers/global/app.service';
import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { TestService } from '@providers/test/test.service';
import { TestServiceMock } from '@test-config/services-mocks/test-service.mock';
import { VisitService } from '@providers/visit/visit.service';
import { StorageService } from '@providers/natives/storage.service';
import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';
import { ActivityService } from '@providers/activity/activity.service';
import { ActivityDataMock } from '@assets/data-mocks/activity.data.mock';
import { TestModel } from '@models/tests/test.model';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS, ANALYTICS_VALUE,
  APP_STRINGS,
  AUTH,
  PAGE_NAMES,
  VEHICLE_TYPE
} from '@app/app.enums';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';
import { VisitModel } from '@models/visit/visit.model';
import { ActivityModel } from '@models/visit/activity.model';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { AnalyticsService } from '@providers/global';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { LogsProvider } from '@store/logs/logs.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { VehicleLookupPage } from '@app/pages/vehicle/vehicle-lookup/vehicle-lookup';
import { ConfirmationPage } from '@app/pages/visit/confirmation/confirmation';

describe('Component: VisitTimelinePage', () => {
  let component: VisitTimelinePage;
  let fixture: ComponentFixture<VisitTimelinePage>;
  let openNativeSettingsSpy: any;
  let loadingCtrl: LoadingController;
  let modalCtrl: ModalController;
  let alertCtrl: AlertController;
  let navCtrl: NavController;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let activityService: ActivityService;
  let activityServiceSpy: jasmine.SpyObj<ActivityService>;
  let visitService: VisitService;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let authenticationService: AuthenticationService;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: Router;
  const waitActivity = ActivityDataMock.WaitActivityData;

  const TEST_STATION_NAME = 'Ashby';
  const getMockVisit = (): VisitModel => ({
      id: 'visit_UUID',
      testStationName: TEST_STATION_NAME,
      testStationEmail: `${TEST_STATION_NAME}@xyx.com`
    } as VisitModel);

  const getMockVisitTest = (): TestModel => ({
      startTime: '2019-05-23T14:52:04.208Z',
      endTime: '2019-05-23T14:52:24.773Z'
    } as TestModel);

  const getMockActivity = (): ActivityModel => ({
      activityType: 'wait',
      startTime: '2019-05-22T11:11:14.702Z',
      endTime: '2019-05-22T11:12:31.625Z',
      id: '8ae539aa-cbfb-49e2-8951-63567003b512',
      notes: 'qwewe'
    } as ActivityModel);

  beforeEach(() => {
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['delete']);

    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    activityServiceSpy = jasmine.createSpyObj('ActivityService', [
      'createActivity',
      'getActivities',
      'createActivityBodyForCall',
      'createActivitiesForUpdateCall',
      'submitActivity',
      'updateActivitiesArgs',
      'updateActivityReasons',
      'canAddOtherWaitingTime',
      'have5MinutesPassedSinceLastActivity',
      'createWaitTime',
      'createActivityToPost$',
      'checkWaitTimeReasons'
    ]);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'setCurrentPage'
    ]);

    TestBed.configureTestingModule({
      declarations: [VisitTimelinePage],
      imports: [
        PipesModule,
        RouterTestingModule.withRoutes([
          {
            path: PAGE_NAMES.VEHICLE_LOOKUP_PAGE,
            component: VehicleLookupPage
          },
          {
            path: PAGE_NAMES.CONFIRMATION_PAGE,
            component: ConfirmationPage
          }
        ]),
      ],
      providers: [
        FormatVrmPipe,
        CommonFunctionsService,
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: ToastController, useFactory: () => ToastControllerMock.instance() },
        { provide: AppService, useClass: AppServiceMock },
        { provide: TestService, useClass: TestServiceMock },
        { provide: ActivityService, useValue: activityServiceSpy },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: OpenNativeSettings, useValue: openNativeSettingsSpy },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitTimelinePage);
    component = fixture.componentInstance;
    loadingCtrl = TestBed.inject(LoadingController);
    activityService = TestBed.inject(ActivityService);
    visitService = TestBed.inject(VisitService);
    modalCtrl = TestBed.inject(ModalController);
    alertCtrl = TestBed.inject(AlertController);
    navCtrl = TestBed.inject(NavController);
    storageService = TestBed.inject(StorageService);
    authenticationService = TestBed.inject(AuthenticationService);
    logProvider = TestBed.inject(LogsProvider);
    analyticsService = TestBed.inject(AnalyticsService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    loadingCtrl = null;
    modalCtrl = null;
    alertCtrl = null;
    storageService = null;
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  // TODO reintroduce as part of wait times
  // it('should delete platformSubscription if it exists', () => {
  //   component.platformSubscription = new Subscription();
  //   component.ngOnDestroy();
  //   expect(component.platformSubscription.closed).toBeTruthy();
  // });

  it('should check ionViewDidEnter logic when timeline already has an wait activity', () => {
    component.timeline = [];
    component.timeline.push(waitActivity);
    component.ionViewDidEnter();
    component.createNewTestReport();
    expect(component.timeline.length > 0).toBeTruthy();
  });

  it('should create timeline', () => {
    activityServiceSpy.getActivities.and.returnValue([getMockActivity()] as ActivityModel[]);
    spyOn(visitService, 'getTests').and.returnValue([getMockVisitTest()] as TestModel[]);

    component.createTimeline();

    expect(component.timeline).toEqual([getMockActivity(), getMockVisitTest()]);
  });

  // TODO Re-enable when wait times re-introduced
  // it('should display the wait reason alert if an activity has wait time reason', async () => {
  //   const visit = getMockVisit();
  //   activityServiceSpy.checkWaitTimeReasons.and.returnValue(true);
  //   await component.showConfirm(visit);
  //
  //   expect(await alertCtrl.create).toHaveBeenCalled();
  // });
  //
  // it('should display the end visit alert if there are no activity with wait time reason', async () => {
  //   const visit = getMockVisit();
  //   activityServiceSpy.checkWaitTimeReasons.and.returnValue(false);
  //
  //   await component.showConfirm(visit);
  //
  //   expect(await alertCtrl.create).toHaveBeenCalled();
  // });

  it('should show loading indicator if loading text is provided', async () => {
    await component.showLoading(APP_STRINGS.END_VISIT_LOADING);

    expect(loadingCtrl.create).toHaveBeenCalledOnceWith({ message: APP_STRINGS.END_VISIT_LOADING });
    expect(component.loading.present).toHaveBeenCalled();
  });

  it('should dismiss loading indicator if loading text is not provided', async () => {
    component.loading = loadingCtrl.create({ message: '' });
    await component.showLoading('');

    expect(loadingCtrl.create).toHaveBeenCalledOnceWith({ message: '' });
    expect(component.loading.dismiss).toHaveBeenCalled();
  });

  describe('confirmEndVisit$', () => {
    beforeEach(() => {
      component.visit = getMockVisit();
      spyOn(component, 'showLoading');
    });

    it('should display the site closed alert if visit was previously closed', async () => {
      spyOn(visitService, 'endVisit').and.returnValue(
        of({
          body: {
            wasVisitAlreadyClosed: true
          }
        })
      );
      let sitePrevClosed: boolean;
      component.confirmEndVisit$().subscribe((siteClosed) => (sitePrevClosed = siteClosed));

      expect(sitePrevClosed).toBeUndefined();
      expect(component.isCreateTestEnabled).toBeFalsy();
      expect(await component.showLoading).toHaveBeenCalledWith(APP_STRINGS.END_VISIT_LOADING);
      expect(await visitService.endVisit).toHaveBeenCalledWith(getMockVisit().id);
      expect(await analyticsService.logEvent).toHaveBeenCalledWith({
        category: ANALYTICS_EVENT_CATEGORIES.VISIT,
        event: ANALYTICS_EVENTS.SUBMIT_VISIT
      });
      expect(logProvider.dispatchLog).toHaveBeenCalled();
      expect(await alertCtrl.create).toHaveBeenCalled();
    });

    it('should display the try again alert on internet required error', async () => {
      spyOn(visitService, 'endVisit').and.returnValue(throwError(new HttpErrorResponse({ error : AUTH.INTERNET_REQUIRED})));

      component.confirmEndVisit$().subscribe();
      expect(await component.showLoading).toHaveBeenCalledWith('');
      expect(await logProvider.dispatchLog).toHaveBeenCalled();

      expect(await analyticsService.logEvent).toHaveBeenCalledWith({
        category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
        event: ANALYTICS_EVENTS.TEST_ERROR,
        label: ANALYTICS_VALUE.ENDING_ACTIVITY_FAILED
      });

      expect(await alertCtrl.create).toHaveBeenCalled();
    });

    // TODO Re-enable when wait times re-introduced
    // describe('createActivityReasonsToPost$', () => {
      // const activityReason = {
      //   id: 'activity_id',
      //   waitReason: 'having lunch',
      //   notes: 'flat tyres'
      // };
      // beforeEach(() => {
      //   spyOn(storageService, 'delete');
      // });

      // it('should post the activity with reasons if exist and clear storage', async () => {
      //   // activityServiceSpy.createActivitiesForUpdateCall.and.returnValue([activityReason]);
      //   // activityServiceSpy.updateActivityReasons.and.returnValue(
      //   //   of(new HttpResponse({
      //   //     status: 200
      //   //   }))
      //   // );
      //   //
      //   // await component.createActivityReasonsToPost$([getMockActivity()]);
      //   //
      //   // expect(logProvider.dispatchLog).toHaveBeenCalled();
      //   // expect(storageService.delete).toHaveBeenCalledTimes(3);
      //   // expect(component.showLoading).toHaveBeenCalled();
      //   // expect(navCtrl.push).toHaveBeenCalledWith(PAGE_NAMES.CONFIRMATION_PAGE, {
      //   //   testStationName: TEST_STATION_NAME
      //   // });
      // });

      // it('should only clear storage if activity reason does not exist', async () => {
      //   activityServiceSpy.createActivitiesForUpdateCall.and.returnValue([]);
      //
      //   await component.createActivityReasonsToPost$([getMockActivity()]);
      //
      //
      //   expect(storageService.delete).toHaveBeenCalledTimes(3);
      //   expect(component.showLoading).toHaveBeenCalled();
      //   // expect(navCtrl.push).toHaveBeenCalledWith(PAGE_NAMES.CONFIRMATION_PAGE, {
      //   //   testStationName: TEST_STATION_NAME
      //   // });
      // });
      //
      // it('should log error if post activity with reason fails', async () => {
      //   activityServiceSpy.createActivitiesForUpdateCall.and.returnValue([activityReason]);
      //   activityServiceSpy.updateActivityReasons.and.returnValue(throwError('error'));
      //
      //   await component.createActivityReasonsToPost$([getMockActivity()]);
      //
      //   expect(component.showLoading).toHaveBeenCalledWith('');
      //   expect(logProvider.dispatchLog).toHaveBeenCalled();
      // });
    // });
  });

  // TODO re-introduce this with wait times
  // it('should check if modal is created', () => {
  //   component.editWaitTime(waitActivity);
  //   expect(modalCtrl.create).toHaveBeenCalled();
  //
  //   waitActivity.activityType = 'other';
  //   component.editWaitTime(waitActivity);
  //   expect(modalCtrl.create).toHaveBeenCalled();
  // });

  it('should return the VRM when the vehicle is a PSV', () => {
    const vehicle: VehicleModel = Object.create(VehicleDataMock.VehicleData);
    vehicle.techRecord.vehicleType = VEHICLE_TYPE.PSV;
    vehicle.vrm = 'AB12CDE';
    expect(component.getVehicleIdentifier(vehicle)).toBe('AB12 CDE');
  });

  it('should return the Trailer ID when the vehicle is a Trailer', () => {
    const vehicle: VehicleModel = Object.create(VehicleDataMock.VehicleData);
    vehicle.techRecord.vehicleType = VEHICLE_TYPE.TRL;
    vehicle.trailerId = 'C000001';
    expect(component.getVehicleIdentifier(vehicle)).toBe('C000001');
  });
});
