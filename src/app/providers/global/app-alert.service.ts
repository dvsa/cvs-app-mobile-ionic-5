import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';

import { default as AppConfig } from '@config/application.hybrid';
import { APP_STRINGS, AUTH } from '@app/app.enums';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { TestCreatePage } from '@app/pages/testing/test-creation/test-create/test-create';

@Injectable()
export class AppAlertService {
  constructor(private alertCtrl: AlertController, private callNumber: CallNumber) {}

  async alertUnAuthorise() {
    const alert = await this.alertCtrl.create({
      header: APP_STRINGS.UNAUTHORISED,
      message: APP_STRINGS.UNAUTHORISED_MSG,
      buttons: [
        {
          text: APP_STRINGS.CALL,
          handler: () => {
            this.callNumber.callNumber(AppConfig.app.KEY_PHONE_NUMBER, true).then(
              (data) => console.log(data),
              (err) => console.log(err)
            );
            return false;
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  async alertInternetRequired() {
    const alert = await this.alertCtrl.create({
      header: AUTH.INTERNET_REQUIRED,
      message: APP_STRINGS.NO_INTERNET_CONNECTION,
      buttons: [APP_STRINGS.OK]
    });

    await alert.present();
  }

  async alertLoginFailed() {
    const alert = await this.alertCtrl.create({
      header: AUTH.FAILED,
      message: APP_STRINGS.PLUGIN_FAILURE,
      buttons: [APP_STRINGS.OK]
    });

    await alert.present();
  }

  async alertSuggestedTestTypes(
    recentlyFailedMessage: string,
    vehicle: VehicleModel,
    buttons: any[],
    testCreatePage: TestCreatePage
  ) {
    const alert = await this.alertCtrl.create({
      header: APP_STRINGS.RECENTLY_FAILED_TEST_TITLE,
      message: recentlyFailedMessage,
      buttons: [...buttons,
        {
          text: 'Test History',
          handler: async () => {
            await testCreatePage.goToVehicleTestResultsHistory(vehicle);
          }
        },
        {
          text: 'Select a different test type',
          handler: async () => {
            await testCreatePage.addNewTestType(vehicle);
          }
        }
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }

  // async callSupport() {
  //   const alert = this.alertCtrl.create({
  //     title: `${AppConfig.app.KEY_PHONE_NUMBER}`,
  //     buttons: [
  //       {
  //         text: APP_STRINGS.CANCEL
  //       },
  //       {
  //         text: APP_STRINGS.CALL,
  //         handler: () => {
  //           this.callNumber.callNumber(AppConfig.app.KEY_PHONE_NUMBER, true);
  //           alert.dismiss();
  //         }
  //       }
  //     ]
  //   });
  //
  //   await alert.present();
  // }
}
