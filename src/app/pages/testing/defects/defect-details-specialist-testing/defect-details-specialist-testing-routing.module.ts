import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DefectDetailsSpecialistTestingPage
} from '@app/pages/testing/defects/defect-details-specialist-testing/defect-details-specialist-testing';

const routes: Routes = [
  {
    path: '',
    component: DefectDetailsSpecialistTestingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefectDetailsSpecialistTestingRoutingModule {}
