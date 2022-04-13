import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleLookupPage } from './vehicle-lookup';
import {
  AlertController,
  IonicModule,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  Loading
} from 'ionic-angular';
import {
  AlertControllerMock,
  LoadingControllerMock,
  ModalControllerMock,
  NavControllerMock
} from 'ionic-mocks';
import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
import { VisitService } from '../../../../providers/visit/visit.service';
import { VisitServiceMock } from '../../../../../test-config/services-mocks/visit-service.mock';
import { StorageService } from '../../../../providers/natives/storage.service';
import { StorageServiceMock } from '../../../../../test-config/services-mocks/storage-service.mock';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { VehicleServiceMock } from '../../../../../test-config/services-mocks/vehicle-service.mock';
import { CallNumber } from '@ionic-native/call-number';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestDataModelMock } from '../../../../assets/data-mocks/data-model/test-data-model.mock';
import { VehicleDataMock } from '../../../../assets/data-mocks/vehicle-data.mock';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL,
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_VALUE,
  APP_STRINGS,
  STORAGE,
  VEHICLE_TYPE
} from '../../../../app/app.enums';
import { AuthenticationService } from '../../../../providers/auth/authentication/authentication.service';
import { AuthenticationServiceMock } from './../../../../../test-config/services-mocks/authentication-service.mock';
import { Store } from '@ngrx/store';
import { TestStore } from '../../../../modules/logs/data-store.service.mock';
import { AppService } from '../../../../providers/global/app.service';
import { AppServiceMock } from '../../../../../test-config/services-mocks/app-service.mock';
import { VehicleLookupSearchCriteriaData } from '../../../../assets/app-data/vehicle-lookup-search-criteria/vehicle-lookup-search-criteria.data';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { deepCopy } from 'ionic-angular/util/util';
import { ActivityService } from '../../../../providers/activity/activity.service';
import { ActivityServiceMock } from '../../../../../test-config/services-mocks/activity-service.mock';
import { LogsProvider } from '../../../../modules/logs/logs.service';
import { AnalyticsService } from '../../../../providers/global';

describe('Component: VehicleLookupPage', () => {
  let component: VehicleLookupPage;
  let fixture: ComponentFixture<VehicleLookupPage>;
  let openNativeSettingsSpy: any;
  let storageService: StorageServiceMock;
  let modalCtrl: ModalController;
  let activityService: ActivityService;
  let vehicleService: VehicleService;
  let visitService: VisitService;
  let logProvider: LogsProvider;
  let logProviderSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;

  const TEST_DATA = TestDataModelMock.TestData;
  const VEHICLE = VehicleDataMock.VehicleData;
  let loading: Loading;

  beforeEach(async(() => {
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);
    loading = jasmine.createSpyObj('Loading', ['dismiss', 'present']);

    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'setCurrentPage'
    ]);

    TestBed.configureTestingModule({
      declarations: [VehicleLookupPage],
      imports: [IonicModule.forRoot(VehicleLookupPage)],
      providers: [
        CallNumber,
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance(loading) },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: StorageService, useClass: StorageServiceMock },
        { provide: OpenNativeSettings, useValue: openNativeSettingsSpy },
        { provide: VehicleService, useClass: VehicleServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: Store, useClass: TestStore },
        { provide: AppService, useClass: AppServiceMock },
        { provide: ActivityService, useClass: ActivityServiceMock },
        { provide: LogsProvider, useValue: logProviderSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleLookupPage);
    component = fixture.componentInstance;
    storageService = TestBed.get(StorageService);
    analyticsService = TestBed.get(AnalyticsService);
    modalCtrl = TestBed.get(ModalController);
    vehicleService = TestBed.get(VehicleService);
    logProvider = TestBed.get(LogsProvider);
    activityService = TestBed.get(ActivityService);
    visitService = TestBed.get(VisitService);

    component.selectedSearchCriteria = 'Registration number, VIN or trailer ID';
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    storageService = null;
    vehicleService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test ionViewDidEnterLogic', () => {
    component.ionViewDidEnter();

    expect(analyticsService.setCurrentPage).toHaveBeenCalledWith(
      ANALYTICS_SCREEN_NAMES.VEHICLE_SEARCH
    );
  });

  it('should test ionViewWillEnter lifecycle hook', () => {
    component.testData = TEST_DATA;
    component.testData.vehicles.push(VEHICLE);
    component.ionViewWillEnter();
    expect(component.isCombinationTest).toBeTruthy();
    expect(component.searchPlaceholder).toEqual(APP_STRINGS.REG_NUMBER_TRAILER_ID_OR_VIN);
    component.testData.vehicles[0].techRecord.vehicleType = VEHICLE_TYPE.HGV;
    component.ionViewWillEnter();
    expect(component.searchPlaceholder).toEqual(APP_STRINGS.TRAILER_ID_OR_VIN);
  });

  it('should get the formatted search field placeholder', () => {
    component.selectedSearchCriteria =
      VehicleLookupSearchCriteriaData.VehicleLookupSearchCriteria[2];
    expect(component.getSearchFieldPlaceholder()).toEqual('Enter full VIN');
  });

  it('should call modal.create when pressing on changeSearchCriteria', () => {
    component.onChangeSearchCriteria();
    expect(modalCtrl.create).toHaveBeenCalled();
  });

  it('should get the right queryParam for techRecords call based on selected search criteria', () => {
    component.selectedSearchCriteria =
      VehicleLookupSearchCriteriaData.VehicleLookupSearchCriteria[4];
    expect(component.getTechRecordQueryParam().queryParam).toEqual('trailerId');
  });

  it('should empty ionic storage if the test history cannot be retrieved', async () => {
    spyOn(storageService, 'update');
    vehicleService.getVehicleTechRecords = jasmine.createSpy().and.callFake(() => of([VEHICLE]));
    vehicleService.getTestResultsHistory = jasmine
      .createSpy()
      .and.callFake(() => _throw('Error'));

    await component.searchVehicle('TESTVIN', loading);

    expect(storageService.update).toHaveBeenCalledTimes(1);
    expect(storageService.update).toHaveBeenCalledWith(
      STORAGE.TEST_HISTORY + VEHICLE.systemNumber,
      []
    );
    expect(analyticsService.logEvent).toHaveBeenCalledWith({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.TEST_ERROR,
      label: ANALYTICS_VALUE.TEST_RESULT_HISTORY_FAILED
    });
  });

  it('should dismiss the loading when the skeleton alert is displayed', async(() => {
    const skeletonVehicle = deepCopy(VEHICLE);

    skeletonVehicle.techRecord.recordCompleteness = 'skeleton';
    vehicleService.getVehicleTechRecords = jasmine
      .createSpy()
      .and.callFake(() => of([skeletonVehicle]));
    vehicleService.getTestResultsHistory = jasmine
      .createSpy()
      .and.callFake(() => _throw('Error'));
    vehicleService.createSkeletonAlert = jasmine.createSpy();
    component.searchVehicle('TESTVIN', loading);

    expect(vehicleService.createSkeletonAlert).toHaveBeenCalledTimes(1);
    expect(loading.dismiss).toHaveBeenCalledTimes(1);
  }));

  describe('onSearchVehicle', () => {
    it('should call searchVehicle if a valid response is returned which contains a body of true', () => {
      activityService.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of({body: true}));
      component.searchVehicle = jasmine.createSpy().and.callFake(() => {});

      const searchValue = 'P012301230123';
      const LOADING = component.loadingCtrl.create({
        content: 'Loading...'
      });

      component.onSearchVehicle(searchValue);

      expect(component.searchVehicle).toHaveBeenCalledTimes(1);
      expect(component.searchVehicle).toHaveBeenCalledWith(searchValue, LOADING);
    });
    it('should call createDataClearingAlert if a response is returned which contains a body of false', () => {
      const presentSpy = jasmine.createSpy();
      const searchValue = 'P012301230123';
      const LOADING = component.loadingCtrl.create({
        content: 'Loading...'
      });
      activityService.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of({body: false}));
      logProvider.dispatchLog = jasmine.createSpy().and.callFake(() => {});
      component.visitService.createDataClearingAlert = jasmine.createSpy().and.returnValue({
        present: presentSpy,
      });

      component.onSearchVehicle(searchValue);

      expect(component.visitService.createDataClearingAlert).toHaveBeenCalledTimes(1);
      expect(component.visitService.createDataClearingAlert).toHaveBeenCalledWith(LOADING);
      expect(presentSpy).toHaveBeenCalledTimes(1);
      expect(logProvider.dispatchLog).toHaveBeenCalledTimes(1);
    });
    it('should not call either searchVehicle or createDataClearingAlert if there is no response', () => {
      activityService.isVisitStillOpen = jasmine.createSpy().and.callFake(() => of());
      component.visitService.createDataClearingAlert = jasmine.createSpy().and.callFake(() => {});
      component.searchVehicle = jasmine.createSpy().and.callFake(() => {});

      const searchValue = 'P012301230123';

      component.onSearchVehicle(searchValue);

      expect(component.searchVehicle).toHaveBeenCalledTimes(0);
      expect(component.visitService.createDataClearingAlert).toHaveBeenCalledTimes(0);
    });
  });
});
