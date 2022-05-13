// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { IonicModule, NavController, NavParams, ViewController } from 'ionic-angular';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
// import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
// import { By } from '@angular/platform-browser';
// import { APP_STRINGS, TECH_RECORD_STATUS } from '../../../../app/app.enums';
// import { FormatVrmPipe } from '../../../../pipes/format-vrm/format-vrm.pipe';
// import { VehicleDataMock } from '../../../../assets/data-mocks/vehicle-data.mock';
// import { VehicleWeightsPage } from './vehicle-weights';
// import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
// import Spy = jasmine.Spy;
//
// describe('Component: VehicleWeightsPage', () => {
//   let component: VehicleWeightsPage;
//   let componentFixture: ComponentFixture<VehicleWeightsPage>;
//   let navParams: NavParams;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [VehicleWeightsPage, FormatVrmPipe],
//       imports: [IonicModule.forRoot(VehicleWeightsPage)],
//       providers: [
//         NavController,
//         CommonFunctionsService,
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: ViewController, useClass: ViewControllerMock }
//       ]
//     }).compileComponents();
//
//     navParams = TestBed.get(NavParams);
//     spyOn(navParams, 'get').and.returnValue(VehicleDataMock.VehicleData);
//     componentFixture = TestBed.createComponent(VehicleWeightsPage);
//     component = componentFixture.componentInstance;
//   }));
//
//   afterEach(() => {
//     componentFixture.destroy();
//     component = null;
//     navParams = null;
//   });
//
//   it('should not display the provisional label if the techRecord is current', () => {
//     component.ngOnInit();
//     component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.CURRENT;
//
//     componentFixture.detectChanges();
//     componentFixture.whenStable().then(() => {
//       let title = componentFixture.debugElement.query(
//         By.css('ion-toolbar ion-title div.toolbar-title')
//       );
//       expect(title).toBeNull();
//     });
//   });
//
//   it('should display the provisional label if the techRecord is provisional', () => {
//     component.ngOnInit();
//     component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.PROVISIONAL;
//
//     componentFixture.detectChanges();
//     componentFixture.whenStable().then(() => {
//       let title = componentFixture.debugElement.query(
//         By.css('ion-toolbar ion-title div.toolbar-title')
//       );
//       expect(title.nativeElement.innerText).toBe(APP_STRINGS.PROVISIONAL_LABEL_TEXT);
//     });
//   });
//
//   it('should sort the axles on initialisation', () => {
//     const multiAxleVehicle = {
//       techRecord: {
//         axles: [
//           {axleNumber: 2},
//           {axleNumber: 1},
//           {axleNumber: 3},
//         ]
//       }
//     } as VehicleModel;
//     (component.navParams.get as Spy).and.returnValue(multiAxleVehicle);
//     component.ngOnInit();
//     const axleData = component.vehicleData.techRecord.axles;
//     expect(axleData.length).toEqual(3);
//     expect(axleData[0].axleNumber).toEqual(1);
//     expect(axleData[1].axleNumber).toEqual(2);
//     expect(axleData[2].axleNumber).toEqual(3);
//   });
// });
