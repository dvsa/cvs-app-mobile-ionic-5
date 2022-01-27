import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  PopoverController,
} from '@ionic/angular';

import { SignatureService } from '@providers/signature/signature.service';
import { AppService } from '@providers/global/app.service';
import { LogsProvider } from '@store/logs/logs.service';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { APP_STRINGS, LOCAL_STORAGE, SIGNATURE_STATUS } from '@app/app.enums';
import {EventsService} from '@providers/events/events.service';

@Component({
  selector: 'signature-popover',
  templateUrl: 'signature-popover.html',
  styleUrls: ['signature-popover.scss'],
})
export class SignaturePopoverComponent implements OnInit {
  title: string;
  msg: string;
  loading: any;

  constructor(
    public appService: AppService,
    public loadingCtrl: LoadingController,
    public signatureService: SignatureService,
    private authenticationService: AuthenticationService,
    private logProvider: LogsProvider,
    private events: EventsService,
    private popoverController: PopoverController,
  ) {}

  async ngOnInit() {
    this.title = APP_STRINGS.SIGN_CONF_TITLE;
    this.msg = APP_STRINGS.SIGN_CONF_MSG;
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
  }

  async closePop() {
    await this.popoverController.dismiss();
  }

  async confirmPop() {
    const { oid } = this.authenticationService.tokenInfo;
    await this.loading.present();
    try {
      this.signatureService.saveSignature().subscribe(
        (response) => {
          this.logProvider.dispatchLog({
            type: 'info',
            message: `${oid} - ${response.status} ${response.body.message} for API call to ${response.url}`,
            timestamp: Date.now()
          });

          this.signatureService.saveToStorage().then(() => {
            this.signatureService.presentSuccessToast();
            localStorage.setItem(LOCAL_STORAGE.SIGNATURE, 'true');
            this.appService.isSignatureRegistered = true;
            this.closePop();
            this.loading.dismiss();
            this.events.publish(SIGNATURE_STATUS.SAVED_EVENT);
          });
        },
        (error) => {
          this.logProvider.dispatchLog({
            type: 'error-signatureService.saveSignature-confirmPop in signature-popover.ts',
            message: `${oid} - ${error.status} ${error.message} for API call to ${error.url}`,
            timestamp: Date.now()
          });

          this.events.publish(SIGNATURE_STATUS.ERROR);
        }
      );
    } finally {
      this.loading.dismiss();
    }
  }
}
