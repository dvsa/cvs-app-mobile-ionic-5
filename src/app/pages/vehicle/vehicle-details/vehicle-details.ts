import {Component, OnInit} from '@angular/core';
import {
  AlertController, ModalController,
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
import { Router } from '@angular/router';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';

@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html',
  styleUrls: ['vehicle-details.scss']
})
export class VehicleDetailsPage implements OnInit {
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
  changeOpacity = false;
  previousPageName: string;
  formattedVrm: string;

  constructor(
    public alertCtrl: AlertController,
    public storageService: StorageService,
    public commonFunc: CommonFunctionsService,
    private callNumber: CallNumber,
    private analyticsService: AnalyticsService,
    public appService: AppService,
    private router: Router,
    public modalCtrl: ModalController,
    public formatVrmPipe: FormatVrmPipe
  ) {
  }

  ngOnInit(): void {
    this.previousPageName = this.router.getCurrentNavigation().extras.state.previousPageName;
    this.vehicleData = this.router.getCurrentNavigation().extras.state.vehicle;
    this.testData = this.router.getCurrentNavigation().extras.state.test;
  }

  async ionViewWillEnter() {
    this.formattedVrm = this.formatVrmPipe.transform(this.vehicleData.vrm);

    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VEHICLE_DETAILS);
  }

  async goToPreparerPage(): Promise<void> {
    this.changeOpacity = true;
    const confirm = await this.alertCtrl.create({
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
            }).then(async (resp) => {
              if (!resp) {
                const alert = await this.alertCtrl.create({
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
                await alert.present();
              }
            });
          }
        }
      ]
    });
    await confirm.present();
    const didDismiss = await confirm.onDidDismiss();
    if (didDismiss) {
      this.changeOpacity = false;
    }
  }

  async showMoreDetails(pageName: string): Promise<void> {
    await this.router.navigate([pageName], {state: {vehicleData: this.vehicleData}});
  }

  goToVehicleTestResultsHistory() {
    this.storageService
      .read(STORAGE.TEST_HISTORY + this.vehicleData.systemNumber)
      .then(async (data) => {
        await this.router.navigate([PAGE_NAMES.VEHICLE_HISTORY_PAGE], {
          state: {
            vehicleData: this.vehicleData,
            testResultsHistory: data ? data : [],
          }
        })
      });
  }

  getBackButtonText(): string {
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
