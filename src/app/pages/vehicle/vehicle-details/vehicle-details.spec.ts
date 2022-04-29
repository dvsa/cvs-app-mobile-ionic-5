import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleDetailsPage } from './vehicle-details';
import {
  AlertController, ModalController,
} from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertControllerMock, ModalControllerMock } from 'ionic-mocks';
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

describe('Component: VehicleDetailsPage', () => {
  let component: VehicleDetailsPage;
  let fixture: ComponentFixture<VehicleDetailsPage>;
  let commonFunctionsService: CommonFunctionsService;
  let callNumberSpy: any;
  let alertCtrl: AlertController;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: any;

  const VEHICLE: VehicleModel = VehicleDataMock.VehicleData;
  const TEST = TestTypeArrayDataMock.TestTypeArrayData[0];

  beforeEach(() => {
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'setCurrentPage'
    ]);

    TestBed.configureTestingModule({
      declarations: [VehicleDetailsPage],
      imports: [
        RouterTestingModule.withRoutes([])
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
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              previousPage: PAGE_NAMES.VISIT_TIMELINE_PAGE,
              vehicle: VEHICLE,
              test: TEST
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


  it('should check if alertCtrl was called', () => {
    component.goToPreparerPage();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should not display the provisional label if the techRecord is current', () => {
    component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.CURRENT;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const title = fixture.debugElement.query(By.css('ion-toolbar ion-title div.toolbar-title'));
      expect(title).toBeNull();
    });
  });

  it('should display the provisional label if the techRecord is provisional', () => {
    component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.PROVISIONAL;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const title = fixture.debugElement.query(By.css('ion-toolbar ion-title div.toolbar-title'));
      expect(title.nativeElement.innerText).toBe(APP_STRINGS.PROVISIONAL_LABEL_TEXT);
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
