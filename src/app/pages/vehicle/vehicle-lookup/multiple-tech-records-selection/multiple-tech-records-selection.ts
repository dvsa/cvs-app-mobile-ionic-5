import {Component, OnInit} from '@angular/core';
import {
  AlertController,
  LoadingController
} from '@ionic/angular';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { Observer } from 'rxjs';
import { TestResultModel } from '@models/tests/test-result.model';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_VALUE,
  APP_STRINGS,
  PAGE_NAMES,
  STORAGE
} from '@app/app.enums';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { StorageService } from '@providers/natives/storage.service';
import { TestModel } from '@models/tests/test.model';
import { LogsProvider } from '@store/logs/logs.service';
import { AnalyticsService } from '@providers/global';
import { Router } from '@angular/router';

@Component({
  selector: 'multiple-tech-records-selection',
  templateUrl: 'multiple-tech-records-selection.html',
  styleUrls: ['multiple-tech-records-selection.scss'],
})
export class MultipleTechRecordsSelectionPage implements OnInit{
  combinationTestData: TestModel;
  vehicles: VehicleModel[];
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
  isAtLeastOneSkeleton: boolean;
  testStation: any;

  constructor(
    public loadingCtrl: LoadingController,
    private authenticationService: AuthenticationService,
    public vehicleService: VehicleService,
    public storageService: StorageService,
    private analyticsService: AnalyticsService,
    private alertCtrl: AlertController,
    private logProvider: LogsProvider,
    private router: Router
  ) {}

  ngOnInit() {
    this.vehicles = this.router.getCurrentNavigation().extras.state.vehicles;
    this.combinationTestData = this.router.getCurrentNavigation().extras.state.test;
    this.testStation = this.router.getCurrentNavigation().extras.state.testStation;
  }

  ionViewWillEnter() {
    this.isAtLeastOneSkeleton = this.vehicles.some((vehicle) =>
      this.vehicleService.isVehicleSkeleton(vehicle)
    );
  }

  async openVehicleDetails(selectedVehicle: VehicleModel): Promise<void> {
    const LOADING = await this.loadingCtrl.create({
      message: 'loading....'
    });
    await LOADING.present();

    if (this.vehicleService.isVehicleSkeleton(selectedVehicle)) {
      await LOADING.dismiss();
      await this.vehicleService.createSkeletonAlert(this.alertCtrl);
    } else {
      await this.goToVehicleDetails(selectedVehicle);
      await LOADING.dismiss();
    }
  }

  async goToVehicleDetails(selectedVehicle: VehicleModel) {
    await this.router.navigate([PAGE_NAMES.VEHICLE_DETAILS_PAGE], {
      state: {
        test: this.combinationTestData,
        vehicle: selectedVehicle,
        previousPageName: PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION,
        testStation: this.testStation
      }
    });
  }
}
