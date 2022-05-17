import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { APP_STRINGS, VEHICLE_TYPE, TECH_RECORD_STATUS } from '@app/app.enums';
import { Router } from '@angular/router';

@Component({
  selector: 'page-vehicle-tyres',
  templateUrl: 'vehicle-tyres.html',
  styleUrls: ['vehicle-tyres.scss']
})
export class VehicleTyresPage implements OnInit {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  TECH_RECORD_STATUS: typeof TECH_RECORD_STATUS = TECH_RECORD_STATUS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
  vehicleData: VehicleModel;

  constructor(
    public commonFunc: CommonFunctionsService,
    public router: Router,
  ) {
  }

  ngOnInit() {
    this.vehicleData = this.router.getCurrentNavigation().extras.state.vehicleData;
  }
}
