import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VisitConfirmationPage} from '@app/pages/visit/visit-confirmation/visit-confirmation';

const routes: Routes = [
  {
    path: '',
    component: VisitConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitConfirmationRoutingModule {}
