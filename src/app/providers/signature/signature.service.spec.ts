import {TestBed} from '@angular/core/testing';
import {
  ToastController,
  Platform,
} from '@ionic/angular';
import {SignatureService} from './signature.service';
import {ToastControllerMock, PlatformMock} from 'ionic-mocks';

import { StorageService } from '../natives/storage.service';
import { HTTPService } from '@providers/global';
import { AuthenticationService } from '../auth';
import { EventsService } from '@providers/events/events.service';

describe('SignatureService', () => {
  let signatureService: SignatureService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let httpService: HTTPService;
  let httpServiceSpy;
  let authenticationService: AuthenticationService;
  let authenticationSpy: any;
  let toastCtrl: ToastController;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['create']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['saveSignature']);
    authenticationSpy = jasmine.createSpyObj('authenticationService', ['tokenInfo']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SignatureService,
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
    expect(toast.present).toHaveBeenCalled();
  });
});
