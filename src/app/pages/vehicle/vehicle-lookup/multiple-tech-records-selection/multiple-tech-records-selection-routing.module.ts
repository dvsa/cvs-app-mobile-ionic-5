import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MultipleTechRecordsSelectionPage
} from '@app/pages/vehicle/vehicle-lookup/multiple-tech-records-selection/multiple-tech-records-selection';

const routes: Routes = [
  {
    path: '',
    component: MultipleTechRecordsSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleTechRecordsSelectionRoutingModule {}
