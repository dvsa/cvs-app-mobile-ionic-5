import { NgModule } from '@angular/core';
import { AddDefectItemPage } from './add-defect-item';
import { PipesModule } from '@pipes/pipes.module';
import { DefectsService } from '@providers/defects/defects.service';
import { DirectivesModule } from '@directives/directives.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddDefectItemRoutingModule } from '@app/pages/testing/defects/add-defect-item/add-defect-item-routing.module';

@NgModule({
  declarations: [AddDefectItemPage],
  imports: [
    CommonModule,
    IonicModule,
    DirectivesModule,
    PipesModule,
    AddDefectItemRoutingModule,
    FormsModule,
  ],
  providers: [DefectsService]
})
export class AddDefectItemModule {}
