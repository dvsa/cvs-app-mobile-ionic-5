import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationPage } from '@app/pages/visit/confirmation/confirmation';

const routes: Routes = [
  {
    path: '',
    component: ConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmationRoutingModule {}
