import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnotherPageRoutingModule } from './another-routing.module';

import { AnotherPage } from './another.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnotherPageRoutingModule
  ],
  declarations: [AnotherPage]
})
export class AnotherPageModule {}
