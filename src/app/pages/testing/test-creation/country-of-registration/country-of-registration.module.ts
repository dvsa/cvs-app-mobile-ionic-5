import { NgModule } from '@angular/core';
import { CountryOfRegistrationPage } from './country-of-registration';
import {
  CountryOfRegistrationRoutingModule
} from '@app/pages/testing/test-creation/country-of-registration/country-of-registration-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '@directives/directives.module';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { VisitService } from '@providers/visit/visit.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CountryOfRegistrationPage],
  imports: [
    CountryOfRegistrationRoutingModule,
    IonicModule,
    CommonModule,
    FormsModule,
    DirectivesModule,
    BrowserModule,
  ],
  providers: [
    CommonFunctionsService,
    VisitService,
  ]
})
export class CountryOfRegistrationModule {}
