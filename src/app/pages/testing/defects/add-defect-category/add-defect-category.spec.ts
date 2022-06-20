import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefectsService } from '@providers/defects/defects.service';
import { PipesModule } from '@pipes/pipes.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ViewControllerMock } from '@test-config/ionic-mocks/view-controller.mock';
import { DefectsServiceMock } from '@test-config/services-mocks/defects-service.mock';
import { DefectsReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/defects-data.mock';
import { EventsService } from '@providers/events/events.service';
import { AddDefectCategoryPage } from './add-defect-category';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('Component: AddDefectCategoryPage', () => {
  let comp: AddDefectCategoryPage;
  let fixture: ComponentFixture<AddDefectCategoryPage>;
  let viewCtrl: ViewControllerMock;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDefectCategoryPage],
      imports: [
        PipesModule,
        IonicModule,
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
    fixture = TestBed.createComponent(AddDefectCategoryPage);
    comp = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              vehicleType: TestTypeDataModelMock.TestTypeData,
              vehicleTest: {},
              defects: DefectsReferenceDataMock.DefectsData,
              fromTestReview: false
            }
          }
      } as any
    );
    comp.vehicleTest = TestTypeDataModelMock.TestTypeData;
    comp.defectCategories = DefectsReferenceDataMock.DefectsData;
    comp.filteredCategories = [];
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    viewCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should test ngOnInit logic', () => {
    expect(comp.filteredCategories.length).toEqual(0);
    comp.ngOnInit();
    expect(comp.filteredCategories.length).toEqual(2);
  });
});
