import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { AppService } from '@providers/global/app.service';
import { TestReviewPage } from './test-review';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NavController,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { AlertControllerMock, LoadingControllerMock } from 'ionic-mocks';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { VehicleServiceMock } from '@test-config/services-mocks/vehicle-service.mock';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '@providers/natives/storage.service';
import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';
import { TestResultService } from '@providers/test-result/test-result.service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { TestService } from '@providers/test/test.service';
import { TestServiceMock } from '@test-config/services-mocks/test-service.mock';
import { DefectsService } from '@providers/defects/defects.service';
import { VisitDataMock } from '@assets/data-mocks/visit-data.mock';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { TestResultServiceMock } from '@test-config/services-mocks/test-result-service.mock';
import { ActivityService } from '@providers/activity/activity.service';
import { ActivityServiceMock } from '@test-config/services-mocks/activity-service.mock';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import { APP_STRINGS, PAGE_NAMES, TEST_TYPE_RESULTS, VEHICLE_TYPE } from '@app/app.enums';
import { VehicleTechRecordModel } from '@models/vehicle/tech-record.model';
import { TechRecordDataMock } from '@assets/data-mocks/tech-record-data.mock';
import { By } from '@angular/platform-browser';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { TestTypeServiceMock } from '@test-config/services-mocks/test-type-service.mock';
import { SpecialistCustomDefectModel } from '@models/defects/defect-details.model';
import { LogsProvider } from '@store/logs/logs.service';
import { AnalyticsService } from '@providers/global';
import { TestModel } from '@models/tests/test.model';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationPage } from '@app/pages/visit/confirmation/confirmation';

describe('Component: TestReviewPage', () => {
  let component: TestReviewPage;
  let fixture: ComponentFixture<TestReviewPage>;
  let visitService: VisitService;
  let alertCtrl: AlertController;
  let activityService: ActivityService;
  let commonFuncService: CommonFunctionsService;
  let testService: TestService;
  let vehicleService: VehicleService;
  let navCtrl: NavController;
  let loadingCtrl: LoadingController;
  let openNativeSettings: OpenNativeSettings;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: Router;

  const vehicleTechRecord: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
  const VEHICLE: VehicleModel = VehicleDataMock.VehicleData;

  beforeEach(() => {
    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'setCurrentPage'
    ]);

    TestBed.configureTestingModule({
      declarations: [TestReviewPage],
      imports: [RouterTestingModule.withRoutes([
        {
          path: PAGE_NAMES.CONFIRMATION_PAGE,
          component: ConfirmationPage
        },
      ])],
      providers: [
        CommonFunctionsService,
        OpenNativeSettings,
        DefectsService,
        NativePageTransitions,
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: ActivityService, useClass: ActivityServiceMock },
        { provide: TestResultService, useClass: TestResultServiceMock },
        { provide: TestService, useClass: TestServiceMock },
        { provide: TestTypeService, useClass: TestTypeServiceMock },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: VehicleService, useClass: VehicleServiceMock },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: AppService, useClass: AppServiceMock },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: ActivityService, useClass: ActivityServiceMock },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(TestReviewPage);
    component = fixture.componentInstance;
    visitService = TestBed.inject(VisitService);
    alertCtrl = TestBed.inject(AlertController);
    activityService = TestBed.inject(ActivityService);
    commonFuncService = TestBed.inject(CommonFunctionsService);
    testService = TestBed.inject(TestService);
    vehicleService = TestBed.inject(VehicleService);
    navCtrl = TestBed.inject(NavController);
    logProvider = TestBed.inject(LogsProvider);
    analyticsService = TestBed.inject(AnalyticsService);
    loadingCtrl = TestBed.inject(LoadingController);
    openNativeSettings = TestBed.inject(OpenNativeSettings);
    router = TestBed.inject(Router);

    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              vehicleBeingReviewed: VEHICLE,
              backButtonText: '',
              previousExtras: {},
            }
          }
      } as any
    );
    visitService.visit = component.visit = VisitDataMock.VisitData;
    spyOn(window.localStorage, 'getItem').and.callFake(() => JSON.stringify({ test: 'test' }));
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    alertCtrl = null;
    visitService = null;
    activityService = null;
    commonFuncService = null;
    testService = null;
    vehicleService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
    expect(component.roadworthinessTestTypesIds.length).toEqual(5);
  });

  it('should check the ngOnInit logic', async () => {
    component.ngOnInit();
    expect(window.localStorage.getItem).toHaveBeenCalled();
  });

  it('should test submitting a test', async () => {
    await component.onSubmit(VisitDataMock.VisitTestData);
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should test submitting a test - error case on submitActivity', async () => {
    spyOn(activityService, 'submitActivity').and.returnValue(throwError(new HttpErrorResponse({})));
    await component.onSubmit(VisitDataMock.VisitTestData);

    expect(logProvider.dispatchLog).toHaveBeenCalled();
  });

  it('should test getCountryStringToBeDisplayed', () => {
    spyOn(commonFuncService, 'getCountryStringToBeDisplayed');
    component.getCountryStringToBeDisplayed(VEHICLE);
    expect(commonFuncService.getCountryStringToBeDisplayed).toHaveBeenCalled();
  });

  it('should verify that the vehicle type is one of the specified types', () => {
    const vehicle = Object.create(VehicleDataMock.VehicleData);
    expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.PSV)).toBeTruthy();
    expect(
      component.isVehicleOfType(vehicle, VEHICLE_TYPE.PSV, VEHICLE_TYPE.TRL, VEHICLE_TYPE.HGV)
    ).toBeTruthy();
  });

  it('should verify that the vehicle type is not one of specified types', () => {
    const vehicle = Object.create(VehicleDataMock.VehicleData);
    expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.TRL)).toBeFalsy();
    expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.TRL, VEHICLE_TYPE.HGV)).toBeFalsy();
  });

  it('display the submit button if the currently reviewed vehicle is the last one', async ()  => {
    const newTest = testService.createTest();
    const firstVehicle = vehicleService.createVehicle(vehicleTechRecord);
    const secondVehicle = vehicleService.createVehicle(vehicleTechRecord);
    newTest.vehicles.push(firstVehicle);
    newTest.vehicles.push(secondVehicle);
    firstVehicle.testTypes = [];
    firstVehicle.countryOfRegistration = 'United Kingdom';
    firstVehicle.euVehicleCategory = 'm1';
    firstVehicle.odometerReading = '122';

    secondVehicle.testTypes = [];
    secondVehicle.countryOfRegistration = 'United Kingdom';
    secondVehicle.euVehicleCategory = 'm2';
    secondVehicle.odometerReading = '123';

    component.latestTest = newTest;
    component.vehicleBeingReviewed = component.latestTest.vehicles.length - 1;
    spyOn(component, 'goToNextPage');
    const submitButton = fixture.debugElement.query(By.css('.footer-cta-section>ion-button'));
    expect(component.nextButtonText).toBe('Submit tests');
    submitButton.triggerEventHandler('click', null);
    expect(component.goToNextPage).toHaveBeenCalled();
  });

  it('should update completeFields with the values on the current testType', () => {
    const testType = TestTypeDataModelMock.TestTypeData;
    component.completeFields(testType);
    expect(Object.keys(component.completedFields).length).toBe(0);

    testType.seatbeltInstallationCheckDate = true;
    testType.lastSeatbeltInstallationCheckDate = new Date().toISOString();
    testType.numberOfSeatbeltsFitted = 3;
    component.completeFields(testType);
    expect(Object.keys(component.completedFields).length).toBe(3);
  });

  it('should open the test complete page', async () => {
    const navSpy = spyOn(router, 'navigate');
    const firstVehicle = vehicleService.createVehicle(vehicleTechRecord);
    const testType = TestTypeDataModelMock.TestTypeData;
    await component.openTestDetailsPage(firstVehicle, testType);
    expect(navSpy).toHaveBeenCalled();
  });

  it('should not navigate back to test overview if roadworthiness test result is fail', async () => {
    const navSpy = spyOn(navCtrl, 'navigateBack');
    const testType = { ...TestTypeDataModelMock.TestTypeData };

    testType.testTypeId = '62';
    testType.testResult = TEST_TYPE_RESULTS.FAIL;
    await component.checkMissingTestTypeMandatoryFields(testType);
    expect(navSpy).not.toHaveBeenCalled();
  });

  it('should not navigate back to test overview if adr test result is fail', async () => {
    const navSpy = spyOn(navCtrl, 'navigateBack');
    const testType = { ...TestTypeDataModelMock.TestTypeData };

    testType.testTypeId = '50';
    testType.testResult = TEST_TYPE_RESULTS.FAIL;
    await component.checkMissingTestTypeMandatoryFields(testType);
    expect(await navSpy).not.toHaveBeenCalled();
  });

  it('should navigate back to test overview if adr test result is pass and the certificate number or expiryDate do not exist', async () => {
    const navSpy = spyOn(navCtrl, 'navigateBack');
    const testType = { ...TestTypeDataModelMock.TestTypeData };

    testType.testTypeId = '50';
    testType.testResult = TEST_TYPE_RESULTS.PASS;
    testType.certificateNumber = null;
    testType.testExpiryDate = null;
    await component.checkMissingTestTypeMandatoryFields(testType);
    expect(await navSpy).toHaveBeenCalled();
  });

  it('should navigate back test overview if a specialist test has no certificate number', async () => {
    const navSpy = spyOn(navCtrl, 'navigateBack');
    const testType = { ...TestTypeDataModelMock.TestTypeData };

    testType.testTypeId = '125';
    testType.certificateNumber = null;
    await component.checkMissingTestTypeMandatoryFields(testType);
    expect(navSpy).toHaveBeenCalled();
  });

  it('should get the formatted string to be displayed for odometer reading', () => {
    const vehicle = { ...VEHICLE };
    vehicle.odometerReading = null;
    expect(component.getOdometerStringToBeDisplayed(vehicle)).toEqual('');

    vehicle.odometerReading = '123';
    expect(component.getOdometerStringToBeDisplayed(vehicle)).toEqual('123 mi');
  });

  it('should check whether a Specialist test is completed or not', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '146';
    testType.customDefects.push({
      hasAllMandatoryFields: false
    } as SpecialistCustomDefectModel);
    expect(component.isSpecialistTestTypeCompleted(testType)).toBeFalsy();

    testType.testTypeId = '125';
    testType.certificateNumber = '';
    expect(component.isSpecialistTestTypeCompleted(testType)).toBeFalsy();

    testType.certificateNumber = '123';
    testType.customDefects[0].hasAllMandatoryFields = true;
    expect(
      component.isSpecialistTestTypeCompleted(testType)
    ).toBeTruthy();
  });

  describe('onSubmit', () => {

    const testModelParam: TestModel = {
      startTime: '',
      endTime: '',
      status: null,
      reasonForCancellation: '',
      vehicles: [],
    };

    it('should call submitTests() if a valid response is returned with a body of true', async () => {
      activityService.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of({ body: true }));
      component.submitTests = jasmine.createSpy().and.callFake(() => {});

      const TRY_AGAIN_ALERT = await alertCtrl.create({
        header: APP_STRINGS.UNABLE_TO_SUBMIT_TESTS_TITLE,
        message: APP_STRINGS.NO_INTERNET_CONNECTION,
        buttons: [
          {
            text: APP_STRINGS.SETTINGS_BTN,
            handler: () => {
              openNativeSettings.open('settings');
            }
          },
          {
            text: APP_STRINGS.TRY_AGAIN_BTN,
            handler: async () => {
              await component.onSubmit(testModelParam);
            }
          }
        ]
      });

      const LOADING = await component.loadingCtrl.create({
        message: 'Loading...'
      });
      await component.onSubmit(testModelParam);

      expect(component.submitTests).toHaveBeenCalledTimes(1);
      expect(component.submitTests).toHaveBeenCalledWith(testModelParam, LOADING, TRY_AGAIN_ALERT);
    });

    it('should call visitService.createDataClearingAlert if a valid response is returned with a body of false', async () => {
      activityService.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of({ body: false }));
      logProvider.dispatchLog = jasmine.createSpy().and.callFake(() => {});
      component.visitService.createDataClearingAlert = jasmine.createSpy();

      const LOADING = await component.loadingCtrl.create({
        message: 'Loading...'
      });
      await component.onSubmit(testModelParam);

      expect(component.visitService.createDataClearingAlert).toHaveBeenCalledTimes(1);
      expect(component.visitService.createDataClearingAlert).toHaveBeenCalledWith(LOADING);
      expect(logProvider.dispatchLog).toHaveBeenCalledTimes(1);
    });

    it('should not call submitTests or createDataClearingAlert if no response is returned', async () => {
      activityService.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of());
      component.submitTests = jasmine.createSpy().and.callFake(() => {});
      component.visitService.createDataClearingAlert = jasmine.createSpy().and.callFake(() => {});

      await component.onSubmit(testModelParam);

      expect(component.submitTests).toHaveBeenCalledTimes(0);
      expect(component.visitService.createDataClearingAlert).toHaveBeenCalledTimes(0);
    });
  });
});
