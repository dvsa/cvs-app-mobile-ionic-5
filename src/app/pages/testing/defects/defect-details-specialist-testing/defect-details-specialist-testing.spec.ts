import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, ModalController } from '@ionic/angular';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { TestTypeServiceMock } from '@test-config/services-mocks/test-type-service.mock';
import { DefectDetailsSpecialistTestingPage } from './defect-details-specialist-testing';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { SpecialistCustomDefectModel } from '@models/defects/defect-details.model';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import { AlertControllerMock } from 'ionic-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalControllerMock } from '@test-config/mocks/modal-controller.mock';

describe('Component: DefectDetailsSpecialistTestingPage', () => {
  let component: DefectDetailsSpecialistTestingPage;
  let fixture: ComponentFixture<DefectDetailsSpecialistTestingPage>;
  let alertCtrl: AlertController;
  let modalCtrl: ModalController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefectDetailsSpecialistTestingPage],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        ChangeDetectorRef,
        { provide: TestTypeService, useClass: TestTypeServiceMock },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: ModalController, useClass: ModalControllerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectDetailsSpecialistTestingPage);
    component = fixture.componentInstance;
    alertCtrl = TestBed.inject(AlertController);
    modalCtrl = TestBed.inject(ModalController);
    component.isEdit = false;
    component.defectIndex = null;
    component.defect = {} as SpecialistCustomDefectModel;
    component.testType = { ...TestTypeDataModelMock.TestTypeData };
    component.errorIncomplete = false;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    modalCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should set errorIncomplete to false if not in editMode', () => {
    component.errorIncomplete = true;
    component.ionViewWillEnter();
    expect(component.errorIncomplete).toBeFalsy();
    component.errorIncomplete = true;
    component.isEdit = true;
    component.ionViewWillEnter();
    expect(component.errorIncomplete).toBeTruthy();
  });

  it('should add the custom defect against the test type only if isEdit is false', async () => {
    spyOn(modalCtrl, 'dismiss');
    expect(component.testType.customDefects.length).toEqual(0);
    await component.onDone();
    expect(component.testType.customDefects.length).toEqual(1);
    component.isEdit = true;
    await component.onDone();
    expect(component.testType.customDefects.length).toEqual(1);
  });

  it('should pop up the alert when if a defect will be removed', async () => {
    await component.onRemoveDefect();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should block the length of a specific property on defect up to a given characters limit', () => {
    component.onInputChange('referenceNumber', 10, '0123456789123');
    expect(component.defect.referenceNumber.length).toEqual(10);
    expect(component.defect.referenceNumber).toEqual('0123456789');
  });
});
