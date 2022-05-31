import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OdometerReadingPage } from '@app/pages/testing/test-creation/odometer-reading/odometer-reading';

const routes: Routes = [
  {
    path: '',
    component: OdometerReadingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdometerReadingRoutingModule {}
