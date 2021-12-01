import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalPageRoutingModule } from './final-routing.module';

import { FinalPage } from './final.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalPageRoutingModule
  ],
  declarations: [FinalPage]
})
export class FinalPageModule {}
