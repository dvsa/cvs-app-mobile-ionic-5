import { NgModule } from '@angular/core';
import { TestCreatePage } from './test-create';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TestCreateRoutingModule } from '@app/pages/testing/test-creation/test-create/test-create-routing.module';

@NgModule({
  declarations: [TestCreatePage],
  imports: [
    CommonModule,
    IonicModule,
    TestCreateRoutingModule,
  ],
  providers: [
    VehicleService,
    TestTypeService
  ]
})
export class TestCreateModule {}
