import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import {
  AlertControllerMock,
  LoadingControllerMock,
} from 'ionic-mocks';
import { MultipleTechRecordsSelectionPage } from './multiple-tech-records-selection';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { VehicleServiceMock } from '@test-config/services-mocks/vehicle-service.mock';
import { StorageService } from '@providers/natives/storage.service';
import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';
import { Store } from '@ngrx/store';
import { TestStore } from '@store/logs/data-store.service.mock';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_VALUE,
  PAGE_NAMES
} from '@app/app.enums';
import { LogsProvider } from '@store/logs/logs.service';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { AnalyticsService } from '@providers/global';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TestStationDataMock } from '@assets/data-mocks/reference-data-mocks/test-station-data.mock';

describe('Component: ', () => {
  let component: MultipleTechRecordsSelectionPage;
  let fixture: ComponentFixture<MultipleTechRecordsSelectionPage>;
  let vehicleService: VehicleService;
  let alertCtrl: AlertController;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let navigateSpy;
  let router: Router;

  const TEST_STATION = TestStationDataMock.TestStationData[0];

  beforeEach(() => {
    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEvent']);

    TestBed.configureTestingModule({
      declarations: [MultipleTechRecordsSelectionPage],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: VehicleService, useClass: VehicleServiceMock },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: Store, useClass: TestStore },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: LogsProvider, useValue: logProviderSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleTechRecordsSelectionPage);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService);
    alertCtrl = TestBed.inject(AlertController);
    logProvider = TestBed.inject(LogsProvider);
    analyticsService = TestBed.inject(AnalyticsService);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    component.testStation = TEST_STATION;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should check if at at least one vehicle is skeleton', () => {
    component.vehicles = [];
    component.vehicles.push({ ...VehicleDataMock.VehicleData });
    component.ionViewWillEnter();
    expect(component.isAtLeastOneSkeleton).toBeFalsy();
    component.vehicles[0].techRecord.recordCompleteness = 'skeleton';
    component.ionViewWillEnter();
    expect(component.isAtLeastOneSkeleton).toBeTruthy();
  });

  it('should open the vehicle details page if the call to test-results is successful', async () => {
    await component.openVehicleDetails(VehicleDataMock.VehicleData);
    expect(await navigateSpy).toHaveBeenCalledWith(
      [PAGE_NAMES.VEHICLE_DETAILS_PAGE], {
        state : {
          test: undefined,
          vehicle: VehicleDataMock.VehicleData,
          previousPageName: PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION,
          testStation: TEST_STATION
        }
    });
  });

  it('should open the vehicle details page if the call to test-results is failing', async () => {
    spyOn(vehicleService, 'getTestResultsHistory').and.returnValue(throwError('error'));
    spyOn(vehicleService, 'isVehicleSkeleton').and.returnValue(false);

    await component.openVehicleDetails(VehicleDataMock.VehicleData);

    expect(await analyticsService.logEvent).toHaveBeenCalledWith({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.TEST_ERROR,
      label: ANALYTICS_VALUE.TEST_RESULT_HISTORY_FAILED
    });

    expect(await navigateSpy).toHaveBeenCalledWith(
      [PAGE_NAMES.VEHICLE_DETAILS_PAGE], {
        state : {
          test: undefined,
          vehicle: VehicleDataMock.VehicleData,
          previousPageName: PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION,
          testStation: TEST_STATION
        }
      });
  });

});
