import { TestTypesListPage } from './test-types-list';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '@providers/natives/storage.service';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { TestTypesReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/test-types.mock';
import { TestTypesReferenceDataModel } from '@models/reference-data-models/test-types.model';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { TestTypeServiceMock } from '@test-config/services-mocks/test-type-service.mock';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import {
  PAGE_NAMES,
  TEST_TYPE_RESULTS
} from '@app/app.enums';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { AnalyticsService } from '@providers/global';
import { of } from 'rxjs/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';
import { PipesModule } from '@pipes/pipes.module';

describe('Component: TestTypesListPage', () => {
  let component: TestTypesListPage;
  let fixture: ComponentFixture<TestTypesListPage>;
  let navCtrl: NavController;
  let testTypeService: TestTypeService;
  let testTypeServiceSpy;
  let vehicleService: VehicleService;
  let storageServiceSpy: any;
  let vehicleServiceSpy;
  let commonFunctionsService: CommonFunctionsService;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: any;

  const vehicleData: VehicleModel = VehicleDataMock.VehicleData;
  const testTypes: TestTypesReferenceDataModel[] = TestTypesReferenceDataMock.TestTypesData;
  const mockTestTypes = [
      {
        id: '1',
        name: 'annual test'
      }
    ] as TestTypesReferenceDataModel[];

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      read: new Promise((resolve) => resolve(testTypes))
    });
    vehicleServiceSpy = jasmine.createSpyObj('VehicleService', [
      'createVehicle',
      'addTestType',
      'removeTestType'
    ]);

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'addCustomDimension'
    ]);
    testTypeServiceSpy = jasmine.createSpyObj('TestTypeService', {
      orderTestTypesArray: jasmine.createSpy('orderTestTypesArray').and.returnValue(null),
      getTestTypesFromStorage: of(mockTestTypes)
    });

    TestBed.configureTestingModule({
      declarations: [TestTypesListPage],
      imports: [
        PipesModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        CommonFunctionsService,
        NativePageTransitions,
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
        { provide: TestTypeService, useClass: TestTypeServiceMock },
        { provide: TestTypeService, useValue: testTypeServiceSpy },
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypesListPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController);
    testTypeService = TestBed.inject(TestTypeService);
    vehicleService = TestBed.inject(VehicleService);
    commonFunctionsService = TestBed.inject(CommonFunctionsService);
    analyticsService = TestBed.inject(AnalyticsService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              previousExtras: null,
              vehicleData,
              testTypeReferenceData: mockTestTypes,
              previousTestTypeName: null,
              testTypeCategoryName: null,
              previousPageName: PAGE_NAMES.TEST_CREATE_PAGE,
              backBtn: 'backBtn'
            }
          }
      } as any
    );
    component.previousExtras = router.getCurrentNavigation().extras.state.previousExtras;
    component.vehicleData = router.getCurrentNavigation().extras.state.vehicleData;
    component.testTypeReferenceData = router.getCurrentNavigation().extras.state.testTypeData;
    component.previousTestTypeName = router.getCurrentNavigation().extras.state.previousTestTypeName;
    component.previousPageName = router.getCurrentNavigation().extras.state.previousPageName;
    component.testTypeCategoryName = router.getCurrentNavigation().extras.state.testTypeCategoryName;
    component.backBtn = router.getCurrentNavigation().extras.state.backBtn;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    testTypeService = null;
    commonFunctionsService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
    expect(testTypeService).toBeTruthy();
    expect(vehicleService).toBeTruthy();
  });

  it('ngOnInit: should get test ref data via service call', () => {
    component.ngOnInit();

    expect(testTypeService.orderTestTypesArray).toHaveBeenCalledWith(
      mockTestTypes,
      'sortId',
      'asc'
    );
  });

  it('ngOnInit: should get test ref data via internal storage', () => {
    component.testTypeReferenceData = null;
    component.ngOnInit();

    testTypeService
      .getTestTypesFromStorage()
      .subscribe((subRefData: TestTypesReferenceDataModel[]) => {
        expect(testTypeService.orderTestTypesArray).toHaveBeenCalledWith(
          subRefData,
          'sortId',
          'asc'
        );
      });
  });

  it('should TestTypeService and TestTypesListPage Component share the same instance', inject(
    [TestTypeService],
    (injectService: TestTypeService) => {
      expect(injectService).toBe(testTypeService);
    }
  ));

  it('should return true of false if the testType can be displayed', () => {
    let addedIds = ['38', '39'];
    expect(component.canDisplay(addedIds, testTypes[0])).toBeTruthy();
    addedIds = ['38', '30'];
    expect(component.canDisplay(addedIds, testTypes[0])).toBeFalsy();
  });

  it('should return true or false if the leafs of the category are already added or not.', () => {
    const addedIds = ['1', '38', '39'];
    expect(component.canDisplayCategory(testTypes[1], addedIds)).toBeTruthy();
    expect(component.canDisplayCategory(testTypes[0], addedIds)).toBeFalsy();
    expect(component.canDisplayCategory(testTypes[2], addedIds)).toBeTruthy();
  });

  it('should return an array with the ids and the added tests', () => {
    vehicleData.testTypes.push({
      name: 'annual test',
      testTypeName: 'Annual test',
      testTypeId: '3',
      certificateNumber: null,
      secondaryCertificateNumber: null,
      testTypeStartTimestamp: '2018-12-19T00:00:00.000Z',
      testTypeEndTimestamp: null,
      numberOfSeatbeltsFitted: null,
      lastSeatbeltInstallationCheckDate: null,
      seatbeltInstallationCheckDate: null,
      prohibitionIssued: null,
      additionalNotesRecorded: null,
      testResult: TEST_TYPE_RESULTS.PASS,
      reasonForAbandoning: null,
      additionalCommentsForAbandon: null,
      defects: [],
      reasons: [],
      linkedIds: ['38', '39']
    });
    const result = component.addedTestTypesIds(vehicleData);
    expect(result.length).toBe(1);
  });

  it('should test flow of selectedItem', async () => {
    const navigateSpy = spyOn(router, 'navigate');
    const navSpy = spyOn(navCtrl, 'navigateBack');
    component.firstPage = false;
    await component.selectedItem(testTypes[1], vehicleData);
    expect(await navigateSpy).toHaveBeenCalled();
    component.firstPage = true;
    await component.selectedItem(testTypes[1], vehicleData);
    expect(await navSpy).not.toHaveBeenCalled();
  });

  it('should check if navigateBack was called', async () => {
    const navSpy = spyOn(navCtrl, 'navigateBack');
    await component.cancelTypes();
    expect(await navSpy).toHaveBeenCalled();
  });
});
