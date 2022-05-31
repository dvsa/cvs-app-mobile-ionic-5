import { NgModule } from '@angular/core';
import { OdometerReadingPage } from './odometer-reading';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OdometerReadingPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  providers: [VehicleService]
})
export class OdometerReadingPageModule {}
