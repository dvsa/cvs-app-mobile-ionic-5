import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleDetailsPage } from './vehicle-details';
import {
  NavController,
  AlertController, LoadingController, ModalController,
} from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertControllerMock, LoadingControllerMock, ModalControllerMock } from 'ionic-mocks';
import { StorageService } from '@providers/natives/storage.service';
import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { TestTypeArrayDataMock } from '@assets/data-mocks/test-type-array-data.mock';
import {
  ANALYTICS_SCREEN_NAMES,
  APP_STRINGS, PAGE_NAMES,
  TECH_RECORD_STATUS
} from '@app/app.enums';
import { By } from '@angular/platform-browser';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import { AppService } from '@providers/global/app.service';
import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { AnalyticsService } from '@providers/global';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';
import {VehicleService} from '@providers/vehicle/vehicle.service';
import {VehicleServiceMock} from '@test-config/services-mocks/vehicle-service.mock';
import {LogsProvider} from '@store/logs/logs.service';
import {AuthenticationService} from '@providers/auth';
import {AuthenticationServiceMock} from '@test-config/services-mocks/authentication-service.mock';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { TestService } from '@providers/test/test.service';
import { TestServiceMock } from '@test-config/services-mocks/test-service.mock';
import { TestModel } from '@models/tests/test.model';
import {of} from 'rxjs';
import {TestResultsHistoryDataMock} from '@assets/data-mocks/test-results-history-data.mock';
import { TestCreatePage } from '@app/pages/testing/test-creation/test-create/test-create';
import { VehicleLookupPage } from '@app/pages/vehicle/vehicle-lookup/vehicle-lookup';
import { TestStationDataMock } from '@assets/data-mocks/reference-data-mocks/test-station-data.mock';

describe('Component: VehicleDetailsPage', () => {
  let component: VehicleDetailsPage;
  let fixture: ComponentFixture<VehicleDetailsPage>;
  let commonFunctionsService: CommonFunctionsService;
  let callNumberSpy: any;
  let alertCtrl: AlertController;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: any;
  let testReportService: TestService;
  let visitService: VisitService;
  let authService: AuthenticationService;
  let navController: NavController;
  let logProviderSpy: any;
  let vehicleService: VehicleService;
  let loadingController: LoadingController;

  const VEHICLE: VehicleModel = VehicleDataMock.VehicleData;
  const TEST = TestTypeArrayDataMock.TestTypeArrayData[0];
  const TEST_STATION = TestStationDataMock.TestStationData[0];
  const TEST_HISTORY_DATA = TestResultsHistoryDataMock.TestResultHistoryData;

  beforeEach(() => {
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);
    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'setCurrentPage'
    ]);

    TestBed.configureTestingModule({
      declarations: [VehicleDetailsPage],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: PAGE_NAMES.TEST_CREATE_PAGE,
            component: TestCreatePage
          },
          {
            path: PAGE_NAMES.VEHICLE_LOOKUP_PAGE,
            component: VehicleLookupPage
          }
        ])
      ],
      providers: [
        FormatVrmPipe,
        CommonFunctionsService,
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: CallNumber, useValue: callNumberSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: AppService, useClass: AppServiceMock },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: VehicleService, useClass: VehicleServiceMock },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: AppService, useClass: AppServiceMock },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: TestService, useClass: TestServiceMock },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsPage);
    component = fixture.componentInstance;
    commonFunctionsService = TestBed.inject(CommonFunctionsService);
    alertCtrl = TestBed.inject(AlertController);
    analyticsService = TestBed.inject(AnalyticsService);
    router = TestBed.inject(Router);
    testReportService = TestBed.inject(TestService);
    visitService = TestBed.inject(VisitService);
    vehicleService = TestBed.inject(VehicleService);
    loadingController = TestBed.inject(LoadingController);
    authService = TestBed.inject(AuthenticationService);
    navController = TestBed.inject(NavController);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              previousPage: PAGE_NAMES.VISIT_TIMELINE_PAGE,
              vehicle: VEHICLE,
              test: TEST,
              testStation: TEST_STATION
            }
          }
      } as any
    );
    component.vehicleData = router.getCurrentNavigation().extras.state.vehicle;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    commonFunctionsService = null;
    alertCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should set page tracking on ionViewWillEnter', async () => {
    await component.ionViewWillEnter();

    expect(await analyticsService.setCurrentPage).toHaveBeenCalledWith(
      ANALYTICS_SCREEN_NAMES.VEHICLE_DETAILS
    );
  });

  describe('confirmAndStartTest', () => {

    it('should call alertCtrl.create', () => {
      component.confirmAndStartTest();

      expect(alertCtrl.create).toHaveBeenCalled();
    });
  });

  describe('goToTestCreatePage', () => {
    beforeEach(() => {
      spyOn(testReportService, 'addVehicle').and.callFake(() => {});

      visitService.visit = {
        tests: [
          {
            startTime: null,
            endTime: null,
            status: null,
            reasonForCancellation: null,
            vehicles: null,
          },
        ],
        startTime: null,
        endTime: null,
        testStationName: null,
        testStationEmail: null,
        testStationPNumber: null,
        testStationType: null,
        testerEmail: null,
        testerId: null,
        testerName: null,
      };
    });

    it('should call testReportService.addVehicle', async () => {
      await component.goToTestCreatePage();

      expect(testReportService.addVehicle).toHaveBeenCalledTimes(1);
    });

    it('should call visitService.addTest if the latest test has an end time', async () => {
      const mockData: TestModel = {
        startTime: null,
        endTime: 'something',
        status: null,
        reasonForCancellation: null,
        vehicles: null,
      };

      spyOn(visitService, 'addTest').and.callFake(async () => {});
      spyOn(visitService, 'getLatestTest').and.returnValue(mockData);

      await component.goToTestCreatePage();

      expect(await visitService.addTest).toHaveBeenCalledTimes(1);
    });

    it('should allow the user to test the vehicle', async () => {
      const navigateSpy = spyOn(router, 'navigate');
      spyOn(component, 'canTestVehicle').and.returnValue(true);
      await component.goToTestCreatePage();
      expect(await navigateSpy).toHaveBeenCalled();
    });
    it('should not allow the user to test the vehicle', async () => {
      spyOn(component, 'canTestVehicle').and.returnValue(false);
      await component.goToTestCreatePage();
      expect(await alertCtrl.create).toHaveBeenCalled();
    });
  });

  it('should not display the provisional label if the techRecord is current', async () => {
    component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.CURRENT;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const title = fixture.debugElement.query(By.css('ion-toolbar .ion-padding-start'));
      expect(title).toBeNull();
    });
  });

  it('should display the provisional label if the techRecord is provisional', async () => {
    component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.PROVISIONAL;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const title = fixture.debugElement.query(By.css('ion-toolbar .ion-padding-start'));
      expect(title.nativeElement.innerText).toBe(APP_STRINGS.PROVISIONAL_LABEL_TEXT);
    });
  });

  describe('when pressing the back button', () => {
    beforeEach( () => {
      spyOn(navController, 'navigateBack');
      component.testStation = TEST_STATION;
    });
    it('should navigate to the vehicle-lookup page', async () => {
      component.previousPageName = PAGE_NAMES.TEST_CREATE_PAGE;
      await component.back();
      expect(await navController.navigateBack).toHaveBeenCalledWith(PAGE_NAMES.TEST_CREATE_PAGE, {
        state: {
          testStation: TEST_STATION
        }
      });
    });

    it('should navigate to the vehicle-lookup page', async () => {
      component.previousPageName = PAGE_NAMES.VEHICLE_LOOKUP_PAGE;
      await component.back();
      expect(await navController.navigateBack).toHaveBeenCalledWith(PAGE_NAMES.VEHICLE_LOOKUP_PAGE, {
        state: {
          testStation: TEST_STATION
        }
      });
    });

    it('should navigate to the vehicle-lookup page', async () => {
      component.previousPageName = PAGE_NAMES.VEHICLE_LOOKUP_PAGE;
      await component.back();
      expect(await navController.navigateBack).toHaveBeenCalledWith(PAGE_NAMES.VEHICLE_LOOKUP_PAGE, {
        state: {
          testStation: TEST_STATION
        }
      });
    });

    it('should navigate to the vehicle-lookup page', async () => {
      component.previousPageName = PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION;
      await component.back();
      expect(await navController.navigateBack).toHaveBeenCalledWith(PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION, {
        state: {
          testStation: TEST_STATION
        }
      });
    });
  });

  describe('when accessing the vehicle details page', () => {
    it('should set the back button text to "Test" when accessing from Test Create page', () => {
      component.previousPageName = PAGE_NAMES.TEST_CREATE_PAGE;
      expect(component.getBackButtonText()).toBe(APP_STRINGS.TEST);
    });
    it('should set the back button text to "Select Vehicle" when accessing from Multiple Tech records selection page', () => {
      component.previousPageName = PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION;
      expect(component.getBackButtonText()).toBe(APP_STRINGS.SELECT_VEHICLE);
    });
    it('should set the back button text to "Identify Vehicle" when accessing from the Vehicle Lookup page', () => {
      component.previousPageName = PAGE_NAMES.VEHICLE_LOOKUP_PAGE;
      expect(component.getBackButtonText()).toBe(APP_STRINGS.IDENTIFY_VEHICLE);
    });
    it('should set the back button text to Back if accessing from any other page', () => {
      component.previousPageName = 'Random page name';
      expect(component.getBackButtonText()).toBe('Back');
    });
  });
});
