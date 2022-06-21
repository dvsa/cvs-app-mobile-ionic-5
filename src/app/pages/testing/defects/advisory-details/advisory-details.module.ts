import { NgModule } from '@angular/core';
import { AdvisoryDetailsPage } from './advisory-details';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {
  AdvisoryDetailsRoutingModule
} from '@app/pages/testing/defects/advisory-details/advisory-details-routing.module';

@NgModule({
  declarations: [AdvisoryDetailsPage],
  imports: [
    CommonModule,
    IonicModule,
    AdvisoryDetailsRoutingModule,
    FormsModule,
  ],
  providers: [TestTypeService]
})
export class AdvisoryDetailsModule {}
