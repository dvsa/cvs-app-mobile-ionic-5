import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestReviewPage } from '@app/pages/testing/test-creation/test-review/test-review';

const routes: Routes = [
  {
    path: '',
    component: TestReviewPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestReviewRoutingModule {}
