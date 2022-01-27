import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignaturePadPageRoutingModule } from './signature-pad-routing.module';

import { SignaturePadPage } from './signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadPageRoutingModule,
    SignaturePadModule
  ],
  declarations: [SignaturePadPage]
})
export class SignaturePadPageModule {}
