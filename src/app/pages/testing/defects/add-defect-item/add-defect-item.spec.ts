import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefectsService } from '@providers/defects/defects.service';
import { PipesModule } from '@pipes/pipes.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddDefectItemPage } from './add-defect-item';
import { DefectsServiceMock } from '@test-config/services-mocks/defects-service.mock';
import { DefectsReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/defects-data.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { EventsService } from '@providers/events/events.service';
import { Router } from '@angular/router';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';

describe('Component: AddDefectItemPage', () => {
  let comp: AddDefectItemPage;
  let fixture: ComponentFixture<AddDefectItemPage>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDefectItemPage],
      imports: [
        PipesModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        EventsService,
        { provide: DefectsService, useClass: DefectsServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefectItemPage);
    comp = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              vehicleType: TestTypeDataModelMock.TestTypeData,
              vehicleTest: {},
              category: DefectsReferenceDataMock.DefectDataCategory,
              fromTestReview: false
            }
          }
      } as any
    );
    comp.category = DefectsReferenceDataMock.DefectDataCategory;
    comp.searchVal = '2';
    comp.filteredItems = [];
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should test ngOnInit logic', () => {
    expect(comp.filteredItems.length).toEqual(0);
    comp.ngOnInit();
    expect(comp.filteredItems.length).toEqual(1);
  });
});
