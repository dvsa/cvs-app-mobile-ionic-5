import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
  LoadingController,
} from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { TestModel } from '@models/tests/test.model';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import {
  ANALYTICS_EVENT_CATEGORIES, ANALYTICS_EVENTS,
  ANALYTICS_SCREEN_NAMES, ANALYTICS_VALUE,
  APP_STRINGS,
  DATE_FORMAT,
  PAGE_NAMES,
  TECH_RECORD_STATUS,
  TESTER_ROLES,
  VEHICLE_TYPE,
} from '@app/app.enums';
import { StorageService } from '@providers/natives/storage.service';
import { default as AppConfig } from '@config/application.hybrid';
import { AppService } from '@providers/global/app.service';
import { AnalyticsService } from '@providers/global';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';
import { VisitService } from '@providers/visit/visit.service';
import { TestService } from '@providers/test/test.service';
import { AuthenticationService } from '@providers/auth';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import {LogsProvider} from '@store/logs/logs.service';

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
  backButtonText: string;
  testStation: any;

  constructor(
    private navController: NavController,
    public alertCtrl: AlertController,
    public storageService: StorageService,
    public commonFunc: CommonFunctionsService,
    private callNumber: CallNumber,
    private analyticsService: AnalyticsService,
    public appService: AppService,
    private router: Router,
    public modalCtrl: ModalController,
    public formatVrmPipe: FormatVrmPipe,
    public vehicleService: VehicleService,
    public logProvider: LogsProvider,
    private authService: AuthenticationService,
    private visitService: VisitService,
    private testReportService: TestService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
  ) {
  }

  ngOnInit(): void {
    // this mess will be fixed with the ngrx implementation
    this.route.params.subscribe(val => {
      try {
        this.previousPageName = this.router.getCurrentNavigation().extras.state.previousPageName;
        this.vehicleData = this.router.getCurrentNavigation().extras.state.vehicle;
        this.testData = this.router.getCurrentNavigation().extras.state.test;
        this.testStation = this.router.getCurrentNavigation().extras.state.testStation;
      } catch {
      }
      this.backButtonText = this.getBackButtonText();
    });
  }

  async ionViewWillEnter() {
    this.formattedVrm = this.formatVrmPipe.transform(this.vehicleData.vrm);
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VEHICLE_DETAILS);
  }

  async confirmAndStartTest(): Promise<void> {
    this.changeOpacity = true;
    const confirm = await this.alertCtrl.create({
      header: APP_STRINGS.START_TEST,
      message: APP_STRINGS.CONFIRM_VEHICLE_AND_START_TEST_MSG,
      buttons: [
        {
          text: APP_STRINGS.CANCEL
        },
        {
          text: APP_STRINGS.START_TEST,
          handler: async () => { await this.goToTestCreatePage(); }
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

  async goToVehicleTestResultsHistory() {
    const {oid} = this.authService.tokenInfo;
    const loadingSpinner = await this.loadingController.create({
      message: 'Loading...'
    });
    await loadingSpinner.present();

    this.vehicleService
      .getTestResultsHistory(this.vehicleData.systemNumber)
      .subscribe(
        {
          next: async (data) => {
            await loadingSpinner.dismiss();
            await this.router.navigate([PAGE_NAMES.VEHICLE_HISTORY_PAGE], {
              state: {
                vehicleData: this.vehicleData,
                testResultsHistory: data,
                previousPageName: PAGE_NAMES.VEHICLE_HISTORY_PAGE,
              }
            });
          },
          error: async (error) => {
            await loadingSpinner.dismiss();
            this.logProvider.dispatchLog({
              type:
                'error-vehicleService.getTestResultsHistory-searchVehicle in vehicle-lookup.ts',
              message: `${oid} - ${error.status} ${error.error} for API call to ${error.url}`,
              timestamp: Date.now()
            });

            await this.analyticsService.logEvent({
              category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
              event: ANALYTICS_EVENTS.TEST_ERROR,
              label: ANALYTICS_VALUE.TEST_RESULT_HISTORY_FAILED
            });
            await this.router.navigate([PAGE_NAMES.VEHICLE_HISTORY_PAGE], {
              state: {
                vehicleData: this.vehicleData,
                testResultsHistory: [],
                previousPageName: PAGE_NAMES.VEHICLE_HISTORY_PAGE,
              }
            });
          },
          complete: () => {
          }
        });
  }

  async goToTestCreatePage(): Promise<void> {
    if (this.canTestVehicle()) {
      if (!this.visitService.visit.tests.length ||
        this.visitService.getLatestTest().endTime) {
        await this.visitService.addTest(this.testData);
      }
      this.testReportService.addVehicle(this.testData, this.vehicleData);

      await this.router
        .navigate([PAGE_NAMES.TEST_CREATE_PAGE], {
          state: {
            test: this.testData,
            previousPageName: PAGE_NAMES.VEHICLE_DETAILS_PAGE,
            testStation: this.testStation
          }
        });
    } else {
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
  }

  async back() {
    await this.navController.navigateBack(this.previousPageName, {
      state: {
        testStation: this.testStation
      }
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

  canTestVehicle(): boolean {
    const { testerRoles: roles } = this.authService.tokenInfo;
    switch (this.vehicleData.techRecord.vehicleType) {
      case VEHICLE_TYPE.PSV: {
        return roles.some(
          (role) => role === TESTER_ROLES.PSV || role === TESTER_ROLES.FULL_ACCESS
        );
      }
      case VEHICLE_TYPE.HGV:
      case VEHICLE_TYPE.TRL: {
        return roles.some(
          (role) => role === TESTER_ROLES.HGV || role === TESTER_ROLES.FULL_ACCESS
        );
      }
    }
  }
}
