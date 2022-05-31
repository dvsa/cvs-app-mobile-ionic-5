import { NgModule } from '@angular/core';

import { CategoryReadingPage } from './eu-vehicle-category';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [CategoryReadingPage],
  imports: [
    IonicModule,
    CommonModule
  ],
  providers: [VehicleService]
})
export class RegionReadingPageModule {}
