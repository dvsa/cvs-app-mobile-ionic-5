import { NgModule } from '@angular/core';
import { ReasonsSelectionPage } from './reasons-selection';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  ReasonsSelectionRoutingModule
} from '@app/pages/testing/test-abandonment/reasons-selection/reasons-selection-routing.module';

@NgModule({
  declarations: [ReasonsSelectionPage],
  imports: [
    CommonModule,
    IonicModule,
    ReasonsSelectionRoutingModule,
  ],
  providers: [TestTypeService]
})
export class ReasonsSelectionModule {}
