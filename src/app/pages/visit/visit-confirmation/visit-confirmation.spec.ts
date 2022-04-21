import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, NavController } from '@ionic/angular';
import { StateReformingService } from '@providers/global/state-reforming.service';
import { StateReformingServiceMock } from '@test-config/services-mocks/state-reforming-service.mock';
import { AlertControllerMock } from 'ionic-mocks';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {APP_STRINGS, PAGE_NAMES} from '@app/app.enums';
import {VisitConfirmationPage} from "@app/pages/visit/visit-confirmation/visit-confirmation";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {TestStationHomePage} from "@app/pages/test-station/test-station-home/test-station-home";

describe('Component: ConfirmationPage', () => {
  let comp: VisitConfirmationPage;
  let fixture: ComponentFixture<VisitConfirmationPage>;
  let alertCtrl: AlertController;
  let router: Router;

  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [VisitConfirmationPage],
       imports: [
         RouterTestingModule.withRoutes([
           {
             path: PAGE_NAMES.TEST_STATION_HOME_PAGE,
             component: TestStationHomePage,
           }
         ]),
       ],
      providers: [
        CallNumber,
        { provide: StateReformingService, useClass: StateReformingServiceMock },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitConfirmationPage);
    comp = fixture.componentInstance;
    router = TestBed.inject(Router);
    alertCtrl = TestBed.inject(AlertController);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    alertCtrl = null;
    router = null;
  });

  it('should create component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    done();
  });

  it('should test ionViewWillEnter logic', () => {
    comp.testStationName = 'qwerty';
    comp.ionViewWillEnter();
    expect(comp.message).toEqual(
      APP_STRINGS.CONFIRMATION_MESSAGE_END_VISIT + comp.testStationName
    );
    comp.testStationName = '';
    comp.testerEmailAddress = 'qwerty@qqq.com';
    comp.ionViewWillEnter();
    expect(comp.message).toEqual(
      APP_STRINGS.CONFIRMATION_MESSAGE_SUBMIT_TEST + comp.testerEmailAddress
    );
  });

  it('should test pressing on done logic', async () => {
    const navigateSpy = spyOn(router, 'navigate');
    comp.testStationName = 'qwerty';
    await comp.pushPage();
    expect(await navigateSpy).toHaveBeenCalledWith([PAGE_NAMES.TEST_STATION_HOME_PAGE]);
  });

  it('should create the call support alert', () => {
    comp.callSupport();
    expect(alertCtrl.create).toHaveBeenCalled();
  });
});
