import { NgModule } from '@angular/core';
import { DefectDetailsPage } from './defect-details';
import { DefectsService } from '../../../../providers/defects/defects.service';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DefectDetailsRoutingModule } from '@app/pages/testing/defects/defect-details/defect-details-routing.module';

@NgModule({
  declarations: [DefectDetailsPage],
  imports: [
    CommonModule,
    IonicModule,
    DefectDetailsRoutingModule,
    FormsModule,
  ],
  providers: [DefectsService, TestTypeService]
})
export class DefectDetailsModule {}
