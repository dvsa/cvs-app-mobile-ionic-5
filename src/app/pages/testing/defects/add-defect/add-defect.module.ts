import { NgModule } from '@angular/core';
import { AddDefectPage } from './add-defect';
import { PipesModule } from '@pipes/pipes.module';
import { DefectsService } from '@providers/defects/defects.service';
import { DirectivesModule } from '@directives/directives.module';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddDefectRoutingModule } from '@app/pages/testing/defects/add-defect/add-defect-routing.module';

@NgModule({
  declarations: [AddDefectPage],
  imports: [
    CommonModule,
    IonicModule,
    DirectivesModule,
    PipesModule,
    AddDefectRoutingModule,
    FormsModule,
  ],
  providers: [DefectsService, CommonFunctionsService]
})
export class AddDefectModule {}
