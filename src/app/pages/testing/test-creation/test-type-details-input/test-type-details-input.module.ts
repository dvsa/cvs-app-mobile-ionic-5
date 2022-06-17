import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestTypeDetailsInputPage } from './test-type-details-input';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestTypeDetailsInputPage],
  imports: [IonicPageModule.forChild(TestTypeDetailsInputPage), IonicModule, CommonModule, FormsModule]
})
export class TestTypeDetailsInputPageModule {}
