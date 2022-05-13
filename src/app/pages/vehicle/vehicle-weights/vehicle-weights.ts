import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { APP_STRINGS, VEHICLE_TYPE, TECH_RECORD_STATUS } from '@app/app.enums';
import { get, orderBy } from 'lodash';
import { AxelsModel } from '@models/vehicle/tech-record.model';
import { Router } from '@angular/router';

@Component({
  selector: 'page-vehicle-weights',
  templateUrl: 'vehicle-weights.html',
  styleUrls: ['vehicle-weights.scss']
})
export class VehicleWeightsPage implements OnInit {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  TECH_RECORD_STATUS: typeof TECH_RECORD_STATUS = TECH_RECORD_STATUS;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;
  vehicleData: VehicleModel;

  constructor(
    public commonFunc: CommonFunctionsService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.vehicleData = this.router.getCurrentNavigation().extras.state.vehicleData;
    const axleData: AxelsModel[] = get(this.vehicleData, 'techRecord.axles', null);
    if(axleData && axleData.length) {
      this.vehicleData.techRecord.axles = orderBy(axleData, ['axleNumber'], ['asc']);
    }
  }
}
