import { CategoryReadingPage } from './eu-vehicle-category';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EuVehicleCategoryData } from '@assets/app-data/eu-vehicle-category/eu-vehicle-category';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { VehicleServiceMock } from '@test-config/services-mocks/vehicle-service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@ionic/angular';
import { ModalControllerMock } from 'ionic-mocks';

describe('Component: EuVehicleCategoryPage', () => {
  let component: CategoryReadingPage;
  let fixture: ComponentFixture<CategoryReadingPage>;

  const VEHICLE_DATA: VehicleModel = VehicleDataMock.VehicleData;

  beforeEach( waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryReadingPage],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: VehicleService, useClass: VehicleServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryReadingPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    component.vehicle = VehicleDataMock.VehicleData;
    component.vehicle.techRecord.vehicleType = 'psv';
    component.ngOnInit();
    expect(component.categorySubtitle).toEqual(EuVehicleCategoryData.EuCategoryPsvSubtitleData);
    component.vehicle.techRecord.vehicleType = 'hgv';
    component.ngOnInit();
    expect(component.categorySubtitle).toEqual(EuVehicleCategoryData.EuCategoryHgvSubtitleData);
    component.vehicle.techRecord.vehicleType = 'trl';
    component.ngOnInit();
    expect(component.categorySubtitle).toEqual(EuVehicleCategoryData.EuCategoryTrlSubtitleData);
  });

  it('should test errorIncomplete logic', () => {
    component.errorIncomplete = true;
    component.vehicle = VEHICLE_DATA;
    component.vehicle.euVehicleCategory = '';
    component.ngOnInit();
    expect(component.errorIncomplete).toBeTruthy();
    component.vehicle.euVehicleCategory = 'm1';
    component.ngOnInit();
    expect(component.errorIncomplete).toBeFalsy();
  });

  it('should test setVehicleCategory logic', () => {
    component.vehicle = VEHICLE_DATA;
    component.setVehicleCategory('m1');
    expect(component.vehicle.euVehicleCategory).toEqual('m1');
  });
});
