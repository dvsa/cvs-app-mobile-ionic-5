import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  AlertController,
  PopoverController
} from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL,
  ANALYTICS_VALUE,
  APP_STRINGS,
  LOCAL_STORAGE,
  SIGNATURE_STATUS
} from '@app/app.enums';
import { SignaturePopoverComponent } from '@components/signature-popover/signature-popover';
import { SignatureService } from '@providers/signature/signature.service';
import { AppService } from '@providers/global/app.service';
import { default as AppConfig } from '@config/application.hybrid';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { LogsProvider } from '@store/logs/logs.service';
import { AnalyticsService } from '@providers/global';
import {EventsService} from '@providers/events/events.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'page-signature-pad',
  templateUrl: 'signature-pad.html',
  styleUrls: ['signature-pad.scss']
})
export class SignaturePadPage implements OnInit, AfterViewInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  underSignText: string;
  dividerText: string;
  oid: string;
  eventsSubscription: Subscription;

  public signaturePadOptions = {
    minWidth: 2,
    canvasWidth: 701,
    canvasHeight: 239
  };

  constructor(
    public popoverCtrl: PopoverController,
    public events: EventsService,
    public alertCtrl: AlertController,
    public appService: AppService,
    private screenOrientation: ScreenOrientation,
    private openNativeSettings: OpenNativeSettings,
    private signatureService: SignatureService,
    private analyticsService: AnalyticsService,
    private authenticationService: AuthenticationService,
    private callNumber: CallNumber,
    private logProvider: LogsProvider
  ) {
    this.eventsSubscription = this.events.subscribe(SIGNATURE_STATUS.ERROR, async () => {
      await this.showConfirm();
    });
  }

  ngOnInit(): void {
    this.dividerText = APP_STRINGS.SIGNATURE_DIVIDER;
    this.underSignText = APP_STRINGS.SIGNATURE_TEXT;
  }

  ionViewWillEnter() {
    if (this.appService.isCordova) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
    }
  }

  ionViewWillLeave() {
    if (this.appService.isCordova) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    }
  }

  ngAfterViewInit() {
    this.signaturePad.clear();
  }

  drawComplete() {
    this.signatureService.signatureString = this.signaturePad.toDataURL('image/png');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  async showConfirm() {
    const CONFIRM_ALERT = await this.alertCtrl.create({
      header: APP_STRINGS.UNABLE_LOAD_DATA,
      message: '',
      buttons: [
        {
          text: APP_STRINGS.SETTINGS_BTN,
          handler: () => {
            if (this.appService.isCordova) {
              this.openNativeSettings.open('settings');
            }
          }
        },
        {
          text: APP_STRINGS.CALL_SUPP_BTN,
          handler: () => {
            this.callNumber.callNumber(AppConfig.app.KEY_PHONE_NUMBER, true);
          }
        },
        {
          text: APP_STRINGS.TRY_AGAIN_BTN,
          handler: () => {
            this.oid = this.authenticationService.tokenInfo.oid;
            this.signatureService.saveSignature().subscribe(
              (response) => {
                this.logProvider.dispatchLog({
                  type: 'info',
                  message: `${this.oid} - ${response.status} ${response.body.message} for API call to ${response.url}`,
                  timestamp: Date.now(),
                });

                this.signatureService.presentSuccessToast();
                localStorage.setItem(LOCAL_STORAGE.SIGNATURE, 'true');
                this.appService.isSignatureRegistered = true;
                this.eventsSubscription.unsubscribe();
                this.events.publish(SIGNATURE_STATUS.SAVED_EVENT);
              },
              (error) => {
                this.logProvider.dispatchLog({
                  type: 'error-signatureService.saveSignature-showConfirm in signature-pad.ts',
                  message: `${this.oid} - ${error.status} ${error.message} for API call to ${error.url}`,
                  timestamp: Date.now()
                });

                this.trackErrorOnSavingSignature(ANALYTICS_VALUE.SAVING_SIGNATURE_FAILED);

                this.showConfirm();
              }
            );
          }
        }
      ]
    });
    await CONFIRM_ALERT.present();
  }

  private async trackErrorOnSavingSignature(value: string) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.TEST_ERROR,
      label: value
    });
  }

  /**
   * A popover that should look like an alert
   * Alerts do not allow images
   */
  async presentPopover() {
    if (this.signaturePad.isEmpty()) {
      const EMPTY_SIGNATURE = await this.alertCtrl.create({
        header: APP_STRINGS.SIGN_NOT_ENTERED,
        message: APP_STRINGS.SIGN_ENTER,
        buttons: [APP_STRINGS.OK]
      });
      await EMPTY_SIGNATURE.present();

      return;
    }

    const popOver = await this.popoverCtrl.create({
      component: SignaturePopoverComponent,
      cssClass: 'signature-popover',
    });
    await popOver.present();
  }
}
