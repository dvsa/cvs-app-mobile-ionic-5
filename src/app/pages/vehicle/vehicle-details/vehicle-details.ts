import { Component } from '@angular/core';
import {
  AlertController, ModalController,
  NavController,
  NavParams,
} from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { TestModel } from '@models/tests/test.model';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import {
  ANALYTICS_SCREEN_NAMES,
  APP_STRINGS,
  DATE_FORMAT,
  PAGE_NAMES,
  STORAGE,
  TECH_RECORD_STATUS,
  VEHICLE_TYPE,
} from '@app/app.enums';
import { StorageService } from '@providers/natives/storage.service';
import { default as AppConfig } from '@config/application.hybrid';
import { AppService } from '@providers/global/app.service';
import { AnalyticsService } from '@providers/global';
import {Router} from "@angular/router";

@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html'
})
export class VehicleDetailsPage {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  SPECIAL_VEHICLE_TYPES: VEHICLE_TYPE[] = [
    VEHICLE_TYPE.MOTORCYCLE,
    VEHICLE_TYPE.CAR,
    VEHICLE_TYPE.LGV
  ];
  TECH_RECORD_STATUS: typeof TECH_RECORD_STATUS = TECH_RECORD_STATUS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
  vehicleData: VehicleModel;
  testData: TestModel;
  dateFormat: string = DATE_FORMAT.DD_MM_YYYY;
  changeOpacity: boolean = false;
  previousPageName: string;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public alertCtrl: AlertController,
    public storageService: StorageService,
    public commonFunc: CommonFunctionsService,
    private callNumber: CallNumber,
    private analyticsService: AnalyticsService,
    public appService: AppService,
    private router: Router,
    public modalCtrl: ModalController,
  ) {
    this.vehicleData = navParams.get('vehicle');
    this.testData = navParams.get('test');
    this.previousPageName = this.navCtrl.last().name;
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.getBackButtonText());
    this.modalCtrl.setBack

    this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VEHICLE_DETAILS);
  }

  goToPreparerPage(): void {
    this.changeOpacity = true;
    let confirm = this.alertCtrl.create({
      header: APP_STRINGS.CONFIRM_VEHICLE,
      message: APP_STRINGS.CONFIRM_VEHICLE_MSG,
      buttons: [
        {
          text: APP_STRINGS.CANCEL
        },
        {
          text: APP_STRINGS.CONFIRM,
          handler: async () => {
            // this.loggingInAlertHandler();

            await this.router.navigate([PAGE_NAMES.ADD_PREPARER_PAGE], {
              state: {
                test: this.testData,
                vehicle: this.vehicleData
              }
            }).then((resp) => {
              if (!resp) {
                const alert = this.alertCtrl.create({
                  header: APP_STRINGS.UNAUTHORISED,
                  message: APP_STRINGS.UNAUTHORISED_TEST_MSG,
                  buttons: [
                    {
                      text: APP_STRINGS.CANCEL,
                      role: 'cancel'
                    },
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
                  ]
                });
                alert.present();
              }
            });
          }
        }
      ]
    });
    confirm.present();
    confirm.onDidDismiss(() => (this.changeOpacity = false));
  }

  showMoreDetails(pageName: string): void {
    this.navCtrl.push(pageName, {
      vehicleData: this.vehicleData
    });
  }

  goToVehicleTestResultsHistory() {
    this.storageService
      .read(STORAGE.TEST_HISTORY + this.vehicleData.systemNumber)
      .then((data) => {
        this.navCtrl.push(PAGE_NAMES.VEHICLE_HISTORY_PAGE, {
          vehicleData: this.vehicleData,
          testResultsHistory: data ? data : []
        });
      });
  }

  private getBackButtonText(): string {
    switch (this.previousPageName) {
      case PAGE_NAMES.TEST_CREATE_PAGE:
        return APP_STRINGS.TEST;
      case PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION:
        return APP_STRINGS.SELECT_VEHICLE;
      case PAGE_NAMES.VEHICLE_LOOKUP_PAGE:
        return APP_STRINGS.IDENTIFY_VEHICLE;
      default:
        return 'Back';
    }
  }
}
