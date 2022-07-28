import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { APP_STRINGS, PAGE_NAMES } from '@app/app.enums';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { default as AppConfig } from '@config/application.hybrid';
import { Router } from '@angular/router';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
  styleUrls: ['confirmation.scss']
})
export class ConfirmationPage implements OnInit {
  testStation: TestStationReferenceDataModel;
  testerEmailAddress: string;
  message: string;
  additionalMessage: string;
  additionalMessageButton: string;
  isEndVisit: boolean;

  constructor(
    private alertCtrl: AlertController,
    private callNumber: CallNumber,
    private router: Router,
    private navCtrl: NavController
  ) {
  }

  ngOnInit(): void {
    this.isEndVisit = this.router.getCurrentNavigation().extras.state.isEndVisit;
    this.testStation = this.router.getCurrentNavigation().extras.state.testStation;
    this.testerEmailAddress = this.router.getCurrentNavigation().extras.state.testerEmailAddress;
  }

  ionViewWillEnter() {
    if (this.isEndVisit) {
      this.message = APP_STRINGS.CONFIRMATION_MESSAGE_END_VISIT + this.testStation.testStationName;
    } else {
      this.message = APP_STRINGS.CONFIRMATION_MESSAGE_SUBMIT_TEST + this.testerEmailAddress;
      this.additionalMessage = APP_STRINGS.CONFIRMATION_ADDITIONAL_MESSAGE_SUBMIT_TEST;
      this.additionalMessageButton =
        APP_STRINGS.CONFIRMATION_ADDITIONAL_MESSAGE_BUTTON_SUBMIT_TEST;
    }
  }

  async pushPage() {
    if (this.isEndVisit) {
      await this.router.navigate([PAGE_NAMES.TEST_STATION_HOME_PAGE]);
    } else if (this.testerEmailAddress) {
      await this.navCtrl.navigateBack([PAGE_NAMES.VISIT_TIMELINE_PAGE], {
        state: {
          testStation: this.testStation
        }
      });
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
