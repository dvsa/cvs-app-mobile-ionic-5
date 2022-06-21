import { AddDefectPage } from './add-defect';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { DefectsService } from '@providers/defects/defects.service';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import { TechRecordDataMock } from '@assets/data-mocks/tech-record-data.mock';
import { DefectsReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/defects-data.mock';
import { PipesModule } from '@pipes/pipes.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  DefectCategoryReferenceDataModel,
  DefectItemReferenceDataModel
} from '@models/reference-data-models/defects.reference-model';
import { VehicleTechRecordModel } from '@models/vehicle/tech-record.model';
import { DefectsServiceMock } from '@test-config/services-mocks/defects-service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

describe('Component: AddDefectPage', () => {
  let comp: AddDefectPage;
  let fixture: ComponentFixture<AddDefectPage>;
  let defectsService: DefectsService;
  let commonFunctionsService: CommonFunctionsService;
  let commonFunctionsServiceSpy: any;
  let router: Router;

  const VEHICLE_TEST: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const VEHICLE_TECH_RECORD: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;
  const CATEGORY: DefectCategoryReferenceDataModel = DefectsReferenceDataMock.DefectDataCategory;
  const ITEM: DefectItemReferenceDataModel = DefectsReferenceDataMock.DefectsDataItem;

  beforeEach(() => {
    commonFunctionsServiceSpy = jasmine.createSpyObj('CommonFunctionsService', {
      capitalizeString: 'Minor'
    });

    TestBed.configureTestingModule({
      declarations: [AddDefectPage],
      imports: [
        PipesModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        AlertController,
        { provide: DefectsService, useClass: DefectsServiceMock },
        { provide: CommonFunctionsService, useValue: commonFunctionsServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefectPage);
    comp = fixture.componentInstance;
    defectsService = TestBed.inject(DefectsService);
    commonFunctionsService = TestBed.inject(CommonFunctionsService);
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              vehicleType: VEHICLE_TECH_RECORD.techRecord[0].vehicleType,
              vehicleTest: VEHICLE_TEST,
              category: CATEGORY,
              item: ITEM,
              fromTestReview: false
            }
          }
      } as any
    );
  });

  afterEach(() => {
    fixture = null;
    comp = null;
    defectsService = null;
    commonFunctionsService = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should DefectsService and AddDefectPage Component share the same instance', inject(
    [DefectsService],
    (injectService: DefectsService) => {
      expect(injectService).toBe(defectsService);
    }
  ));

  it('should CommonFunctionsService and AddDefectPage Component share the same instance', inject(
    [CommonFunctionsService],
    (injectService: CommonFunctionsService) => {
      expect(injectService).toBe(commonFunctionsService);
    }
  ));

  it('should return the CSS Class', () => {
    expect(comp.returnBadgeClass('Minor')).toBe('badge-text-black');
  });
});
