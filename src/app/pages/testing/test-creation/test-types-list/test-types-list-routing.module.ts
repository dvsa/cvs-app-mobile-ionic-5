import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestTypesListPage } from '@app/pages/testing/test-creation/test-types-list/test-types-list';

const routes: Routes = [
  {
    path: '',
    component: TestTypesListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestTypesListRoutingModule {}
