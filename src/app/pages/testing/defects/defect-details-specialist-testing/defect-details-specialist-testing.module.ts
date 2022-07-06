import { NgModule } from '@angular/core';
import { DefectDetailsSpecialistTestingPage } from './defect-details-specialist-testing';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DefectDetailsSpecialistTestingPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  providers: [TestTypeService]
})
export class DefectDetailsSpecialistTestingModule {}
