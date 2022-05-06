import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestCancelPage } from '@app/pages/testing/test-creation/test-cancel/test-cancel';

const routes: Routes = [
  {
    path: '',
    component: TestCancelPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestCancelRoutingModule {}
