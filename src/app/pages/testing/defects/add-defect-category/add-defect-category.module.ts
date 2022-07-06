import { NgModule } from '@angular/core';
import { AddDefectCategoryPage } from './add-defect-category';
import { PipesModule } from '@pipes/pipes.module';
import { DefectsService } from '@providers/defects/defects.service';
import { DirectivesModule } from '@directives/directives.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  AddDefectCategoryRoutingModule
} from '@app/pages/testing/defects/add-defect-category/add-defect-category-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddDefectCategoryPage],
  imports: [
    CommonModule,
    IonicModule,
    DirectivesModule,
    PipesModule,
    AddDefectCategoryRoutingModule,
    FormsModule,
  ],
  providers: [DefectsService]
})
export class AddDefectCategoryModule {}
