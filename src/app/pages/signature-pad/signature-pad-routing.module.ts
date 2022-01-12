import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignaturePadPage } from './signature-pad';

const routes: Routes = [
  {
    path: '',

    component: SignaturePadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignaturePadPageRoutingModule {}
