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
    path: PAGE_NAMES.NATIVE_PLUGIN_TEST_PAGE,
    loadChildren: () => import('./pages/native-plugins-test/native-plugins-test.module').then( m => m.NativePluginsTestPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
