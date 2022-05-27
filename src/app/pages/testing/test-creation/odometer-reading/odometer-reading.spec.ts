// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { IonicModule, NavParams, ViewController } from 'ionic-angular';
// import { ViewControllerMock } from 'ionic-mocks';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { VisitService } from '../../../../providers/visit/visit.service';
// import { VisitServiceMock } from '../../../../../test-config/services-mocks/visit-service.mock';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { OdometerReadingPage } from './odometer-reading';
// import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
// import { VehicleServiceMock } from '../../../../../test-config/services-mocks/vehicle-service.mock';
// import { VehicleDataMock } from '../../../../assets/data-mocks/vehicle-data.mock';
// import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
//
// describe('Component: OdometerReadingPage', () => {
//   let component: OdometerReadingPage;
//   let fixture: ComponentFixture<OdometerReadingPage>;
//   let vehicleService: VehicleService;
//   let navParams: NavParams;
//
//   let VEHICLE: VehicleModel = VehicleDataMock.VehicleData;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [OdometerReadingPage],
//       imports: [IonicModule.forRoot(OdometerReadingPage)],
//       providers: [
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
//         { provide: VisitService, useClass: VisitServiceMock },
//         { provide: VehicleService, useClass: VehicleServiceMock }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(OdometerReadingPage);
//     component = fixture.componentInstance;
//     navParams = TestBed.get(NavParams);
//     vehicleService = TestBed.get(VehicleService);
//   });
//
//   beforeEach(() => {
//     const navParams = fixture.debugElement.injector.get(NavParams);
//
//     navParams.get = jasmine.createSpy('get').and.callFake((param) => {
//       const params = {
//         vehicle: VEHICLE
//       };
//       return params[param];
//     });
//
//     component.vehicle = navParams.get('vehicle');
//   });
//
//   afterEach(() => {
//     fixture.destroy();
//     component = null;
//     navParams = null;
//     vehicleService = null;
//   });
//
//   it('should create component', () => {
//     expect(fixture).toBeTruthy();
//     expect(component).toBeTruthy();
//   });
//
//   it('should test ngOnInit logic', () => {
//     component.vehicle.odometerReading = '32';
//     component.errorIncomplete = true;
//     component.ngOnInit();
//     expect(component.errorIncomplete).toBeFalsy();
//     component.vehicle.odometerReading = '';
//     component.errorIncomplete = true;
//     component.ngOnInit();
//     expect(component.errorIncomplete).toBeTruthy();
//   });
//
//   it('should test ngOnInit logic', () => {
//     VEHICLE.odometerReading = '';
//     component.vehicle = VEHICLE;
//     expect(component.vehicle.odometerReading.length).toEqual(0);
//     VEHICLE.odometerReading = '7676';
//     component.ngOnInit();
//     expect(component.vehicle.odometerReading.length).toEqual(4);
//   });
//
//   it('should display the odometer metric capitalised', () => {
//     component.odometerMetric = 'kilometres';
//     expect(component.displayOdometerMetricCapitalized()).toEqual('Kilometres');
//   });
// });
