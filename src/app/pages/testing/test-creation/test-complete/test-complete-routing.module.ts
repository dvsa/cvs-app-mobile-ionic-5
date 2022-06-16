import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestCompletePage } from '@app/pages/testing/test-creation/test-complete/test-complete';

const routes: Routes = [
  {
    path: '',
    component: TestCompletePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestCompleteRoutingModule {}
