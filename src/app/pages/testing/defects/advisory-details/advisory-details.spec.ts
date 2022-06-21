// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {
//   AlertController,
//   IonicModule,
//   NavController,
//   NavParams,
//   ViewController
// } from 'ionic-angular';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { TestTypeService } from '../../../../providers/test-type/test-type.service';
// import { TestTypeServiceMock } from '../../../../../test-config/services-mocks/test-type-service.mock';
// import { NavControllerMock } from 'ionic-mocks';
// import { AlertControllerMock } from 'ionic-mocks';
// import { AdvisoryDetailsPage } from './advisory-details';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { TestTypeModel } from '../../../../models/tests/test-type.model';
// import { TestTypeDataModelMock } from '../../../../assets/data-mocks/data-model/test-type-data-model.mock';
// import { DefectDetailsModel } from '../../../../models/defects/defect-details.model';
// import { DefectDetailsDataMock } from '../../../../assets/data-mocks/defect-details-data.mock';
//
// describe('Component: AdvisoryDetailsPage', () => {
//   let comp: AdvisoryDetailsPage;
//   let fixture: ComponentFixture<AdvisoryDetailsPage>;
//   let alertCtrl: AlertController;
//   let navCtrl: NavController;
//
//   const TEST_TYPE: TestTypeModel = TestTypeDataModelMock.TestTypeData;
//   const DEFECT: DefectDetailsModel = DefectDetailsDataMock.DefectData;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AdvisoryDetailsPage],
//       imports: [IonicModule.forRoot(AdvisoryDetailsPage)],
//       providers: [
//         { provide: NavController, useFactory: () => NavControllerMock.instance() },
//         { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: TestTypeService, useClass: TestTypeServiceMock }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     });
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AdvisoryDetailsPage);
//     comp = fixture.componentInstance;
//     alertCtrl = TestBed.get(AlertController);
//     navCtrl = TestBed.get(NavController);
//   });
//
//   afterEach(() => {
//     fixture.destroy();
//     comp = null;
//     alertCtrl = null;
//   });
//
//   it('should create component', (done) => {
//     expect(fixture).toBeTruthy();
//     expect(comp).toBeTruthy();
//     done();
//   });
//
//   it('should remove a specific defect from the testType', () => {
//     comp.vehicleTest = TEST_TYPE;
//     comp.advisory = DEFECT;
//     comp.vehicleTest.defects.push(comp.advisory);
//     comp.removeAdvisory();
//     expect(comp.vehicleTest.defects.length).toEqual(0);
//   });
//
//   it('should present a pop-up when removeAdvisoryConfirm is called', () => {
//     comp.removeAdvisoryConfirm();
//     expect(alertCtrl.create).toHaveBeenCalled();
//   });
//
//   it('should test submitAdvisory logic', () => {
//     comp.submitAdvisory();
//     expect(navCtrl.getViews).toHaveBeenCalled();
//   });
//
//   it('should test cancelAdvisory logic', () => {
//     comp.cancelAdvisory();
//     expect(navCtrl.pop).toHaveBeenCalled();
//   });
// });
