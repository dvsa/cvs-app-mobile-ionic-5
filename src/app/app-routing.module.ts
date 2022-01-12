import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {PAGE_NAMES} from '@app/app.enums';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
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
    path: PAGE_NAMES.TEST_STATION_SEARCH_PAGE,
    loadChildren: () => import('./pages/test-station/test-station-search/test-station-search.module').then((m) => m.TestStationSearchModule)
  },
  {
    path: PAGE_NAMES.SIGNATURE_PAD_PAGE,
    loadChildren: () => import('./pages/signature-pad/signature-pad.module').then( m => m.SignaturePadPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
