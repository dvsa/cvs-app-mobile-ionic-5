import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AlertController, NavController,
} from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { TestTypeServiceMock } from '@test-config/services-mocks/test-type-service.mock';
import { AlertControllerMock } from 'ionic-mocks';
import { AdvisoryDetailsPage } from './advisory-details';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import { DefectDetailsModel } from '@models/defects/defect-details.model';
import { DefectDetailsDataMock } from '@assets/data-mocks/defect-details-data.mock';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PAGE_NAMES } from '@app/app.enums';
import { TestCompletePage } from '@app/pages/testing/test-creation/test-complete/test-complete';

describe('Component: AdvisoryDetailsPage', () => {
  let comp: AdvisoryDetailsPage;
  let fixture: ComponentFixture<AdvisoryDetailsPage>;
  let alertCtrl: AlertController;
  let navCtrl: NavController;
  let router: Router;

  const TEST_TYPE: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const DEFECT: DefectDetailsModel = DefectDetailsDataMock.DefectData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvisoryDetailsPage],
      imports: [
        RouterTestingModule.withRoutes([
          { path: PAGE_NAMES.TEST_COMPLETE_PAGE, component: TestCompletePage}
        ]),
      ],
      providers: [
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: TestTypeService, useClass: TestTypeServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisoryDetailsPage);
    comp = fixture.componentInstance;
    alertCtrl = TestBed.inject(AlertController);
    navCtrl = TestBed.inject(NavController);
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              vehicleTest: TEST_TYPE,
              advisory: DEFECT,
              isEdit: false,
            }
          }
      } as any
    );
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    alertCtrl = null;
  });

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should remove a specific defect from the testType', async () => {
    comp.vehicleTest = TEST_TYPE;
    comp.advisory = DEFECT;
    comp.vehicleTest.defects.push(comp.advisory);
    await comp.removeAdvisory();
    expect(comp.vehicleTest.defects.length).toEqual(0);
  });

  it('should present a pop-up when removeAdvisoryConfirm is called', async () => {
    await comp.removeAdvisoryConfirm();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should test submitAdvisory logic', async () => {
    const navSpy = spyOn(navCtrl, 'navigateBack');
    comp.vehicleTest = TEST_TYPE;
    comp.advisory = DEFECT;
    await comp.submitAdvisory();
    expect(navSpy).toHaveBeenCalled();
  });

  it('should test cancelAdvisory logic', async () => {
    const navSpy = spyOn(navCtrl, 'navigateBack');
    await comp.cancelAdvisory();
    expect(navSpy).toHaveBeenCalled();
  });
});
