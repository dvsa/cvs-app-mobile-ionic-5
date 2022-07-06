import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDefectPage } from '@app/pages/testing/defects/add-defect/add-defect';

const routes: Routes = [
  {
    path: '',
    component: AddDefectPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDefectRoutingModule {}
