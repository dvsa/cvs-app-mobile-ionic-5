import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PAGE_NAMES } from '@app/app.enums';
import { VehicleCheckGuard } from '@app/guards/vehicle-check.guard';

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
  {
    path: PAGE_NAMES.TEST_STATION_DETAILS_PAGE,
    loadChildren: () => import('./pages/test-station/test-station-details/test-station-details.module')
      .then( m => m.TestStationDetailsModule)
  },
  {
    path: PAGE_NAMES.VISIT_TIMELINE_PAGE,
    loadChildren: () => import('./pages/visit/visit-timeline/visit-timeline.module')
      .then( m => m.VisitTimelineModule)
  },
  {
    path: PAGE_NAMES.VISIT_CONFIRMATION_PAGE,
    loadChildren: () => import('./pages/visit/visit-confirmation/visit-confirmation.module')
      .then( m => m.VisitConfirmationModule )
  },
  {
    path: PAGE_NAMES.VEHICLE_LOOKUP_PAGE,
    loadChildren: () => import('./pages/vehicle/vehicle-lookup/vehicle-lookup.module')
      .then( m => m.VehicleLookupModule)
  },
  {
    path: PAGE_NAMES.MULTIPLE_TECH_RECORDS_SELECTION,
    loadChildren: () => import('./pages/vehicle/vehicle-lookup/multiple-tech-records-selection/multiple-tech-records-selection.module')
      .then( m => m.MultipleTechRecordsSelectionModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_LOOKUP_SEARCH_CRITERIA_SELECTION,
    loadChildren: () =>
      import('./pages/vehicle/vehicle-lookup/vehicle-lookup-search-criteria-selection/vehicle-lookup-search-criteria-selection.module')
      .then( m => m.VehicleLookupSearchCriteriaSelectionPageModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_DETAILS_PAGE,
    loadChildren: () => import('./pages/vehicle/vehicle-details/vehicle-details.module')
      .then( m => m.VehicleDetailsModule)
  },
  {
    path: PAGE_NAMES.TEST_CREATE_PAGE,
    loadChildren: () => import('./pages/testing/test-creation/test-create/test-create.module')
        .then( m => m.TestCreateModule),
    canActivate: [VehicleCheckGuard]
  },
  {
    path: PAGE_NAMES.TEST_CANCEL_PAGE,
    loadChildren: () => import('./pages/testing/test-creation/test-cancel/test-cancel.module')
        .then( m => m.TestCancelModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
