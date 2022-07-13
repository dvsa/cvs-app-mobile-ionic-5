import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  TestTypeDetailsInputPage
} from '@app/pages/testing/test-creation/test-type-details-input/test-type-details-input';

const routes: Routes = [
  {
    path: '',
    component: TestTypeDetailsInputPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestTypeDetailsInputRoutingModule {}
