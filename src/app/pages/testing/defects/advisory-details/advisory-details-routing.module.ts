import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisoryDetailsPage } from '@app/pages/testing/defects/advisory-details/advisory-details';

const routes: Routes = [
  {
    path: '',
    component: AdvisoryDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvisoryDetailsRoutingModule {}
