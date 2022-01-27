import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestStationSearchPage } from '@app/pages/test-station/test-station-search/test-station-search';

const routes: Routes = [
  {
    path: '',
    component: TestStationSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestingStationSearchRoutingModule {}
