import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import {
  APP_STRINGS,
  DATE_FORMAT,
  TECH_RECORD_STATUS,
  VEHICLE_TYPE
} from '@app/app.enums';
import { Router } from '@angular/router';

@Component({
  selector: 'page-vehicle-additional',
  templateUrl: 'vehicle-additional.html',
  styleUrls: ['vehicle-additional.scss']
})
export class VehicleAdditionalPage implements OnInit {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  SPECIAL_VEHICLE_TYPES: VEHICLE_TYPE[] = [
    VEHICLE_TYPE.CAR,
    VEHICLE_TYPE.LGV,
    VEHICLE_TYPE.MOTORCYCLE
  ];
  TECH_RECORD_STATUS: typeof TECH_RECORD_STATUS = TECH_RECORD_STATUS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
  vehicleData: VehicleModel;
  dateFormat: string;
  appStrings: any;

  constructor(
    public commonFunc: CommonFunctionsService,
    public router: Router
  ) {
    this.dateFormat = DATE_FORMAT.DD_MM_YYYY;
    this.appStrings = APP_STRINGS;
  }

  ngOnInit() {
    this.vehicleData = this.router.getCurrentNavigation().extras.state.vehicleData;
  }
}
