// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { AlertController, IonicModule, NavController, NavParams } from 'ionic-angular';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { TestAbandoningPage } from './test-abandon';
// import { TestTypeModel } from '../../../../models/tests/test-type.model';
// import { TestTypeDataModelMock } from '../../../../assets/data-mocks/data-model/test-type-data-model.mock';
// import { VisitService } from '../../../../providers/visit/visit.service';
// import { VisitServiceMock } from '../../../../../test-config/services-mocks/visit-service.mock';
// import { TestTypeService } from '../../../../providers/test-type/test-type.service';
// import { TestTypeServiceMock } from '../../../../../test-config/services-mocks/test-type-service.mock';
// import { AlertControllerMock, NavControllerMock } from 'ionic-mocks';
// import { AnalyticsService } from '../../../../providers/global';
//
// describe('Component: TestAbandoningPage', () => {
//   let component: TestAbandoningPage;
//   let fixture: ComponentFixture<TestAbandoningPage>;
//   let navCtrl: NavController;
//   let navParams: NavParams;
//   let alertCtrl: AlertController;
//   let visitService: VisitService;
//   let analyticsService: AnalyticsService;
//   let analyticsServiceSpy: any;
//
//   let vehicleTest: TestTypeModel = TestTypeDataModelMock.TestTypeData;
//   const selectedReasons = ['Best reason', 'Second best reason'];
//   const additionalComment = 'Some additional comment';
//
//   beforeEach(async(() => {
//     analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
//       'logEvent',
//       'addCustomDimension'
//     ]);
//
//     TestBed.configureTestingModule({
//       declarations: [TestAbandoningPage],
//       imports: [IonicModule.forRoot(TestAbandoningPage)],
//       providers: [
//         { provide: NavController, useFactory: () => NavControllerMock.instance() },
//         { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
//         { provide: VisitService, useClass: VisitServiceMock },
//         { provide: TestTypeService, useClass: TestTypeServiceMock },
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: AnalyticsService, useValue: analyticsServiceSpy }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestAbandoningPage);
//     component = fixture.componentInstance;
//     navCtrl = TestBed.get(NavController);
//     navParams = TestBed.get(NavParams);
//     alertCtrl = TestBed.get(AlertController);
//     visitService = TestBed.get(VisitService);
//     analyticsService = TestBed.get(AnalyticsService);
//     component.additionalComment = null;
//   });
//
//   beforeEach(() => {
//     const navParams = fixture.debugElement.injector.get(NavParams);
//
//     navParams.get = jasmine.createSpy('get').and.callFake((param) => {
//       const params = {
//         vehicleTest: vehicleTest,
//         selectedReasons: selectedReasons
//       };
//       return params[param];
//     });
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
//   it('should test ngOnInit logic', () => {
//     component.vehicleTest = vehicleTest;
//     component.vehicleTest.additionalCommentsForAbandon = 'abandon comments';
//     component.editMode = undefined;
//     component.ngOnInit();
//     expect(component.additionalComment).toEqual('abandon comments');
//     component.editMode = 'edit';
//     component.vehicleTest.additionalCommentsForAbandon = '';
//     component.ngOnInit();
//     expect(component.additionalComment).toEqual('abandon comments');
//   });
//
//   it('should create and present alert when pressing onDone', () => {
//     component.onDone();
//     expect(alertCtrl.create).toHaveBeenCalled();
//   });
//
//   it('should test onDone handler logic - popToRoot to have been called', () => {
//     spyOn(component, 'updateVehicleTestModel');
//     component.vehicleTest = vehicleTest;
//     component.fromTestReview = true;
//     component.onDoneHandler();
//     expect(component.updateVehicleTestModel).toHaveBeenCalled();
//     expect(navCtrl.popToRoot).toHaveBeenCalled();
//   });
//
//   it('should test onDone handler logic - popToRoot not to have been called', () => {
//     spyOn(component, 'updateVehicleTestModel');
//     component.vehicleTest = vehicleTest;
//     component.fromTestReview = false;
//     component.onDoneHandler();
//     expect(component.updateVehicleTestModel).toHaveBeenCalled();
//     expect(navCtrl.popToRoot).not.toHaveBeenCalled();
//   });
//
//   it('should update the vehicleTestModel with abandonment object', async () => {
//     component.vehicleTest = vehicleTest;
//     component.vehicleTest.additionalCommentsForAbandon = null;
//     component.selectedReasons = navParams.get('selectedReasons');
//     expect(component.vehicleTest.reasons.length).toEqual(0);
//     expect(component.vehicleTest.additionalCommentsForAbandon).toEqual(null);
//     component.additionalComment = additionalComment;
//
//     await component.updateVehicleTestModel();
//     expect(component.vehicleTest.reasons.length).toEqual(2);
//     expect(component.vehicleTest.additionalCommentsForAbandon).toEqual('Some additional comment');
//   });
// });
