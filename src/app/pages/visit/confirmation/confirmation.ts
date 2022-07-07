import {Component, OnInit} from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { APP_STRINGS, PAGE_NAMES } from '@app/app.enums';
import { StateReformingService } from '@providers/global/state-reforming.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { default as AppConfig } from '@config/application.hybrid';
import { Router } from '@angular/router';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
  styleUrls: ['confirmation.scss']
})
export class ConfirmationPage implements OnInit {
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
    private navCtrl: NavController
  ) {
  }

  ngOnInit(): void {
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

  async pushPage() {
    if (this.testStationName) {
      await this.router.navigate([PAGE_NAMES.TEST_STATION_HOME_PAGE]);
    } else if (this.testerEmailAddress) {
      // @TODO - VTA-738
      // this.stateReformingService.onTestReview();
      await this.navCtrl.navigateBack([PAGE_NAMES.VISIT_TIMELINE_PAGE]);
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
