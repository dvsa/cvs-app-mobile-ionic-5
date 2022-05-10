import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingController, PopoverController } from '@ionic/angular';
import { SignaturePopoverComponent } from './signature-popover';
import { SignatureService } from '@providers/signature/signature.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_STRINGS, AUTH } from '@app/app.enums';
import { SignatureServiceMock } from '@test-config/services-mocks/signature-service.mock';
import { AppService } from '@providers/global/app.service';
import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { Store } from '@ngrx/store';
import { TestStore } from '@store/logs/data-store.service.mock';
import { LogsProvider } from '@store/logs/logs.service';
import { AuthenticationService } from '@providers/auth';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { EventsService } from '@providers/events/events.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('Component: SignaturePopoverComponent', () => {
  let fixture: ComponentFixture<SignaturePopoverComponent>;
  let comp: SignaturePopoverComponent;
  let signatureService: SignatureServiceMock;
  let loadingCtrl: LoadingController;
  let events: EventsService;
  let appService: AppService;
  let store: Store<any>;
  let logProvider: LogsProvider;
  let logProviderSpy;
  let eventsSpy;
  let popoverControllerSpy;
  let loadingPresentSpy;
  let loadingControllerMock;

  beforeEach(fakeAsync(async () => {
    logProviderSpy = jasmine.createSpyObj('LogsProvider', ['dispatchLog']);

    eventsSpy = jasmine.createSpyObj('Events', ['publish']);
    popoverControllerSpy = jasmine.createSpyObj('PopoverController', ['dismiss']);
    loadingPresentSpy = jasmine.createSpyObj('LoadingPresent', ['present', 'dismiss']);
    loadingControllerMock = {
      create: () => (Promise.resolve(loadingPresentSpy))
    };


    await TestBed.configureTestingModule({
      declarations: [SignaturePopoverComponent],
      providers: [
        { provide: SignatureService, useClass: SignatureServiceMock },
        { provide: LoadingController, useValue: loadingControllerMock },
        { provide: PopoverController, useValue: popoverControllerSpy },
        { provide: AppService, useClass: AppServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: Store, useClass: TestStore },
        { provide: LogsProvider, useValue: logProviderSpy },
        { provide: EventsService, useValue: eventsSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePopoverComponent);
    comp = fixture.componentInstance;
    signatureService = TestBed.inject(SignatureService);
    loadingCtrl = TestBed.inject(LoadingController);
    events = TestBed.inject(EventsService);
    appService = TestBed.inject(AppService);
    store = TestBed.inject(Store);
    logProvider = TestBed.inject(LogsProvider);
  });

  it('should create', () => {
    expect(comp).toBeDefined();
    comp.ngOnInit();
    expect(comp.title).toMatch(APP_STRINGS.SIGN_CONF_TITLE);
    expect(comp.msg).toMatch(APP_STRINGS.SIGN_CONF_MSG);
  });

  it('viewController.dismiss called', () => {
    comp.closePop();
    expect(popoverControllerSpy.dismiss).toHaveBeenCalled();
  });


  it('check confirmPop for successful case on saveSignature method',async () => {
    await comp.ngOnInit();
    await comp.confirmPop();
    expect(loadingPresentSpy.present).toHaveBeenCalled();
  });

  it('check confirmPop for error case on saveSignature method',async () => {
    spyOn(signatureService, 'saveSignature').and.returnValue(
      throwError(
        new HttpErrorResponse({ error : AUTH.INTERNET_REQUIRED })
      )
    );
    await comp.ngOnInit();
    await comp.confirmPop();
    expect(logProvider.dispatchLog).toHaveBeenCalled();
  });
});
