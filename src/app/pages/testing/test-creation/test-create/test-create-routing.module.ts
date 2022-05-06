import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestCreatePage } from '@app/pages/testing/test-creation/test-create/test-create';

const routes: Routes = [
  {
    path: '',
    component: TestCreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestCreateRoutingModule {}
