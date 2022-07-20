import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_VALUE, STORAGE
} from '@app/app.enums';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { _throw } from 'rxjs/observable/throw';
import { Observable, Observer } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { TestModel } from '@models/tests/test.model';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { VisitService } from '@providers/visit/visit.service';
import { APP_STRINGS, PAGE_NAMES, VEHICLE_TYPE } from '@app/app.enums';
import { StorageService } from '@providers/natives/storage.service';
import { default as AppConfig } from '@config/application.hybrid';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { AnalyticsService } from '@providers/global';
import { AppService } from '@providers/global/app.service';
import { VehicleLookupSearchCriteriaData } from '@assets/app-data/vehicle-lookup-search-criteria/vehicle-lookup-search-criteria.data';
import { ActivityService } from '@providers/activity/activity.service';
import { LogsProvider } from '@store/logs/logs.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  VehicleLookupSearchCriteriaSelectionPage
} from '@app/pages/vehicle/vehicle-lookup/vehicle-lookup-search-criteria-selection/vehicle-lookup-search-criteria-selection';
import { TestResultModel } from '@models/tests/test-result.model';

@Component({
  selector: 'page-vehicle-lookup',
  templateUrl: 'vehicle-lookup.html',
  styleUrls: ['vehicle-lookup.scss']
})
export class VehicleLookupPage implements OnInit {
  testData: TestModel;
  searchVal = '';
  title = '';
  searchPlaceholder = '';
  isCombinationTest = false;
  selectedSearchCriteria: string;
  loading: any;
  previousPageName: string;
  testStation: any;

  constructor(
    public navController: NavController,
    public visitService: VisitService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storageService: StorageService,
    private openNativeSettings: OpenNativeSettings,
    private vehicleService: VehicleService,
    private analyticsService: AnalyticsService,
    private authenticationService: AuthenticationService,
    private callNumber: CallNumber,
    public appService: AppService,
    private modalCtrl: ModalController,
    private activityService: ActivityService,
    private logProvider: LogsProvider,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.previousPageName = this.router.getCurrentNavigation().extras.state.previousPageName;
      this.testStation = this.router.getCurrentNavigation().extras.state.testStation;
      this.testData = this.router.getCurrentNavigation().extras.state.testData;
    });
  }

  ionViewWillEnter() {
    this.searchVal = '';
    if (this.testData.vehicles.length) {
      this.isCombinationTest = true;
    }
    this.selectedSearchCriteria = this.canSearchOnlyTrailers()
      ? VehicleLookupSearchCriteriaData.DefaultVehicleLookupSearchCriteriaTrailersOnly
      : VehicleLookupSearchCriteriaData.DefaultVehicleLookupSearchCriteria;
    this.searchPlaceholder = this.getSearchFieldPlaceholder();
    this.title = this.canSearchOnlyTrailers()
      ? APP_STRINGS.IDENTIFY_TRAILER
      : APP_STRINGS.IDENTIFY_VEHICLE;
  }

  doesHgvLgvExist() {
    for (const vehicle of this.testData.vehicles) {
      if (
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.HGV ||
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.LGV
      ) {return true;}
    }
    return false;
  }

  canSearchOnlyTrailers() {
    return this.isCombinationTest && this.doesHgvLgvExist();
  }

  async ionViewDidEnter() {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VEHICLE_SEARCH);
  }

  /**
   * When clicking the search button, check if the visit is open
   */
  async onSearchVehicle(searchedValue: string): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      message: 'loading...'
    });
    this.loading.present();

    this.activityService.isVisitStillOpen().subscribe(
      (response) => {
        if (response && response.body === false) {
          this.visitService.createDataClearingAlert(this.loading);
          const {oid} = this.authenticationService.tokenInfo;
          this.logProvider.dispatchLog({
            type: 'activityService.isVisitStillOpen in vehicle-lookup.ts',
            message: `${oid} - attempted to search vehicle when visit no longer open - response was: ${JSON.stringify(response)}`,
            timestamp: Date.now()
          });
        } else {
          this.searchVehicle(searchedValue, this.loading);
        }
      },
      (isVisitStillOpenError) => {
        this.searchVal = '';
        this.loading.dismiss();
        this.showAlert();
      }
    );
  }

  async searchVehicle(searchedValue: string, LOADING) {
    const { oid } = this.authenticationService.tokenInfo;

    this.vehicleService
      .getVehicleTechRecords(
        searchedValue.toUpperCase(),
        this.getTechRecordQueryParam().queryParam
      )
      .subscribe(
        (vehicleData) => {
          const testHistoryResponseObserver: Observer<TestResultModel[]> = {
            next: async () => {
              await this.goToVehicleDetails(vehicleData[0]);
            },
            error: async (error) => {
              this.logProvider.dispatchLog({
                type:
                  'error-vehicleService.getTestResultsHistory-searchVehicle in vehicle-lookup.ts',
                message: `${oid} - ${error.status} ${error.error} for API call to ${error.url}`,
                timestamp: Date.now()
              });

              await this.trackErrorOnSearchRecord(ANALYTICS_VALUE.TEST_RESULT_HISTORY_FAILED);

              await this.storageService.update(STORAGE.TEST_HISTORY + vehicleData[0].systemNumber, []);
              await this.goToVehicleDetails(vehicleData[0]);
            },
            complete: () => {
            }
          };
          if (vehicleData.length > 1) {
            this.goToMultipleTechRecordsSelection(vehicleData).then(() => {
              LOADING.dismiss();
            });
          } else if (
            vehicleData.length === 1 &&
            this.vehicleService.isVehicleSkeleton(vehicleData[0])
          ) {
            this.vehicleService.createSkeletonAlert(this.alertCtrl);
            LOADING.dismiss();
          } else {
            this.vehicleService
              .getTestResultsHistory(vehicleData[0].systemNumber)
              .subscribe(testHistoryResponseObserver)
              .add(() => {
                LOADING.dismiss();
              });
          }
        },
        async (error) => {
          this.logProvider.dispatchLog({
            type: 'error-vehicleService.getTestResultsHistory-searchVehicle in vehicle-lookup.ts',
            message: `${oid} - ${error.status} ${error.error} for API call to ${error.url}`,
            timestamp: Date.now()
          });

          this.searchVal = '';
          LOADING.dismiss();
          await this.showAlert();
          await this.trackErrorOnSearchRecord(ANALYTICS_VALUE.TEST_RECORD_FAILED);
        }
      );
  }

  private async trackErrorOnSearchRecord(value: string) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.TEST_ERROR,
      label: value
    });
  }

  async close(): Promise<void> {
    if (this.previousPageName === PAGE_NAMES.VISIT_TIMELINE_PAGE || !this.isCombinationTest) {
      await this.visitService.removeTest(this.testData);
      await this.navController.navigateBack(PAGE_NAMES.VISIT_TIMELINE_PAGE, {
        state: {
          testStation: this.testStation
        }
      });
    } else {
      await this.navController.navigateBack(PAGE_NAMES.TEST_CREATE_PAGE, {
        state: {
          previousPageName: PAGE_NAMES.VEHICLE_DETAILS_PAGE,
          testStation: this.testStation
        }
      });
    }
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: APP_STRINGS.VEHICLE_NOT_FOUND,
      message: APP_STRINGS.VEHICLE_NOT_FOUND_MESSAGE,
      backdropDismiss: false,
      buttons: ['OK']
    });
    await alert.present();
    await this.trackErrorOnSearchRecord(ANALYTICS_VALUE.VEHICLE_NOT_FOUND);
  }

  async goToVehicleDetails(vehicleData: VehicleModel) {
    await this.router.navigate([PAGE_NAMES.VEHICLE_DETAILS_PAGE], {
      state: {
        testData: this.testData,
        vehicle: vehicleData,
        previousPageName: PAGE_NAMES.VEHICLE_LOOKUP_PAGE,
        testStation: this.testStation
      }
    });
  }

  async goToMultipleTechRecordsSelection(multipleVehicleData: VehicleModel[]) {
    await this.router.navigate([PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION], {
      state: {
        testData: this.testData,
        vehicles: multipleVehicleData,
        testStation: this.testStation
      }
    });
  }

  private async handleError(vehicleData: VehicleModel): Promise<Observable<any>> {
    const alert = await this.alertCtrl.create({
      header: 'Unable to load data',
      backdropDismiss: false,
      message: 'Make sure you are connected to the internet and try again',
      buttons: [
        {
          text: APP_STRINGS.SETTINGS_BTN,
          handler: () => {
            this.openNativeSettings.open('settings');
            this.handleError(vehicleData);
          }
        },
        {
          text: 'Call Technical Support',
          handler: () => {
            this.callNumber.callNumber(AppConfig.app.KEY_PHONE_NUMBER, true).then(
              (data) => console.log(data),
              (err) => console.log(err)
            );
            return false;
          }
        },
        {
          text: 'Try again',
          handler: () => {
            this.vehicleService.getTestResultsHistory(vehicleData.vin);
          }
        }
      ]
    });
    await alert.present();
    return _throw('Something bad happened; please try again later.');
  }

  getSearchFieldPlaceholder() {
    return (
      APP_STRINGS.ENTER +
      ' ' +
      this.selectedSearchCriteria.charAt(0).toLowerCase() +
      this.selectedSearchCriteria.slice(1)
    );
  }

  async onChangeSearchCriteria() {
    const MODAL = await this.modalCtrl.create({
      component: VehicleLookupSearchCriteriaSelectionPage,
      componentProps: {
        selectedSearchCriteria: this.selectedSearchCriteria,
        trailersOnly: this.canSearchOnlyTrailers()
      }
    });
    await MODAL.present();
    const { data } = await MODAL.onDidDismiss();
    if (data) {
      this.selectedSearchCriteria = data;
      this.searchPlaceholder = this.getSearchFieldPlaceholder();
    }
  }

  getTechRecordQueryParam() {
    return VehicleLookupSearchCriteriaData.VehicleLookupQueryParameters.find(
      (queryParamItem) => queryParamItem.text === this.selectedSearchCriteria
    );
  }
}
