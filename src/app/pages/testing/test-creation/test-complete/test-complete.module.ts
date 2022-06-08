import { NgModule } from '@angular/core';
import { DefectsService } from '@providers/defects/defects.service';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestCompletePage } from '@app/pages/testing/test-creation/test-complete/test-complete';

@NgModule({
  declarations: [TestCompletePage],
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [DefectsService, TestTypeService, VehicleService]
})
export class TestCompleteModule {}
