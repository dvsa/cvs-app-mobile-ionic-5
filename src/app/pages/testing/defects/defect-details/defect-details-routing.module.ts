import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefectDetailsPage } from '@app/pages/testing/defects/defect-details/defect-details';

const routes: Routes = [
  {
    path: '',
    component: DefectDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefectDetailsRoutingModule {}
