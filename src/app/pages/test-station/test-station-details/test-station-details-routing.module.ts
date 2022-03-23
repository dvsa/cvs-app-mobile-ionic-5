import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TestStationDetailsPage} from '@app/pages/test-station/test-station-details/test-station-details';

const routes: Routes = [
  {
    path: '',
    component: TestStationDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestStationDetailsRoutingModule {}
