import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SignaturePadPage } from './signature-pad';
import {
  AlertController,
  IonicModule,
  PopoverController
} from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppService } from '@providers/global/app.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { SignatureService } from '@providers/signature/signature.service';
import {
  AlertControllerMock,
  PopoverControllerMock
} from 'ionic-mocks';
import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { SignaturePad } from 'angular2-signaturepad';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Store } from '@ngrx/store';
import { LogsProvider } from '@store/logs/logs.service';
import { AuthenticationService } from '@providers/auth';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { TestStore } from '@store/logs/data-store.service.mock';
import { AnalyticsService } from '@providers/global';
import { EventsService } from '@providers/events/events.service';

describe('Component: SignaturePadPage', () => {
  let fixture: ComponentFixture<SignaturePadPage>;
  let comp: SignaturePadPage;
  let appService: AppService;
  let signatureService: SignatureService;
  let signatureServiceSpy: any;
  let screenOrientationSpy: any;
  let openNativeSettingsSpy: any;
  let events: EventsService;
  let popoverCtrl: PopoverController;
  let alertCtrl: AlertController;
  let screenOrientation: ScreenOrientation;
  let openNativeSettings: OpenNativeSettings;
  let signaturePad: SignaturePad;
  let signaturePadSpy: any;
  let callNumber: CallNumber;
  let callNumberSpy: any;
  let logProvider: LogsProvider;
  let logProviderSpy;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;

  beforeEach(fakeAsync(() => {
    signatureServiceSpy = jasmine.createSpyObj('SignatureService', [
      'saveSignature',
      'saveToStorage',
      'presentSuccessToast'
    ]);

    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'addCustomDimension'
    ]);

    screenOrientationSpy = jasmine.createSpyObj('ScreenOrientation', ['lock']);
    openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', ['open']);
    signaturePadSpy = jasmine.createSpyObj('SignaturePad', ['clear', 'toDataURL', 'isEmpty']);
    callNumberSpy = jasmine.createSpyObj('CallNumber', ['callNumber']);

    TestBed.configureTestingModule({
      declarations: [SignaturePadPage],
      imports: [IonicModule],
      providers: [
        { provide: AppService, useClass: AppServiceMock },
        { provide: SignatureService, useValue: signatureServiceSpy },
        { provide: PopoverController, useFactory: () => PopoverControllerMock.instance() },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: ScreenOrientation, useValue: screenOrientationSpy },
        { provide: OpenNativeSettings, useValue: openNativeSettingsSpy },
        EventsService,
        { provide: SignaturePad, useValue: signaturePadSpy },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: Store, useClass: TestStore },
        { provide: CallNumber, useValue: callNumberSpy },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePadPage);
    comp = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    signatureService = TestBed.inject(SignatureService);
    events = TestBed.inject(EventsService);
    popoverCtrl = TestBed.inject(PopoverController);
    alertCtrl = TestBed.inject(AlertController);
    screenOrientation = TestBed.inject(ScreenOrientation);
    openNativeSettings = TestBed.inject(OpenNativeSettings);
    signaturePad = TestBed.inject(SignaturePad);
    callNumber = TestBed.inject(CallNumber);
    analyticsService = TestBed.inject(AnalyticsService);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    appService = null;
    signatureService = null;
    events = null;
    popoverCtrl = null;
    alertCtrl = null;
    screenOrientation = null;
    openNativeSettings = null;
    signaturePad = null;
    callNumber = null;
    callNumberSpy = null;
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should assign values to dividerText and underSignText', () => {
    expect(comp.dividerText).toBeUndefined();
    expect(comp.underSignText).toBeUndefined();
    comp.ngOnInit();
    expect(comp.dividerText).toBeDefined();
    expect(comp.underSignText).toBeDefined();
  });

  it('should test if screenOrientation.lock was called on ionViewWillEnter lifecycle ', () => {
    comp.ionViewWillEnter();
    expect(screenOrientation.lock).not.toHaveBeenCalled();
  });

  it('should test if screenOrientation.lock was called on ionViewWillLeave lifecycle', () => {
    comp.ionViewWillLeave();
    expect(screenOrientation.lock).not.toHaveBeenCalled();
  });

  it('test showConfirm: alertCtrl.create haveBeenCalled', () => {
    comp.showConfirm();
    expect(alertCtrl.create).toHaveBeenCalled();
  });
});
