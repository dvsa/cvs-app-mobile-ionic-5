import { NgModule } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ConfirmationRoutingModule} from '@app/pages/visit/confirmation/confirmation-routing.module';
import { ConfirmationPage } from '@app/pages/visit/confirmation/confirmation';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ConfirmationPage],
  imports: [
    CommonModule,
    IonicModule,
    ConfirmationRoutingModule,
  ]
})
export class ConfirmationModule {}
