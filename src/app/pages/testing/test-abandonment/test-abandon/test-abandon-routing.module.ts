import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestAbandonPage } from '@app/pages/testing/test-abandonment/test-abandon/test-abandon';

const routes: Routes = [
  {
    path: '',
    component: TestAbandonPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestAbandonRoutingModule {}
