import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CountryOfRegistrationPage
} from '@app/pages/testing/test-creation/country-of-registration/country-of-registration';

const routes: Routes = [
  {
    path: '',
    component: CountryOfRegistrationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryOfRegistrationRoutingModule {}
