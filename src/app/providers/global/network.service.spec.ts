import { TestBed } from '@angular/core/testing';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { NetworkMock, PlatformMock } from 'ionic-mocks';
import { take } from 'rxjs/operators';
import { CONNECTION_STATUS } from '@app/app.enums';
import { NetworkService } from './network.service';

describe('NetworkService', () => {
  let platform: Platform;
  let network: Network;
  let service: NetworkService;

  const networkType = 'wifi';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NetworkService,
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: Network, useFactory: () => NetworkMock.instance('') }
      ]
    });

    platform = TestBed.inject(Platform);
    network = TestBed.inject(Network);
    service = TestBed.inject(NetworkService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('initialiseNetworkStatus', () => {
    let navigatorSpy: jasmine.Spy;

    beforeEach(() => {
      navigatorSpy = spyOnProperty(window.navigator, 'onLine');
      network.type = networkType;
    });

    it('should subscribe to network status initialization on device', () => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(true);

      service.initialiseNetworkStatus();

      expect(network.onDisconnect).toHaveBeenCalled();
      expect(network.onConnect).toHaveBeenCalled();
    });

    it('ONLINE: should subscribe to network status initialization on browser', () => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
      navigatorSpy.and.returnValue(true);

      service.initialiseNetworkStatus();
      const result = networkChange();

      expect(result).toEqual(CONNECTION_STATUS.ONLINE);
    });

    it('OFFLINE: should subscribe to network status initialization on browser', () => {
      platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
      navigatorSpy.and.returnValue(false);

      service.initialiseNetworkStatus();
      const result = networkChange();

      expect(result).toEqual(CONNECTION_STATUS.OFFLINE);
    });
  });

  it('should return the network type', () => {
    network.type = networkType;
    const result = service.networkType();

    expect(result).toEqual(networkType);
  });

  it('should return network status on change for ONLINE', () => {
    network.type = networkType;

    service.initialiseNetworkStatus();
    const result = networkChange();

    expect(result).toEqual(CONNECTION_STATUS.ONLINE);
  });

  it('should return network status on change for OFFLINE', () => {
    network.type = 'none';

    service.initialiseNetworkStatus();
    const result = networkChange();

    expect(result).toEqual(CONNECTION_STATUS.OFFLINE);
  });

  const networkChange = (): CONNECTION_STATUS =>  {
    let result: CONNECTION_STATUS;

    service
      .onNetworkChange()
      .pipe(take(1))
      .subscribe((value) => (result = value));

    return result;
  };
});
