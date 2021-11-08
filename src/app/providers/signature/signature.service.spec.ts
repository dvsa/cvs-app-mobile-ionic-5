import {TestBed} from '@angular/core/testing';
import {
  // @TODO - Ionic 5 - replace this
  // Events,
  ToastController,
  Platform,
} from '@ionic/angular';
import {SignatureService} from './signature.service';
import {ToastControllerMock, PlatformMock} from 'ionic-mocks';

import { StorageService } from '../natives/storage.service';
import { HTTPService } from '@providers/global';
import { AuthenticationService } from '../auth';
import { SIGNATURE_STATUS } from '@app/app.enums';

describe('SignatureService', () => {
  let signatureService: SignatureService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let httpService: HTTPService;
  let httpServiceSpy;
  let authenticationService: AuthenticationService;
  let authenticationSpy: any;
  let eventsSpy: any;
  // @TODO - Ionic 5 - replace this
  // let events: Events;
  let toastCtrl: ToastController;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['create']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['saveSignature']);
    eventsSpy = jasmine.createSpyObj('Events', ['unsubscribe']);
    authenticationSpy = jasmine.createSpyObj('authenticationService', ['tokenInfo']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SignatureService,
        // @TODO - Ionic 5 - replace this
        // { provide: Events, useValue: eventsSpy },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: ToastController, useFactory: () => ToastControllerMock.instance() },
        { provide: AuthenticationService, useValue: authenticationSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: HTTPService, useValue: httpServiceSpy }
      ]
    });

    signatureService = TestBed.inject(SignatureService);
    storageService = TestBed.inject(StorageService);
    httpService = TestBed.inject(HTTPService);
    authenticationService = TestBed.inject(AuthenticationService);
    // @TODO - Ionic 5 - replace this
    // events = TestBed.inject(Events);
    toastCtrl = TestBed.inject(ToastController);
  });

  it('should check if saveSignature haveBeenCalled', () => {
    signatureService.signatureString = '22charsofgibberish////dGVzdA==';
    signatureService.saveSignature();
    expect(httpService.saveSignature).toHaveBeenCalled();
    expect(httpService.saveSignature).toHaveBeenCalledWith(undefined, 'dGVzdA==');
  });

  it('should save signature in storage', () => {
    signatureService.saveToStorage();
    expect(storageService.create).toHaveBeenCalled();
  });

  it('should test if events.unsubscribe haveBeenCalled', async () => {
    const toast = await toastCtrl.create();
    expect(toastCtrl.create).toHaveBeenCalled();
    await signatureService.presentSuccessToast();
    // @TODO - Ionic 5 - replace this
    // expect(events.unsubscribe).toHaveBeenCalledWith(SIGNATURE_STATUS.SAVED);
    // expect(events.unsubscribe).toHaveBeenCalledWith(SIGNATURE_STATUS.ERROR);
    expect(toast.present).toHaveBeenCalled();
  });
});
