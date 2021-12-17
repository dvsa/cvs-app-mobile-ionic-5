import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NativePluginsTestPage } from './native-plugins-test';

const routes: Routes = [
  {
    path: '',
    component: NativePluginsTestPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NativePluginsTestRoutingModule {}
