import { NgModule } from '@angular/core';
import { CompleteTestPage } from './test-complete';
import { DefectsService } from '@providers/defects/defects.service';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CompleteTestPage],
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [DefectsService, TestTypeService, VehicleService]
})
export class TestCompleteModule {}
