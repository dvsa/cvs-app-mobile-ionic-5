import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { APP_STRINGS } from '@app/app.enums';
import { StateReformingService } from '@providers/global/state-reforming.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

import {default as AppConfig} from '@config/application.hybrid';
import {Router} from "@angular/router";

@Component({
  selector: 'page-visit-confirmation',
  templateUrl: 'visit-confirmation.html',
  styleUrls: ['visit-confirmation.scss']
})
export class VisitConfirmationPage {
  testStationName: string;
  testerEmailAddress: string;
  message: string;
  additionalMessage: string;
  additionalMessageButton: string;

  constructor(
    private stateReformingService: StateReformingService,
    private alertCtrl: AlertController,
    private callNumber: CallNumber,
    private router: Router,
  ) {
    this.testStationName = this.router.getCurrentNavigation().extras.state.testStationName;
    this.testerEmailAddress = this.router.getCurrentNavigation().extras.state.testerEmailAddress;
  }

  ionViewWillEnter() {
    if (this.testStationName) {
      this.message = APP_STRINGS.CONFIRMATION_MESSAGE_END_VISIT + this.testStationName;
    } else if (this.testerEmailAddress) {
      this.message = APP_STRINGS.CONFIRMATION_MESSAGE_SUBMIT_TEST + this.testerEmailAddress;
      this.additionalMessage = APP_STRINGS.CONFIRMATION_ADDITIONAL_MESSAGE_SUBMIT_TEST;
      this.additionalMessageButton =
        APP_STRINGS.CONFIRMATION_ADDITIONAL_MESSAGE_BUTTON_SUBMIT_TEST;
    }
  }

  pushPage() {
    if (this.testStationName) {
      // this.navCtrl.popToRoot();
    } else if (this.testerEmailAddress) {
      // const views = this.navCtrl.getViews();
      // for (let i = views.length - 1; i >= 0; i--) {
        // if (views[i].component.name === PAGE_NAMES.VISIT_TIMELINE_PAGE) {
          // this.stateReformingService.onTestReview();
          // this.navCtrl.popTo(views[i]);
        // }
      // }
    }
  }

  async callSupport() {
    const confirm = await this.alertCtrl.create({
      message: `${AppConfig.app.KEY_PHONE_NUMBER}`,
      buttons: [
        {
          text: APP_STRINGS.CANCEL
        },
        {
          text: APP_STRINGS.CALL,
          handler: async () => {
            await this.callNumber.callNumber(AppConfig.app.KEY_PHONE_NUMBER, true);
          }
        }
      ]
    });
    await confirm.present();
  }
}
