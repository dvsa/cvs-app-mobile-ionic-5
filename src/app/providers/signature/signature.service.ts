import {Injectable} from '@angular/core';
import {HTTPService} from '@providers/global';
import {Observable} from 'rxjs';
import {
  // Events,
  ToastController,
} from '@ionic/angular';
import {StorageService} from '../natives/storage.service';
import {APP_STRINGS, STORAGE} from '@app/app.enums';
import {AuthenticationService} from '@providers/auth';

@Injectable()
export class SignatureService {
  signatureString: string;

  constructor(
    private httpService: HTTPService,
    private toastCtrl: ToastController,
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {}

  saveSignature(): Observable<any> {
    return this.httpService.saveSignature(
      this.authenticationService.tokenInfo.testerId,
      this.signatureString.slice(22, this.signatureString.length)
    );
  }

  saveToStorage(): Promise<any> {
    return this.storageService.create(STORAGE.SIGNATURE, this.signatureString);
  }

  async presentSuccessToast(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: APP_STRINGS.SIGN_TOAST_MSG,
      duration: 4000,
      position: 'top',
      cssClass: 'sign-toast-css'
    });
    await toast.present();
  }
}
