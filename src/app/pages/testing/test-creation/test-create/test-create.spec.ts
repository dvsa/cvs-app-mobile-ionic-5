// import { TestCreatePage } from './test-create';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {
//   IonicModule,
//   NavController,
//   NavParams,
//   AlertController,
//   ModalController,
//   Events
// } from 'ionic-angular';
// import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
// import { TestTypeModel } from '../../../../models/tests/test-type.model';
// import { TestTypeDataModelMock } from '../../../../assets/data-mocks/data-model/test-type-data-model.mock';
// import { TechRecordDataMock } from '../../../../assets/data-mocks/tech-record-data.mock';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import {
//   ODOMETER_METRIC,
//   VEHICLE_TYPE,
//   TEST_TYPE_RESULTS,
//   MOD_TYPES,
//   DEFICIENCY_CATEGORY,
//   ANALYTICS_SCREEN_NAMES,
//   ANALYTICS_EVENT_CATEGORIES,
//   ANALYTICS_EVENTS,
//   ANALYTICS_VALUE,
//   TEST_REPORT_STATUSES
// } from '../../../../app/app.enums';
// import { TestService } from '../../../../providers/test/test.service';
// import { TestServiceMock } from '../../../../../test-config/services-mocks/test-service.mock';
// import { VehicleServiceMock } from '../../../../../test-config/services-mocks/vehicle-service.mock';
// import { VisitService } from '../../../../providers/visit/visit.service';
// import { VisitServiceMock } from '../../../../../test-config/services-mocks/visit-service.mock';
// import { StateReformingService } from '../../../../providers/global/state-reforming.service';
// import { StateReformingServiceMock } from '../../../../../test-config/services-mocks/state-reforming-service.mock';
// import { VisitDataMock } from '../../../../assets/data-mocks/visit-data.mock';
// import { VehicleTechRecordModel } from '../../../../models/vehicle/tech-record.model';
// import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
// import { CallNumber } from '@ionic-native/call-number';
// import { AppService } from '../../../../providers/global/app.service';
// import { AppServiceMock } from '../../../../../test-config/services-mocks/app-service.mock';
// import {
//   AlertControllerMock,
//   EventsMock,
//   ModalControllerMock,
//   NavControllerMock
// } from 'ionic-mocks';
// import { VehicleDataMock } from '../../../../assets/data-mocks/vehicle-data.mock';
// import { TestDataModelMock } from '../../../../assets/data-mocks/data-model/test-data-model.mock';
// import { TestTypeService } from '../../../../providers/test-type/test-type.service';
// import { DefectDetailsDataMock } from '../../../../assets/data-mocks/defect-details-data.mock';
// import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
// import { EuVehicleCategoryData } from '../../../../assets/app-data/eu-vehicle-category/eu-vehicle-category';
// import { SpecialistCustomDefectModel } from '../../../../models/defects/defect-details.model';
// import { AnalyticsService, AppAlertService } from '../../../../providers/global';
// import { StorageService } from '../../../../providers/natives/storage.service';
// import { TestTypesReferenceDataMock } from '../../../../assets/data-mocks/reference-data-mocks/test-types.mock';
// import { StorageServiceMock } from '../../../../../test-config/services-mocks/storage-service.mock';
//
// describe('Component: TestCreatePage', () => {
//   let component: TestCreatePage;
//   let fixture: ComponentFixture<TestCreatePage>;
//   let navCtrl: NavController;
//   let navParams: NavParams;
//   let vehicleService: VehicleService;
//   let visitService: VisitService;
//   let appService: AppService;
//   let testService: TestService;
//   let stateReformingService: StateReformingService;
//   let callNumberSpy: any;
//   let modalctrl: ModalController;
//   let commonFuncService: CommonFunctionsService;
//   let analyticsService: AnalyticsService;
//   let analyticsServiceSpy: any;
//   let storageService: StorageService;
//   let testTypeService: TestTypeService;
//   let alertService: AppAlertService;
//
//   const ADDED_VEHICLE_TEST: TestTypeModel = TestTypeDataModelMock.TestTypeData;
//   let vehicle: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
//   const TEST_DATA = TestDataModelMock.TestData;
//   const TEST_TYPES = TestTypesReferenceDataMock.TestTypesData;
//   const VEHICLE = VehicleDataMock.VehicleData;
//   const DEFECTS = DefectDetailsDataMock.DefectDetails;
//
//   beforeEach(async(() => {
//     callNumberSpy = jasmine.createSpyObj('CallNumber', ['callPhoneNumber']);
//
//     analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
//       'logEvent',
//       'setCurrentPage'
//     ]);
//
//     TestBed.configureTestingModule({
//       declarations: [TestCreatePage],
//       imports: [IonicModule.forRoot(TestCreatePage)],
//       providers: [
//         CommonFunctionsService,
//         { provide: Events, useFactory: () => EventsMock.instance() },
//         { provide: NavController, useFactory: () => NavControllerMock.instance() },
//         { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
//         { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
//         { provide: AppService, useClass: AppServiceMock },
//         { provide: CallNumber, useValue: callNumberSpy },
//         { provide: StateReformingService, useClass: StateReformingServiceMock },
//         { provide: VehicleService, useClass: VehicleServiceMock },
//         { provide: VisitService, useClass: VisitServiceMock },
//         { provide: TestService, useClass: TestServiceMock },
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: TestTypeService, useClass: TestTypeService },
//         { provide: AnalyticsService, useValue: analyticsServiceSpy },
//         { provide: StorageService, useClass: StorageServiceMock },
//         { provide: AppAlertService, useClass: AppAlertService }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(TestCreatePage);
//     component = fixture.componentInstance;
//     navCtrl = TestBed.get(NavController);
//     navParams = TestBed.get(NavParams);
//     vehicleService = TestBed.get(VehicleService);
//     testService = TestBed.get(TestService);
//     appService = TestBed.get(AppService);
//     visitService = TestBed.get(VisitService);
//     stateReformingService = TestBed.get(StateReformingService);
//     modalctrl = TestBed.get(ModalController);
//     commonFuncService = TestBed.get(CommonFunctionsService);
//     analyticsService = TestBed.get(AnalyticsService);
//     storageService = TestBed.get(StorageService);
//     testTypeService = TestBed.get(TestTypeService);
//     alertService = TestBed.get(AppAlertService);
//   }));
//
//   beforeEach(() => {
//     const navParams = fixture.debugElement.injector.get(NavParams);
//
//     navParams.get = jasmine.createSpy('get').and.callFake((param) => {
//       const params = {
//         test: VisitDataMock.VisitTestData
//       };
//       return params[param];
//     });
//   });
//
//   afterEach(() => {
//     fixture.destroy();
//     component = null;
//     testService = null;
//     vehicleService = null;
//     visitService = null;
//     stateReformingService = null;
//     modalctrl = null;
//     navCtrl = null;
//     commonFuncService = null;
//     storageService = null;
//     alertService = null;
//   });
//
//   it('should create the component', () => {
//     expect(fixture).toBeTruthy();
//     expect(component).toBeTruthy();
//   });
//
//   it('should test ionViewWillEnter lifecycle hook', () => {
//     spyOn(component, 'computeErrorIncomplete');
//     component.testData = TEST_DATA;
//     component.testData.vehicles.push(VEHICLE);
//     component.ionViewWillEnter();
//     expect(component.computeErrorIncomplete).toHaveBeenCalled();
//     expect(component.displayAddVehicleButton).toBeFalsy();
//     component.testData.vehicles[0].techRecord.vehicleType = VEHICLE_TYPE.HGV;
//     component.ionViewWillEnter();
//     expect(component.displayAddVehicleButton).toBeTruthy();
//   });
//
//   it('should test ionViewDidEnterLogic', () => {
//     component.ionViewDidEnter();
//     expect(analyticsService.setCurrentPage).toHaveBeenCalledWith(
//       ANALYTICS_SCREEN_NAMES.TEST_OVERVIEW
//     );
//   });
//
//   it('should say either a test is abandoned or not', () => {
//     expect(component.isTestAbandoned(ADDED_VEHICLE_TEST)).toBeFalsy();
//     ADDED_VEHICLE_TEST.reasons.push('Best reason');
//     ADDED_VEHICLE_TEST.additionalCommentsForAbandon = 'Additional comment';
//     expect(component.isTestAbandoned(ADDED_VEHICLE_TEST)).toBeTruthy();
//   });
//
//   it('should say either a test has odometer data or not', () => {
//     let newTest = testService.createTest();
//     let newVehicle = vehicleService.createVehicle(vehicle);
//     newTest.vehicles.push(newVehicle);
//     component.testData = newTest;
//
//     expect(component.doesOdometerDataExist(0)).toBeFalsy();
//     newTest.vehicles[0].odometerReading = '1234';
//     newTest.vehicles[0].odometerMetric = ODOMETER_METRIC.MILES;
//     expect(component.doesOdometerDataExist(0)).toBeTruthy();
//   });
//
//   it('should return correctly formatted string of odometer data', () => {
//     let newTest = testService.createTest();
//     let newVehicle = vehicleService.createVehicle(vehicle);
//     newTest.vehicles.push(newVehicle);
//     component.testData = newTest;
//
//     newTest.vehicles[0].odometerReading = '1234';
//     newTest.vehicles[0].odometerMetric = ODOMETER_METRIC.MILES;
//
//     expect(component.getOdometerStringToBeDisplayed(0)).toEqual('1,234 mi');
//   });
//
//   it('should return the test type status to be displayed', () => {
//     expect(component.getTestTypeStatus(VEHICLE, ADDED_VEHICLE_TEST)).toEqual('In progress');
//     ADDED_VEHICLE_TEST.numberOfSeatbeltsFitted = 2;
//     ADDED_VEHICLE_TEST.seatbeltInstallationCheckDate = true;
//     ADDED_VEHICLE_TEST.lastSeatbeltInstallationCheckDate = '19-01-2019';
//     expect(component.getTestTypeStatus(VEHICLE, ADDED_VEHICLE_TEST)).toEqual('Edit');
//     ADDED_VEHICLE_TEST.testTypeId = '40';
//     ADDED_VEHICLE_TEST.testResult = null;
//     expect(component.getTestTypeStatus(VEHICLE, ADDED_VEHICLE_TEST)).toEqual('Edit');
//   });
//
//   it('should have "Edit" status if a ADR test has the certificateNumber exactly 6 digits long', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '50';
//     testType.testExpiryDate = new Date().toISOString();
//     testType.certificateNumber = '12345';
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('In progress');
//     testType.certificateNumber = '123456';
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('Edit');
//   });
//
//   it('should set the testResult to FAIL when a PASS test with sections has major defects', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testResult = TEST_TYPE_RESULTS.PASS;
//     testType.defects.push(DefectDetailsDataMock.DefectData);
//
//     component.getTestTypeStatus(vehicle, testType);
//
//     expect(testType.testResult).toBe(TEST_TYPE_RESULTS.FAIL);
//   });
//
//   it('should set the testResult to PRS when a PASS test with sections has repaired major defects', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testResult = TEST_TYPE_RESULTS.PASS;
//     let defect = DefectDetailsDataMock.DefectData;
//     defect.prs = true;
//     testType.defects.push(defect);
//
//     component.getTestTypeStatus(vehicle, testType);
//
//     expect(testType.testResult).toBe(TEST_TYPE_RESULTS.PRS);
//   });
//
//   it('should not change the testResult when a PASS test with sections has minor defects', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testResult = TEST_TYPE_RESULTS.PASS;
//     let defect = DefectDetailsDataMock.DefectData;
//     defect.deficiencyCategory = DEFICIENCY_CATEGORY.MINOR;
//     testType.defects.push(defect);
//
//     component.getTestTypeStatus(vehicle, testType);
//
//     expect(testType.testResult).toBe(TEST_TYPE_RESULTS.PASS);
//   });
//
//   it('should set the testResult to FAIL when a test with sections has major defects but does not have a testResult', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testResult = undefined;
//     testType.defects.push(DefectDetailsDataMock.DefectData);
//
//     component.getTestTypeStatus(vehicle, testType);
//
//     expect(testType.testResult).toBe(TEST_TYPE_RESULTS.FAIL);
//   });
//
//   it('should set the testResult to FAIL when a PASS test without sections has major defects', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '94';
//     testType.testResult = TEST_TYPE_RESULTS.PASS;
//     testType.defects.push(DefectDetailsDataMock.DefectData);
//
//     component.getTestTypeStatus(vehicle, testType);
//
//     expect(testType.testResult).toBe(TEST_TYPE_RESULTS.FAIL);
//   });
//
//   it('should set the testResult to PRS when a PASS test without sections has repaired major defects', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '94';
//     testType.testResult = TEST_TYPE_RESULTS.PASS;
//     let defect = DefectDetailsDataMock.DefectData;
//     defect.prs = true;
//     testType.defects.push(defect);
//
//     component.getTestTypeStatus(vehicle, testType);
//
//     expect(testType.testResult).toBe(TEST_TYPE_RESULTS.PRS);
//   });
//
//   it('should not change the testResult when a PASS test without sections has minor defects', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '94';
//     testType.testResult = TEST_TYPE_RESULTS.PASS;
//     let defect = DefectDetailsDataMock.DefectData;
//     defect.deficiencyCategory = DEFICIENCY_CATEGORY.MINOR;
//     testType.defects.push(defect);
//
//     component.getTestTypeStatus(vehicle, testType);
//
//     expect(testType.testResult).toBe(TEST_TYPE_RESULTS.PASS);
//   });
//
//   it('should set the testResult to FAIL when a test without sections has major defects but does not have a testResult', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '94';
//     testType.testResult = undefined;
//     testType.defects.push(DefectDetailsDataMock.DefectData);
//
//     component.getTestTypeStatus(vehicle, testType);
//
//     expect(testType.testResult).toBe(TEST_TYPE_RESULTS.FAIL);
//   });
//
//   it('should have "Edit" status if a TIR test has the certificateNumber exactly 5 digits long', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '49';
//     testType.certificateNumber = '1234';
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('In progress');
//     testType.certificateNumber = '12345';
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('Edit');
//   });
//
//   it('should have "Edit" status if a Specialist test has a certificateNumber captured', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '125';
//     testType.certificateNumber = null;
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('In progress');
//     testType.certificateNumber = '12345';
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('Edit');
//   });
//
//   it('should have "Edit" status if a PSV Notifiable Alteration test has a testResult captured', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '38';
//     testType.testResult = null;
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('In progress');
//     testType.testResult = 'pass';
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('Edit');
//   });
//
//   it('should have "in progress" status if a Specialist test has the custom defects incompletely captured', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '125';
//     testType.certificateNumber = '12345';
//     testType.customDefects.push({} as SpecialistCustomDefectModel);
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('In progress');
//     testType.customDefects[0].referenceNumber = '12345';
//     testType.customDefects[0].defectName = 'customDefect';
//     testType.customDefects[0].hasAllMandatoryFields = true;
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('Edit');
//   });
//
//   it('should have "In progress" status if a Specialist test (IVA/Retest) has certificate field incomplete', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '130';
//     testType.certificateNumber = '';
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('In progress');
//   });
//
//   it('should have "Edit" status if a Specialist test (IVA/Retest) has all fields completed', () => {
//     let testType: TestTypeModel = { ...TestTypeDataModelMock.TestTypeData };
//     let vehicle: VehicleModel = { ...VEHICLE };
//     testType.testTypeId = '130';
//     testType.certificateNumber = '7374348';
//     expect(component.getTestTypeStatus(vehicle, testType)).toEqual('Edit');
//   });
//
//   it('should not allow to review a test because not all mandatory fields completed', () => {
//     let newTest = testService.createTest();
//     let newVehicle = vehicleService.createVehicle(vehicle);
//     vehicleService.addTestType(newVehicle, ADDED_VEHICLE_TEST);
//     newTest.vehicles.push(newVehicle);
//     component.testData = newTest;
//
//     component.reviewTest();
//   });
//
//   it('should not allow to review a test because no testType added', () => {
//     let newTest = testService.createTest();
//     let newVehicle = vehicleService.createVehicle(vehicle);
//     newTest.vehicles.push(newVehicle);
//     newVehicle.testTypes = [];
//     newVehicle.countryOfRegistration = 'United Kingdom';
//     newVehicle.euVehicleCategory = 'm1';
//     newVehicle.odometerReading = '122';
//     component.testData = newTest;
//
//     component.reviewTest();
//   });
//
//   it('should not allow to review a combination test if at least one vehicle has an incomplete test', () => {
//     let newTest = testService.createTest();
//     let completeTest = TestTypeDataModelMock.TestTypeData;
//     completeTest.testTypeId = '90';
//     let incompleteTest = TestTypeDataModelMock.TestTypeData;
//     incompleteTest.testTypeId = '90';
//     incompleteTest.testResult = null;
//
//     let hgv = vehicleService.createVehicle(vehicle);
//     vehicleService.addTestType(hgv, incompleteTest);
//     hgv.techRecord.vehicleType = VEHICLE_TYPE.HGV;
//     hgv.countryOfRegistration = 'United Kingdom';
//     hgv.euVehicleCategory = 'n1';
//     hgv.odometerReading = '122';
//     newTest.vehicles.push(hgv);
//
//     let trailer = vehicleService.createVehicle(vehicle);
//     vehicleService.addTestType(trailer, completeTest);
//     trailer.techRecord.vehicleType = VEHICLE_TYPE.TRL;
//     trailer.countryOfRegistration = 'United Kingdom';
//     trailer.euVehicleCategory = 'o2';
//     newTest.vehicles.push(trailer);
//
//     component.testData = newTest;
//     component.reviewTest();
//     expect(component.errorIncomplete).toBe(true);
//     expect(navCtrl.pop).not.toHaveBeenCalled();
//     expect(navCtrl.push).not.toHaveBeenCalled();
//   });
//
//   it('should track log event when removing a test type', async () => {
//     component.completedFields = {};
//     await component.removeVehicleTest(vehicleService.createVehicle(vehicle), ADDED_VEHICLE_TEST);
//
//     expect(analyticsService.logEvent).toHaveBeenCalledWith({
//       category: ANALYTICS_EVENT_CATEGORIES.TEST_TYPES,
//       event: ANALYTICS_EVENTS.REMOVE_TEST_TYPE,
//       label: ADDED_VEHICLE_TEST.testTypeName
//     });
//   });
//
//   it('should test onOdometer logic', () => {
//     let newTest = testService.createTest();
//     let newVehicle = vehicleService.createVehicle(vehicle);
//     newTest.vehicles.push(newVehicle);
//     component.testData = newTest;
//
//     component.onOdometer(0);
//
//     expect(modalctrl.create).toHaveBeenCalled();
//   });
//
//   it('should test onVehicleCategory logic', () => {
//     component.onCountryOfRegistration(VEHICLE);
//     expect(modalctrl.create).toHaveBeenCalled();
//   });
//
//   it('should test onCountryOfRegistration logic', () => {
//     component.onVehicleCategory(VEHICLE);
//     expect(modalctrl.create).toHaveBeenCalled();
//   });
//
//   it('should test computeErrorIncomplete logic', () => {
//     component.errorIncomplete = true;
//     component.testData = TEST_DATA;
//     component.testData.vehicles.push(VEHICLE);
//     component.testData.vehicles[0].odometerReading = '12';
//     component.testData.vehicles[0].euVehicleCategory = 'm1';
//     component.testData.vehicles[0].testTypes.push(ADDED_VEHICLE_TEST);
//     component.computeErrorIncomplete();
//     expect(component.errorIncomplete).toBeFalsy();
//   });
//
//   it('should track log event for missing fields', async () => {
//     let vehicle = VehicleDataMock.VehicleData;
//     vehicle.countryOfRegistration = '';
//     await component.logMissingFields(vehicle);
//     expectedCheck(ANALYTICS_VALUE.COUNTRY_OF_REGISTRATION);
//
//     vehicle.countryOfRegistration = 'gb';
//     vehicle.euVehicleCategory = '';
//     await component.logMissingFields(vehicle);
//     expectedCheck(ANALYTICS_VALUE.EU_VEHICLE_CATEGORY);
//
//     vehicle.countryOfRegistration = 'gb';
//     vehicle.euVehicleCategory = 'something';
//     vehicle.odometerReading = '';
//     await component.logMissingFields(vehicle);
//     expectedCheck(ANALYTICS_VALUE.ODOMETER_READING);
//   });
//
//   function expectedCheck(value: string) {
//     expect(analyticsService.logEvent).toHaveBeenCalledWith({
//       category: ANALYTICS_EVENT_CATEGORIES.REVIEWS,
//       event: ANALYTICS_EVENTS.TEST_REVIEW_UNSUCCESSFUL,
//       label: value
//     });
//   }
//
//   it('should test getCountryStringToBeDisplayed', () => {
//     spyOn(commonFuncService, 'getCountryStringToBeDisplayed');
//     component.getCountryStringToBeDisplayed(VEHICLE);
//     expect(commonFuncService.getCountryStringToBeDisplayed).toHaveBeenCalled();
//   });
//
//   it('should check if navCtrl.push was called', () => {
//     let tests = [];
//     tests.push(testService.createTest());
//     component.addTrailer(tests);
//     expect(navCtrl.push).toHaveBeenCalled();
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
//   it('should check if a lec test-type is in progress or not', () => {
//     let testType = { ...ADDED_VEHICLE_TEST };
//     testType.testResult = TEST_TYPE_RESULTS.FAIL;
//     testType.additionalNotesRecorded = 'notes';
//     expect(component.isLecTestTypeInProgress(testType)).toBeFalsy();
//
//     testType = { ...ADDED_VEHICLE_TEST };
//     testType.testResult = TEST_TYPE_RESULTS.PASS;
//     testType.testExpiryDate = '2019-10-31';
//     testType.emissionStandard = 'emission';
//     testType.smokeTestKLimitApplied = 'smoke';
//     testType.fuelType = 'petrol';
//     testType.modType = MOD_TYPES.P;
//     testType.particulateTrapFitted = 'trap';
//     testType.particulateTrapSerialNumber = 'number';
//     expect(component.isLecTestTypeInProgress(testType)).toBeFalsy();
//
//     testType.modType = MOD_TYPES.G;
//     testType.particulateTrapFitted = null;
//     testType.particulateTrapSerialNumber = null;
//     testType.modificationTypeUsed = 'mod';
//     expect(component.isLecTestTypeInProgress(testType)).toBeFalsy();
//
//     testType.modType = null;
//     expect(component.isLecTestTypeInProgress(testType)).toBeTruthy();
//   });
//
//   it('should check if a vehicle has only abandoned test types', () => {
//     let testType = { ...ADDED_VEHICLE_TEST };
//     let testType2 = { ...ADDED_VEHICLE_TEST };
//     let vehicle = { ...VEHICLE };
//
//     testType.testResult = TEST_TYPE_RESULTS.ABANDONED;
//     vehicle.testTypes.push(testType);
//     expect(component.doesVehicleHaveOnlyAbandonedTestTypes(vehicle)).toBeTruthy();
//
//     testType2.testResult = TEST_TYPE_RESULTS.PASS;
//     vehicle.testTypes.push(testType2);
//     expect(component.doesVehicleHaveOnlyAbandonedTestTypes(vehicle)).toBeFalsy();
//   });
//
//   it('should autocomplete the vehicle category when there is only one category available', () => {
//     let vehicle = { ...VEHICLE };
//     vehicle.euVehicleCategory = null;
//     vehicle.techRecord.vehicleType = VEHICLE_TYPE.CAR;
//     component.autoAssignVehicleCategoryOnlyWhenOneCategoryAvailable(vehicle);
//     expect(vehicle.euVehicleCategory).toEqual(EuVehicleCategoryData.EuCategoryCarData[0].key);
//     vehicle.euVehicleCategory = null;
//     vehicle.techRecord.vehicleType = VEHICLE_TYPE.LGV;
//     component.autoAssignVehicleCategoryOnlyWhenOneCategoryAvailable(vehicle);
//     expect(vehicle.euVehicleCategory).toEqual(EuVehicleCategoryData.EuCategoryLgvData[0].key);
//   });
//
//
//   it('should flatten the test types array', () => {
//     const testTypes = TEST_TYPES;
//     expect(testTypes.length).toEqual(4);
//     const flattened = testTypeService.flattenTestTypesData(testTypes);
//     expect(flattened.length).toEqual(11);
//     flattened.forEach((test => {
//       expect(test.nextTestTypesOrCategories).toBeFalsy();
//     }));
//   });
//
//   it('should return the suggested test type ids', () => {
//     const testTypes = TEST_TYPES;
//     expect(testTypeService.getSuggestedTestTypeIds('1', testTypeService.flattenTestTypesData(testTypes)))
//       .toEqual(["1", "2", "4"]);
//   });
//
//   it('should return the suggested test types', () => {
//     const testTypes = TEST_TYPES;
//     const flattened = testTypeService.flattenTestTypesData(testTypes);
//     const suggestedTestTypeIds = testTypeService.getSuggestedTestTypeIds('1', flattened);
//     const suggestedTestTypes = testTypeService.determineAssociatedTestTypes(flattened, suggestedTestTypeIds);
//     suggestedTestTypes.forEach((type => {
//       expect(['annual test', 'class 6a (seatbelt installation check)', 'first test'].includes(type.name));
//     }))
//   });
//
//   describe('onAddNewTestType()', () => {
//     beforeEach(() => {
//       jasmine.clock().uninstall();
//       jasmine.clock().install();
//       const mockTest = [
//         {
//           testStartTimestamp: new Date('2021-09-01T00:00:00.000Z'),
//           testStatus: TEST_REPORT_STATUSES.SUBMITTED,
//           testTypes: [
//             {
//               testResult: TEST_TYPE_RESULTS.FAIL,
//               testTypeStartTimestamp: '2021-09-01T00:00:00.000Z',
//               name: 'anything',
//             }
//           ],
//         }
//       ];
//       spyOn(storageService, 'read').and.returnValue(Promise.resolve(mockTest));
//       spyOn(component, 'getSuggestedTestTypes').and.returnValue([{testTypeName: 'anything'}]);
//       spyOn(alertService, 'alertSuggestedTestTypes').and.callFake(() => {});
//     });
//     afterEach(() => {
//       jasmine.clock().uninstall();
//     })
//     it('should inform the user if a test was failed within the last 20 days', async() => {
//       jasmine.clock().mockDate(new Date('2021-09-21T13:00:00.000Z'));
//       await component.onAddNewTestType({systemNumber: '123456'} as VehicleModel);
//       expect(alertService.alertSuggestedTestTypes).toHaveBeenCalled();
//     });
//     it('should NOT inform the user if a test was failed over 20 days', async() => {
//       jasmine.clock().mockDate(new Date('2021-09-22T13:00:00.000Z'));
//       await component.onAddNewTestType({systemNumber: '123456'} as VehicleModel);
//       expect(alertService.alertSuggestedTestTypes).not.toHaveBeenCalled();
//     });
//   })
//
//   it('should open the vehicle test history', async() => {
//     await component.goToVehicleTestResultsHistory(VEHICLE);
//     expect(analyticsService.logEvent).toHaveBeenCalledWith({
//       category: ANALYTICS_EVENT_CATEGORIES.SUGGESTED_TEST_TYPES_POPUP,
//       event: ANALYTICS_EVENTS.VIEW_TEST_HISTORY,
//       label: ANALYTICS_VALUE.VIEW_TEST_HISTORY
//     });
//     expect(navCtrl.push).toHaveBeenCalled()
//   });
//
//   it('should add the suggested test type', async() => {
//     spyOn(vehicleService, 'addTestType');
//     const testTypes = TEST_TYPES;
//     await component.addSuggestedTestType(testTypes[0], VEHICLE);
//     expect(analyticsService.logEvent).toHaveBeenCalledWith({
//       category: ANALYTICS_EVENT_CATEGORIES.SUGGESTED_TEST_TYPES_POPUP,
//       event: ANALYTICS_EVENTS.ADD_SUGGESTED_TEST_TYPE,
//       label: testTypes[0].name
//     });
//     expect(vehicleService.addTestType).toHaveBeenCalled();
//   })
// });
