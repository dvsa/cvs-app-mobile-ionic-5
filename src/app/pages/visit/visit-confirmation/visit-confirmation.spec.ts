// import { ConfirmationPage } from './visit-confirmation';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { AlertController, IonicModule, NavController, NavParams } from 'ionic-angular';
// import { NavParamsMock } from '../../../test-config/ionic-mocks/nav-params.mock';
// import { StateReformingService } from '../../providers/global/state-reforming.service';
// import { StateReformingServiceMock } from '../../../test-config/services-mocks/state-reforming-service.mock';
// import { AlertControllerMock, NavControllerMock } from 'ionic-mocks';
// import { CallNumber } from '@ionic-native/call-number';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { APP_STRINGS } from '../../app/app.enums';
//
// describe('Component: ConfirmationPage', () => {
//   let comp: ConfirmationPage;
//   let fixture: ComponentFixture<ConfirmationPage>;
//   let navCtrl: NavController;
//   let alertCtrl: AlertController;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ConfirmationPage],
//       imports: [IonicModule.forRoot(ConfirmationPage)],
//       providers: [
//         CallNumber,
//         { provide: NavController, useFactory: () => NavControllerMock.instance() },
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: StateReformingService, useClass: StateReformingServiceMock },
//         { provide: AlertController, useFactory: () => AlertControllerMock.instance() }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     });
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ConfirmationPage);
//     comp = fixture.componentInstance;
//     navCtrl = TestBed.get(NavController);
//     alertCtrl = TestBed.get(AlertController);
//   });
//
//   afterEach(() => {
//     fixture.destroy();
//     comp = null;
//     navCtrl = null;
//     alertCtrl = null;
//   });
//
//   it('should create component', (done) => {
//     expect(fixture).toBeTruthy();
//     expect(comp).toBeTruthy();
//     done();
//   });
//
//   it('should test ionViewWillEnter logic', () => {
//     comp.testStationName = 'qwerty';
//     comp.ionViewWillEnter();
//     expect(comp.message).toEqual(
//       APP_STRINGS.CONFIRMATION_MESSAGE_END_VISIT + comp.testStationName
//     );
//     comp.testStationName = '';
//     comp.testerEmailAddress = 'qwerty@qqq.com';
//     comp.ionViewWillEnter();
//     expect(comp.message).toEqual(
//       APP_STRINGS.CONFIRMATION_MESSAGE_SUBMIT_TEST + comp.testerEmailAddress
//     );
//   });
//
//   it('should test pressing on done logic', () => {
//     comp.testStationName = 'qwerty';
//     comp.pushPage();
//     expect(navCtrl.popToRoot).toHaveBeenCalled();
//     comp.testStationName = '';
//     comp.testerEmailAddress = 'qwerty@qqq.com';
//     comp.pushPage();
//     expect(navCtrl.getViews).toHaveBeenCalled();
//   });
//
//   it('should create the call support alert', () => {
//     comp.callSupport();
//     expect(alertCtrl.create).toHaveBeenCalled();
//   });
// });
