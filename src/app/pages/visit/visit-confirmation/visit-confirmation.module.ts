import { NgModule } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {VisitConfirmationRoutingModule} from '@app/pages/visit/visit-confirmation/visit-confirmation-routing.module';
import {VisitConfirmationPage} from '@app/pages/visit/visit-confirmation/visit-confirmation';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [VisitConfirmationPage],
  imports: [
    CommonModule,
    IonicModule,
    VisitConfirmationRoutingModule,
  ]
})
export class VisitConfirmationModule {}
