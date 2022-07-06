// import { AppServiceMock } from './../../../../../test-config/services-mocks/app-service.mock';
// import { AppService } from './../../../../providers/global/app.service';
// import { TestReviewPage } from './test-review';
// import { ComponentFixture, async, TestBed } from '@angular/core/testing';
// import {
//   IonicModule,
//   NavController,
//   NavParams,
//   ViewController,
//   AlertController,
//   LoadingController,
//   ModalController
// } from 'ionic-angular';
// import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
// import {
//   NavControllerMock,
//   ViewControllerMock,
//   AlertControllerMock,
//   LoadingControllerMock,
//   ModalControllerMock
// } from 'ionic-mocks';
// import { StateReformingService } from '../../../../providers/global/state-reforming.service';
// import { StateReformingServiceMock } from '../../../../../test-config/services-mocks/state-reforming-service.mock';
// import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
// import { VehicleServiceMock } from '../../../../../test-config/services-mocks/vehicle-service.mock';
// import { VisitService } from '../../../../providers/visit/visit.service';
// import { VisitServiceMock } from '../../../../../test-config/services-mocks/visit-service.mock';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { StorageService } from '../../../../providers/natives/storage.service';
// import { StorageServiceMock } from '../../../../../test-config/services-mocks/storage-service.mock';
// import { TestResultService } from '../../../../providers/test-result/test-result.service';
// import { OpenNativeSettings } from '@ionic-native/open-native-settings';
// import { TestService } from '../../../../providers/test/test.service';
// import { TestServiceMock } from '../../../../../test-config/services-mocks/test-service.mock';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { DefectsService } from '../../../../providers/defects/defects.service';
// import { VisitDataMock } from '../../../../assets/data-mocks/visit-data.mock';
// import { AuthenticationService } from '../../../../providers/auth/authentication/authentication.service';
// import { AuthenticationServiceMock } from '../../../../../test-config/services-mocks/authentication-service.mock';
// import { TestResultServiceMock } from '../../../../../test-config/services-mocks/test-result-service.mock';
// import { ActivityService } from '../../../../providers/activity/activity.service';
// import { ActivityServiceMock } from '../../../../../test-config/services-mocks/activity-service.mock';
// import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
// import { VehicleDataMock } from '../../../../assets/data-mocks/vehicle-data.mock';
// import { APP_STRINGS, TEST_TYPE_RESULTS, VEHICLE_TYPE } from '../../../../app/app.enums';
// import { VehicleTechRecordModel } from '../../../../models/vehicle/tech-record.model';
// import { TechRecordDataMock } from '../../../../assets/data-mocks/tech-record-data.mock';
// import { By } from '../../../../../node_modules/@angular/platform-browser';
// import { TestTypeDataModelMock } from '../../../../assets/data-mocks/data-model/test-type-data-model.mock';
// import { TestTypeService } from '../../../../providers/test-type/test-type.service';
// import { TestTypeServiceMock } from '../../../../../test-config/services-mocks/test-type-service.mock';
// import { SpecialistCustomDefectModel } from '../../../../models/defects/defect-details.model';
// import { LogsProvider } from '../../../../modules/logs/logs.service';
// import { AnalyticsService } from '../../../../providers/global';
// import { TestModel } from '../../../../models/tests/test.model';
// import { of } from 'rxjs/observable/of';
//
// describe('Component: TestReviewPage', () => {
//   let component: TestReviewPage;
//   let fixture: ComponentFixture<TestReviewPage>;
//   let visitService: VisitServiceMock;
//   let alertCtrl: AlertController;
//   let activityServiceMock: ActivityServiceMock;
//   let commonFuncService: CommonFunctionsService;
//   let testService: TestService;
//   let vehicleService: VehicleService;
//   let modalCtrl: ModalController;
//   let navCtrl: NavController;
//   let loadingCtrl: LoadingController;
//   let openNativeSettings: OpenNativeSettings;
//   let logProvider: LogsProvider;
//   let logProviderSpy: any;
//   let analyticsService: AnalyticsService;
//   let analyticsServiceSpy: any;
//
//   let vehicle: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
//   const VEHICLE: VehicleModel = VehicleDataMock.VehicleData;
//
//   beforeEach(async() => {
//     logProviderSpy = jasmine.createSpyObj('LogsProvider', {
//       dispatchLog: () => true
//     });
//
//     analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
//       'logEvent',
//       'setCurrentPage'
//     ]);
//
//     await TestBed.configureTestingModule({
//       declarations: [TestReviewPage],
//       imports: [IonicModule.forRoot(TestReviewPage)],
//       providers: [
//         CommonFunctionsService,
//         OpenNativeSettings,
//         DefectsService,
//         { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
//         { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
//         { provide: ActivityService, useClass: ActivityServiceMock },
//         { provide: TestResultService, useClass: TestResultServiceMock },
//         { provide: TestService, useClass: TestServiceMock },
//         { provide: TestTypeService, useClass: TestTypeServiceMock },
//         { provide: StorageService, useClass: StorageServiceMock },
//         { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
//         { provide: NavController, useFactory: () => NavControllerMock.instance() },
//         { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
//         { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
//         { provide: StateReformingService, useClass: StateReformingServiceMock },
//         { provide: VehicleService, useClass: VehicleServiceMock },
//         { provide: VisitService, useClass: VisitServiceMock },
//         { provide: AuthenticationService, useClass: AuthenticationServiceMock },
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: AnalyticsService, useValue: analyticsServiceSpy },
//         { provide: AppService, useClass: AppServiceMock },
//         { provide: LogsProvider, useValue: logProviderSpy }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(TestReviewPage);
//     component = fixture.componentInstance;
//     visitService = TestBed.get(VisitService);
//     alertCtrl = TestBed.get(AlertController);
//     activityServiceMock = TestBed.get(ActivityService);
//     commonFuncService = TestBed.get(CommonFunctionsService);
//     testService = TestBed.get(TestService);
//     vehicleService = TestBed.get(VehicleService);
//     modalCtrl = TestBed.get(ModalController);
//     navCtrl = TestBed.get(NavController);
//     logProvider = TestBed.get(LogsProvider);
//     analyticsService = TestBed.get(AnalyticsService);
//     loadingCtrl = TestBed.get(LoadingController);
//     openNativeSettings = TestBed.get(OpenNativeSettings);
//
//     spyOn(window.localStorage, 'getItem').and.callFake(function() {
//       return JSON.stringify({ test: 'test' });
//     });
//   });
//
//   afterEach(() => {
//     fixture.destroy();
//     component = null;
//     alertCtrl = null;
//     visitService = null;
//     activityServiceMock = null;
//     commonFuncService = null;
//     testService = null;
//     vehicleService = null;
//   });
//
//   it('should create the component', () => {
//     expect(fixture).toBeTruthy();
//     expect(component).toBeTruthy();
//     expect(component.roadworthinessTestTypesIds.length).toEqual(5);
//   });
//
//   it('should check the ngOnInit logic', () => {
//     component.ngOnInit();
//     expect(window.localStorage.getItem).toHaveBeenCalled();
//   });
//
//   it('should test submitting a test', () => {
//     visitService.visit = VisitDataMock.VisitData;
//     component.onSubmit(VisitDataMock.VisitTestData);
//     expect(alertCtrl.create).toHaveBeenCalled();
//   });
//
//   it('should test submitting a test - error case on submitActivity', () => {
//     visitService.visit = VisitDataMock.VisitData;
//     activityServiceMock.isSubmitError = true;
//     component.onSubmit(VisitDataMock.VisitTestData);
//
//     expect(logProvider.dispatchLog).toHaveBeenCalled();
//   });
//
//   it('should test getCountryStringToBeDisplayed', () => {
//     spyOn(commonFuncService, 'getCountryStringToBeDisplayed');
//     component.getCountryStringToBeDisplayed(VEHICLE);
//     expect(commonFuncService.getCountryStringToBeDisplayed).toHaveBeenCalled();
//   });
//
//   it('should verify that the vehicle type is one of the specified types', () => {
//     let vehicle = Object.create(VehicleDataMock.VehicleData);
//     expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.PSV)).toBeTruthy();
//     expect(
//       component.isVehicleOfType(vehicle, VEHICLE_TYPE.PSV, VEHICLE_TYPE.TRL, VEHICLE_TYPE.HGV)
//     ).toBeTruthy();
//   });
//
//   it('should verify that the vehicle type is not one of specified types', () => {
//     let vehicle = Object.create(VehicleDataMock.VehicleData);
//     expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.TRL)).toBeFalsy();
//     expect(component.isVehicleOfType(vehicle, VEHICLE_TYPE.TRL, VEHICLE_TYPE.HGV)).toBeFalsy();
//   });
//
//   it('display the submit button if the currently reviewed vehicle is the last one', async()  => {
//     let newTest = testService.createTest();
//     let firstVehicle = vehicleService.createVehicle(vehicle);
//     let secondVehicle = vehicleService.createVehicle(vehicle);
//     newTest.vehicles.push(firstVehicle);
//     newTest.vehicles.push(secondVehicle);
//     firstVehicle.testTypes = [];
//     firstVehicle.countryOfRegistration = 'United Kingdom';
//     firstVehicle.euVehicleCategory = 'm1';
//     firstVehicle.odometerReading = '122';
//
//     secondVehicle.testTypes = [];
//     secondVehicle.countryOfRegistration = 'United Kingdom';
//     secondVehicle.euVehicleCategory = 'm2';
//     secondVehicle.odometerReading = '123';
//
//     component.latestTest = newTest;
//     component.vehicleBeingReviewed = component.latestTest.vehicles.length - 1;
//     spyOn(component, 'goToNextPage');
//
//     fixture.detectChanges();
//     await fixture.whenStable();
//     let submitButton = fixture.debugElement.query(By.css('.footer-cta-section>button'));
//     expect(component.nextButtonText).toBe('Submit tests');
//     submitButton.triggerEventHandler('click', null);
//     fixture.detectChanges();
//     await fixture.whenStable();
//     expect(component.goToNextPage).toHaveBeenCalled();
//   });
//
//   it('should update completeFields with the values on the current testType', () => {
//     let testType = TestTypeDataModelMock.TestTypeData;
//     component.completeFields(testType);
//     expect(Object.keys(component.completedFields).length).toBe(0);
//
//     testType.seatbeltInstallationCheckDate = true;
//     testType.lastSeatbeltInstallationCheckDate = new Date().toISOString();
//     testType.numberOfSeatbeltsFitted = 3;
//     component.completeFields(testType);
//     expect(Object.keys(component.completedFields).length).toBe(3);
//   });
//
//   it('should open the testDetailsModal', () => {
//     let firstVehicle = vehicleService.createVehicle(vehicle);
//     let testType = TestTypeDataModelMock.TestTypeData;
//     component.openTestDetailsPage(firstVehicle, testType);
//     expect(modalCtrl.create).toHaveBeenCalled();
//   });
//
//   it('should not pop to test overview if roadworthiness test result is fail', () => {
//     let initialTestType = { ...TestTypeDataModelMock.TestTypeData };
//     let changedTestType = { ...TestTypeDataModelMock.TestTypeData };
//
//     initialTestType.testTypeId = '62';
//     changedTestType.testResult = TEST_TYPE_RESULTS.FAIL;
//     component.checkMissingTestTypeMandatoryFields(changedTestType, initialTestType);
//     expect(navCtrl.popTo).not.toHaveBeenCalled();
//   });
//
//   it('should not pop to test overview if adr test result is fail', () => {
//     let initialTestType = { ...TestTypeDataModelMock.TestTypeData };
//     let changedTestType = { ...TestTypeDataModelMock.TestTypeData };
//
//     initialTestType.testTypeId = '50';
//     changedTestType.testResult = TEST_TYPE_RESULTS.FAIL;
//     component.checkMissingTestTypeMandatoryFields(changedTestType, initialTestType);
//     expect(navCtrl.popTo).not.toHaveBeenCalled();
//   });
//
//   it('should pop to test overview if adr test result is pass and the certificate number or expiryDate do not exist', () => {
//     let initialTestType = { ...TestTypeDataModelMock.TestTypeData };
//     let changedTestType = { ...TestTypeDataModelMock.TestTypeData };
//
//     initialTestType.testTypeId = '50';
//     changedTestType.testResult = TEST_TYPE_RESULTS.PASS;
//     changedTestType.certificateNumber = null;
//     changedTestType.testExpiryDate = null;
//     component.checkMissingTestTypeMandatoryFields(changedTestType, initialTestType);
//     expect(navCtrl.popTo).toHaveBeenCalled();
//   });
//
//   it('should pop to test overview if a test type initially had certificate number and after changing the details not', () => {
//     let initialTestType = { ...TestTypeDataModelMock.TestTypeData };
//     let changedTestType = { ...TestTypeDataModelMock.TestTypeData };
//
//     initialTestType.certificateNumber = '44334554';
//     changedTestType.certificateNumber = null;
//     component.checkMissingTestTypeMandatoryFields(changedTestType, initialTestType);
//     expect(navCtrl.popTo).toHaveBeenCalled();
//   });
//
//   it('should get the formatted string to be displayed for odometer reading', () => {
//     let vehicle = { ...VEHICLE };
//     vehicle.odometerReading = null;
//     expect(component.getOdometerStringToBeDisplayed(vehicle)).toEqual('');
//
//     vehicle.odometerReading = '123';
//     expect(component.getOdometerStringToBeDisplayed(vehicle)).toEqual('123 mi');
//   });
//
//   it('should check whether a Specialist test is completed or not', () => {
//     let initialTestType = { ...TestTypeDataModelMock.TestTypeData };
//     let changedTestType = { ...TestTypeDataModelMock.TestTypeData };
//     initialTestType.testTypeId = '146';
//     changedTestType.customDefects.push({
//       hasAllMandatoryFields: false
//     } as SpecialistCustomDefectModel);
//     expect(component.isSpecialistTestTypeCompleted(changedTestType, initialTestType)).toBeFalsy();
//
//     initialTestType.testTypeId = '125';
//     changedTestType.certificateNumber = '';
//     expect(component.isSpecialistTestTypeCompleted(changedTestType, initialTestType)).toBeFalsy();
//
//     changedTestType.certificateNumber = '123';
//     changedTestType.customDefects[0].hasAllMandatoryFields = true;
//     expect(
//       component.isSpecialistTestTypeCompleted(changedTestType, initialTestType)
//     ).toBeTruthy();
//   });
//
//   describe('onSubmit', () => {
//
//     const testModelParam: TestModel = {
//       startTime: '',
//       endTime: '',
//       status: null,
//       reasonForCancellation: '',
//       vehicles: [],
//     };
//
//     it('should call submitTests() if a valid response is returned with a body of true', () => {
//       activityServiceMock.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of({ body: true }));
//       component.submitTests = jasmine.createSpy().and.callFake(() => {});
//
//       const TRY_AGAIN_ALERT = alertCtrl.create({
//         title: APP_STRINGS.UNABLE_TO_SUBMIT_TESTS_TITLE,
//         message: APP_STRINGS.NO_INTERNET_CONNECTION,
//         buttons: [
//           {
//             text: APP_STRINGS.SETTINGS_BTN,
//             handler: () => {
//               openNativeSettings.open('settings');
//             }
//           },
//           {
//             text: APP_STRINGS.TRY_AGAIN_BTN,
//             handler: () => {
//               component.onSubmit(testModelParam);
//             }
//           }
//         ]
//       });
//
//       const LOADING = loadingCtrl.create({
//         content: 'Loading...'
//       });
//
//       component.onSubmit(testModelParam);
//
//       expect(component.submitTests).toHaveBeenCalledTimes(1);
//       expect(component.submitTests).toHaveBeenCalledWith(testModelParam, LOADING, TRY_AGAIN_ALERT);
//     });
//
//     it('should call visitService.createDataClearingAlert if a valid response is returned with a body of false', () => {
//       const presentSpy = jasmine.createSpy();
//
//       const LOADING = loadingCtrl.create({
//         content: 'Loading...'
//       });
//
//       activityServiceMock.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of({ body: false }));
//       logProvider.dispatchLog = jasmine.createSpy().and.callFake(() => {});
//       component.visitService.createDataClearingAlert = jasmine.createSpy().and.returnValue({
//         present: presentSpy,
//       });
//
//       component.onSubmit(testModelParam);
//
//       expect(component.visitService.createDataClearingAlert).toHaveBeenCalledTimes(1);
//       expect(component.visitService.createDataClearingAlert).toHaveBeenCalledWith(LOADING);
//       expect(presentSpy).toHaveBeenCalledTimes(1);
//       expect(logProvider.dispatchLog).toHaveBeenCalledTimes(1);
//     });
//
//     it('should not call submitTests or createDataClearingAlert if no response is returned', () => {
//       activityServiceMock.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of());
//       component.submitTests = jasmine.createSpy().and.callFake(() => {});
//       component.visitService.createDataClearingAlert = jasmine.createSpy().and.callFake(() => {});
//
//       component.onSubmit(testModelParam);
//
//       expect(component.submitTests).toHaveBeenCalledTimes(0);
//       expect(component.visitService.createDataClearingAlert).toHaveBeenCalledTimes(0);
//     });
//   });
// });
