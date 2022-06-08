import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReasonsSelectionPage } from '@app/pages/testing/test-abandonment/reasons-selection/reasons-selection';

const routes: Routes = [
  {
    path: '',
    component: ReasonsSelectionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReasonsSelectionRoutingModule {}
