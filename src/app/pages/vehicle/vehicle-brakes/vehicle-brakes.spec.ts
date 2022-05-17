// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { IonicModule, NavController, NavParams, ViewController } from 'ionic-angular';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
// import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
// import { By } from '@angular/platform-browser';
// import { APP_STRINGS, TECH_RECORD_STATUS } from '../../../../app/app.enums';
// import { FormatVrmPipe } from '../../../../pipes/format-vrm/format-vrm.pipe';
// import { VehicleDataMock } from '../../../../assets/data-mocks/vehicle-data.mock';
// import { VehicleBrakesPage } from './vehicle-brakes';
// import { FormatBooleanPipe } from '../../../../pipes/format-boolean/format-boolean.pipe';
//
// describe('Component: VehicleBrakesPage', () => {
//   let component: VehicleBrakesPage;
//   let componentFixture: ComponentFixture<VehicleBrakesPage>;
//   let navParams: NavParams;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [VehicleBrakesPage, FormatVrmPipe, FormatBooleanPipe],
//       imports: [IonicModule.forRoot(VehicleBrakesPage)],
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
//     componentFixture = TestBed.createComponent(VehicleBrakesPage);
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
// });
