import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDefectCategoryPage } from '@app/pages/testing/defects/add-defect-category/add-defect-category';

const routes: Routes = [
  {
    path: '',
    component: AddDefectCategoryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDefectCategoryRoutingModule {}
