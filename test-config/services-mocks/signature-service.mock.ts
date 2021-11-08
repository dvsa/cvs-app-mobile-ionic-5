import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { of, throwError } from 'rxjs';

export class SignatureServiceMock {
  signatureString: string;
  isError: boolean;

  constructor() {}

  saveSignature(): Observable<any> {
    if (this.isError) {
      return throwError({});
    }
    return of({});
  }

  goToRootPage(navCtrl: NavController): void {
    return;
  }

  saveToStorage(): Promise<any> {
    if (this.isError) {return Promise.reject();}
    return Promise.resolve();
  }

  presentSuccessToast() {
    return;
  }
}
