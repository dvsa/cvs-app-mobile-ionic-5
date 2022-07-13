import { NgModule } from '@angular/core';
import { TestTypeDetailsInputPage } from './test-type-details-input';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TestTypeDetailsInputRoutingModule
} from '@app/pages/testing/test-creation/test-type-details-input/test-type-details-input.routing.module';

@NgModule({
  declarations: [TestTypeDetailsInputPage],
  imports: [IonicModule, CommonModule, FormsModule, TestTypeDetailsInputRoutingModule]
})
export class TestTypeDetailsInputPageModule {}
