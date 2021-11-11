import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { CONNECTION_STATUS } from '@app/app.enums';

@Injectable()
export class NetworkService {
  private networkStatus$: BehaviorSubject<CONNECTION_STATUS> = new BehaviorSubject(
    CONNECTION_STATUS.OFFLINE
  );

  constructor(
    private network: Network,
    private platform: Platform,
  ) {
  }

  initialiseNetworkStatus(): void {
    const status =
      this.network.type !== 'none' ? CONNECTION_STATUS.ONLINE : CONNECTION_STATUS.OFFLINE;

    this.networkStatus$.next(status);

    if (this.platform.is('cordova')) {
      this.subscribeOnDevice();
    } else {
      this.subscribeOnBrowser();
    }
  }

  private subscribeOnDevice() {
    this.network.onDisconnect().subscribe(() => {
      this.updateNetworkStatus(CONNECTION_STATUS.OFFLINE);
    });

    this.network.onConnect().subscribe(() => {
      this.updateNetworkStatus(CONNECTION_STATUS.ONLINE);
    });
  }

  private subscribeOnBrowser() {
    merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    ).subscribe((status) => {
      if(status) {
        this.updateNetworkStatus(CONNECTION_STATUS.ONLINE);
      } else {
        this.updateNetworkStatus(CONNECTION_STATUS.OFFLINE);
      }
    });
  }

  private updateNetworkStatus(status: CONNECTION_STATUS) {
    this.networkStatus$.next(status);
  }

  networkType(): string {
    return this.network.type;
  }

  onNetworkChange(): Observable<CONNECTION_STATUS> {
    return this.networkStatus$.asObservable();
  }

  getNetworkState(): CONNECTION_STATUS {
    return this.networkStatus$.getValue();
  }
}
