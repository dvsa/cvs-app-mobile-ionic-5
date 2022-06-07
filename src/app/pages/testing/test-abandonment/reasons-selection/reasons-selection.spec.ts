// import { ReasonsSelectionPage } from './reasons-selection';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { IonicModule, NavController, NavParams, ViewController } from 'ionic-angular';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
// import { VEHICLE_TYPE } from '../../../../app/app.enums';
// import { TestAbandonmentReasonsData } from '../../../../assets/app-data/abandon-data/test-abandonment-reasons.data';
// import { TestTypeDataModelMock } from '../../../../assets/data-mocks/data-model/test-type-data-model.mock';
// import { TestTypeService } from '../../../../providers/test-type/test-type.service';
// import { TestTypeServiceMock } from '../../../../../test-config/services-mocks/test-type-service.mock';
//
// describe('Component: ReasonsSelectionPage', () => {
//   let component: ReasonsSelectionPage;
//   let fixture: ComponentFixture<ReasonsSelectionPage>;
//   let navCtrl: NavController;
//   let navParams: NavParams;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ReasonsSelectionPage],
//       imports: [IonicModule.forRoot(ReasonsSelectionPage)],
//       providers: [
//         NavController,
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: ViewController, useClass: ViewControllerMock },
//         { provide: TestTypeService, useClass: TestTypeServiceMock }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ReasonsSelectionPage);
//     component = fixture.componentInstance;
//     navCtrl = TestBed.get(NavController);
//     navParams = TestBed.get(NavParams);
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
//   it('should add or remove a reason out of an array depending on a boolean var', () => {
//     expect(component.selectedReasons.length).toEqual(0);
//     component.onCheck({ text: 'Best reason', isChecked: false });
//     expect(component.selectedReasons.length).toEqual(1);
//     component.onCheck({ text: 'Best reason', isChecked: true });
//     expect(component.selectedReasons.length).toEqual(0);
//   });
//
//   it('should test ionViewWillEnter logic', () => {
//     component.reasonsList = [];
//     component.vehicleTest = { ...TestTypeDataModelMock.TestTypeData };
//     component.ionViewWillEnter();
//     expect(component.reasonsList.length).toBeGreaterThan(0);
//   });
//
//   it('should test transformReasons', () => {
//     component.vehicleTest = { ...TestTypeDataModelMock.TestTypeData };
//     let reasonList = component.transformReasons(VEHICLE_TYPE.PSV);
//     let reasonsData = TestAbandonmentReasonsData.TestAbandonmentReasonsPsvData;
//     expect(reasonList[reasonList.length - 1].text).toEqual(reasonsData[reasonsData.length - 1]);
//     component.vehicleTest.testTypeId = '49'; // TIR test type
//     reasonList = component.transformReasons(VEHICLE_TYPE.HGV);
//     reasonsData = TestAbandonmentReasonsData.TestAbandonmentReasonsTirTestTypesData;
//     expect(reasonList[reasonList.length - 3].text).toEqual(reasonsData[reasonsData.length - 3]);
//     component.vehicleTest.testTypeId = '50';
//     reasonList = component.transformReasons(VEHICLE_TYPE.HGV);
//     reasonsData = TestAbandonmentReasonsData.TestAbandonmentReasonsHgvTrailerData;
//     expect(reasonList[reasonList.length - 4].text).toEqual(reasonsData[reasonsData.length - 4]);
//     component.vehicleTest.testTypeId = '150';
//     reasonList = component.transformReasons(VEHICLE_TYPE.HGV);
//     reasonsData = TestAbandonmentReasonsData.TestAbandonmentReasonsSpecialistTestTypesData;
//     expect(reasonList[reasonList.length - 2].text).toEqual(reasonsData[reasonsData.length - 2]);
//   });
// });
