import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {PAGE_NAMES} from '@app/app.enums';

const routes: Routes = [
  {
    path: '',
    redirectTo: PAGE_NAMES.TEST_STATION_HOME_PAGE,
    pathMatch: 'full'
  },
  {
    path: PAGE_NAMES.TEST_STATION_HOME_PAGE,
    loadChildren: () => import('./pages/test-station/test-station-home/test-station-home.module').then((m) => m.TestStationHomeModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
