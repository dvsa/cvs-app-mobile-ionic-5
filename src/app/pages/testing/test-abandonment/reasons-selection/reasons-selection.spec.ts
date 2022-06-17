import { ReasonsSelectionPage } from './reasons-selection';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VEHICLE_TYPE } from '@app/app.enums';
import { TestAbandonmentReasonsData } from '@assets/app-data/abandon-data/test-abandonment-reasons.data';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { TestTypeServiceMock } from '@test-config/services-mocks/test-type-service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TestTypeModel } from '@models/tests/test-type.model';

describe('Component: ReasonsSelectionPage', () => {
  let component: ReasonsSelectionPage;
  let fixture: ComponentFixture<ReasonsSelectionPage>;
  let router: any;
  const VEHICLE_TEST: TestTypeModel = TestTypeDataModelMock.TestTypeData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReasonsSelectionPage],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: TestTypeService, useClass: TestTypeServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonsSelectionPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              vehicleTest: VEHICLE_TEST,
              vehicleType: 'hgv',
              fromTestReview: false
            }
          }
      } as any
    );
    component.vehicleTest = router.getCurrentNavigation().extras.state.vehicleTest;
    component.vehicleType = router.getCurrentNavigation().extras.state.vehicleType;
    component.fromTestReview = router.getCurrentNavigation().extras.state.fromTestReview;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should add or remove a reason out of an array depending on a boolean var', () => {
    expect(component.selectedReasons.length).toEqual(0);
    component.onCheck({ text: 'Best reason', isChecked: false });
    expect(component.selectedReasons.length).toEqual(1);
    component.onCheck({ text: 'Best reason', isChecked: true });
    expect(component.selectedReasons.length).toEqual(0);
  });

  it('should test ionViewWillEnter logic', () => {
    component.reasonsList = [];
    component.vehicleTest = { ...TestTypeDataModelMock.TestTypeData };
    component.ionViewWillEnter();
    expect(component.reasonsList.length).toBeGreaterThan(0);
  });

  it('should test transformReasons', () => {
    let reasonList = component.transformReasons(VEHICLE_TYPE.PSV);
    let reasonsData = TestAbandonmentReasonsData.TestAbandonmentReasonsPsvData;
    expect(reasonList[reasonList.length - 1].text).toEqual(reasonsData[reasonsData.length - 1]);
    component.vehicleTest.testTypeId = '49'; // TIR test type
    reasonList = component.transformReasons(VEHICLE_TYPE.HGV);
    reasonsData = TestAbandonmentReasonsData.TestAbandonmentReasonsTirTestTypesData;
    expect(reasonList[reasonList.length - 3].text).toEqual(reasonsData[reasonsData.length - 3]);
    component.vehicleTest.testTypeId = '50';
    reasonList = component.transformReasons(VEHICLE_TYPE.HGV);
    reasonsData = TestAbandonmentReasonsData.TestAbandonmentReasonsHgvTrailerData;
    expect(reasonList[reasonList.length - 4].text).toEqual(reasonsData[reasonsData.length - 4]);
    component.vehicleTest.testTypeId = '150';
    reasonList = component.transformReasons(VEHICLE_TYPE.HGV);
    reasonsData = TestAbandonmentReasonsData.TestAbandonmentReasonsSpecialistTestTypesData;
    expect(reasonList[reasonList.length - 2].text).toEqual(reasonsData[reasonsData.length - 2]);
  });
});
