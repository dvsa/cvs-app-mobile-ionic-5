// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {
//   AlertController,
//   IonicModule,
//   NavController,
//   NavParams,
//   ViewController
// } from 'ionic-angular';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
// import { TestTypeService } from '../../../../providers/test-type/test-type.service';
// import { TestTypeServiceMock } from '../../../../../test-config/services-mocks/test-type-service.mock';
// import { DefectDetailsSpecialistTestingPage } from './defect-details-specialist-testing';
// import { VisitService } from '../../../../providers/visit/visit.service';
// import { VisitServiceMock } from '../../../../../test-config/services-mocks/visit-service.mock';
// import { SpecialistCustomDefectModel } from '../../../../models/defects/defect-details.model';
// import { TestTypeDataModelMock } from '../../../../assets/data-mocks/data-model/test-type-data-model.mock';
// import { AlertControllerMock } from 'ionic-mocks';
//
// describe('Component: DefectDetailsSpecialistTestingPage', () => {
//   let component: DefectDetailsSpecialistTestingPage;
//   let fixture: ComponentFixture<DefectDetailsSpecialistTestingPage>;
//   let navCtrl: NavController;
//   let navParams: NavParams;
//   let alertCtrl: AlertController;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [DefectDetailsSpecialistTestingPage],
//       imports: [IonicModule.forRoot(DefectDetailsSpecialistTestingPage)],
//       providers: [
//         NavController,
//         ChangeDetectorRef,
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: ViewController, useClass: ViewControllerMock },
//         { provide: TestTypeService, useClass: TestTypeServiceMock },
//         { provide: VisitService, useClass: VisitServiceMock },
//         { provide: AlertController, useFactory: () => AlertControllerMock.instance() }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(DefectDetailsSpecialistTestingPage);
//     component = fixture.componentInstance;
//     navCtrl = TestBed.get(NavController);
//     navParams = TestBed.get(NavParams);
//     alertCtrl = TestBed.get(AlertController);
//     component.isEdit = false;
//     component.defectIndex = null;
//     component.defect = {} as SpecialistCustomDefectModel;
//     component.testType = { ...TestTypeDataModelMock.TestTypeData };
//     component.errorIncomplete = false;
//   });
//
//   afterEach(() => {
//     fixture.destroy();
//     component = null;
//   });
//
//   it('should create the component', () => {
//     expect(fixture).toBeTruthy();
//     expect(component).toBeTruthy();
//   });
//
//   it('should set errorIncomplete to false if not in editMode', () => {
//     component.errorIncomplete = true;
//     component.ionViewWillEnter();
//     expect(component.errorIncomplete).toBeFalsy();
//     component.errorIncomplete = true;
//     component.isEdit = true;
//     component.ionViewWillEnter();
//     expect(component.errorIncomplete).toBeTruthy();
//   });
//
//   it('should add the custom defect against the test type only if isEdit is false', () => {
//     expect(component.testType.customDefects.length).toEqual(0);
//     component.onDone();
//     expect(component.testType.customDefects.length).toEqual(1);
//     component.isEdit = true;
//     component.onDone();
//     expect(component.testType.customDefects.length).toEqual(1);
//   });
//
//   it('should pop up the alert when if a defect will be removed', () => {
//     component.onRemoveDefect();
//     expect(alertCtrl.create).toHaveBeenCalled();
//   });
//
//   it('should block the length of a specific property on defect up to a given characters limit', () => {
//     component.onInputChange('referenceNumber', 10, '0123456789123');
//     expect(component.defect.referenceNumber.length).toEqual(10);
//     expect(component.defect.referenceNumber).toEqual('0123456789');
//   });
// });
