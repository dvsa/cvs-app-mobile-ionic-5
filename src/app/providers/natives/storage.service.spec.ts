import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';
import { StorageMock } from 'ionic-mocks';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TestStore } from '@store/logs/data-store.service.mock';
import { LogsProvider } from '@store/logs/logs.service';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { AuthenticationService } from '@providers/auth';

describe('Provider: StorageService', () => {
  let storageService: StorageService;
  let storage: Storage;
  let logProvider: LogsProvider;
  let logProviderSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: Storage, useFactory: () => StorageMock.instance() },
        { provide: Store, useClass: TestStore },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: LogsProvider, useValue: logProviderSpy }
      ]
    });
    storageService = TestBed.inject(StorageService);
    storage = TestBed.inject(Storage);
    logProvider = TestBed.inject(LogsProvider);
  });

  beforeEach(() => {
    const store = {};

    spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (store[key] = value));

    spyOn(window.localStorage, 'removeItem').and.callFake((key) => {
      delete store[key];
    });

    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });
  });

  afterEach(() => {
    storageService = null;
    storage = null;
  });

  it('should call storage.set', () => {
    const value = ['some data'];
    storageService.create('key', value);

    expect(storage.set).toHaveBeenCalledWith('key', value);
  });

  it('should call storage.get', (done) => {
    storageService.read('key');

    storage.get('key').then(() => {
      expect(storage.get).toHaveBeenCalledWith('key');
      expect(logProvider.dispatchLog).toHaveBeenCalled();
      done();
    });
  });

  it('should update the storage', (done) => {
    const value = [1, 3];
    storageService.update('key', value);

    storage.remove('key').then(() => {
      expect(storage.remove).toHaveBeenCalledWith('key');
      expect(storage.set).toHaveBeenCalledWith('key', [1, 3]);
      done();
    });
  });

  it('should call storage.remove', () => {
    storageService.delete('key');
    expect(storage.remove).toHaveBeenCalledWith('key');
  });

  it('should call storage.clear', () => {
    storageService.clearStorage();
    expect(storage.clear).toHaveBeenCalled();
  });

  it('should return storage observable', () => {
    expect(storageService.watchStorage()).toEqual(jasmine.any(Observable));
  });

  it('should setItem into localStorage', () => {
    let value: any;
    storageService.setItem('key', value);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('should removeItem from localStorage', () => {
    storageService.removeItem('key');
    expect(window.localStorage.removeItem).toHaveBeenCalled();
  });
});
