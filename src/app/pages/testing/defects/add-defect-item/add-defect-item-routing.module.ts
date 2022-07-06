import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDefectItemPage } from '@app/pages/testing/defects/add-defect-item/add-defect-item';

const routes: Routes = [
  {
    path: '',
    component: AddDefectItemPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDefectItemRoutingModule {}
