import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestStationHomePage } from '@app/pages/test-station/test-station-home/test-station-home';

const routes: Routes = [
  {
    path: '',
    component: TestStationHomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestStationHomeRoutingModule {}
