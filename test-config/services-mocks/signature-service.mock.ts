import {Observable} from 'rxjs';
import {of} from 'rxjs';

export class SignatureServiceMock {
  signatureString: string;

  constructor() {
  }

  saveSignature(): Observable<any> {
    return of({status: 200, body: {message: 'some message'}});
  }

  saveToStorage(): Promise<any> {
    return Promise.resolve();
  }

  presentSuccessToast() {
    return;
  }
}
