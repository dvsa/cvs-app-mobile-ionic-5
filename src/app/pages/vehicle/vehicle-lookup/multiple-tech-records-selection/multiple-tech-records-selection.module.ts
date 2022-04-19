import { NgModule } from '@angular/core';
import { MultipleTechRecordsSelectionPage } from './multiple-tech-records-selection';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MultipleTechRecordsSelectionRoutingModule
} from '@app/pages/vehicle/vehicle-lookup/multiple-tech-records-selection/multiple-tech-records-selection-routing.module';

@NgModule({
  declarations: [
    MultipleTechRecordsSelectionPage
  ],
  imports: [
    MultipleTechRecordsSelectionRoutingModule,
    IonicModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    VehicleService
  ]
})
export class MultipleTechRecordsSelectionModule {}
