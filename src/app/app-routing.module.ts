import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PAGE_NAMES } from '@app/app.enums';

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
    loadChildren: () => import('./pages/test-station/test-station-home/test-station-home.module')
      .then((m) => m.TestStationHomeModule)
  },
  {
    path: PAGE_NAMES.TEST_STATION_SEARCH_PAGE,
    loadChildren: () => import('./pages/test-station/test-station-search/test-station-search.module')
      .then((m) => m.TestStationSearchModule)
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
      .then( m => m.VehicleLookupSearchCriteriaSelectionModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_DETAILS_PAGE,
    loadChildren: () => import('./pages/vehicle/vehicle-details/vehicle-details.module')
      .then( m => m.VehicleDetailsModule)
  },
  {
    path: PAGE_NAMES.TEST_CREATE_PAGE,
    loadChildren: () => import('./pages/testing/test-creation/test-create/test-create.module')
        .then( m => m.TestCreateModule)
  },
  {
    path: PAGE_NAMES.TEST_CANCEL_PAGE,
    loadChildren: () => import('./pages/testing/test-creation/test-cancel/test-cancel.module')
        .then( m => m.TestCancelModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_HISTORY_PAGE,
    loadChildren: () =>
      import('./pages/vehicle/vehicle-history/vehicle-history.module')
        .then( m => m.VehicleHistoryModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_WEIGHTS_PAGE,
    loadChildren: () =>
      import('./pages/vehicle/vehicle-weights/vehicle-weights.module')
        .then( m => m.VehicleWeightsModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_TYRES_PAGE,
    loadChildren: () =>
      import('./pages/vehicle/vehicle-tyres/vehicle-tyres.module')
        .then( m => m.VehicleTyresModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_ADDITIONAL_PAGE,
    loadChildren: () =>
      import('./pages/vehicle/vehicle-additional/vehicle-additional.module')
        .then( m => m.VehicleAdditionalModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_BRAKES_PAGE,
    loadChildren: () =>
      import('./pages/vehicle/vehicle-brakes/vehicle-brakes.module')
        .then( m => m.VehicleBrakesModule)
  },
  {
    path: PAGE_NAMES.VEHICLE_HISTORY_DETAILS_PAGE,
    loadChildren: () => import('./pages/vehicle/vehicle-history-details/vehicle-history-details.module')
      .then( m => m.VehicleHistoryDetailsModule)
  },
  {
    path: PAGE_NAMES.TEST_TYPES_LIST_PAGE,
    loadChildren: () =>
      import('./pages/testing/test-creation/test-types-list/test-types-list.module')
        .then( m => m.TestTypesListModule)
  },
  {
    path: PAGE_NAMES.ODOMETER_READING_PAGE,
    loadChildren: () => import('./pages/testing/test-creation/odometer-reading/odometer-reading.module')
      .then( m => m.OdometerReadingPageModule)
  },
  {
    path: PAGE_NAMES.COUNTRY_OF_REGISTRATION_PAGE,
    loadChildren: () =>
      import('./pages/testing/test-creation/country-of-registration/country-of-registration.module')
        .then(m => m.CountryOfRegistrationModule)
  },
  {
    path: PAGE_NAMES.EU_VEHICLE_CATEGORY_PAGE,
    loadChildren: () =>
      import('./pages/testing/test-creation/eu-vehicle-category/eu-vehicle-category.module')
        .then( m => m.EuVehicleCategoryPageModule)
  },
  {
    path: PAGE_NAMES.TEST_COMPLETE_PAGE,
    loadChildren: () =>
      import('./pages/testing/test-creation/test-complete/test-complete.module')
        .then(m => m.TestCompleteModule)
  },
  {
    path: PAGE_NAMES.REASONS_SELECTION_PAGE,
    loadChildren: () =>
      import('./pages/testing/test-abandonment/reasons-selection/reasons-selection.module')
        .then( m => m.ReasonsSelectionModule)
  },
  {
    path: PAGE_NAMES.TEST_ABANDON_PAGE,
    loadChildren: () =>
      import('./pages/testing/test-abandonment/test-abandon/test-abandon.module')
        .then( m => m.TestAbandonModule)
  },
  {
    path: PAGE_NAMES.ADD_DEFECT_CATEGORY_PAGE,
    loadChildren: () =>
      import('./pages/testing/defects/add-defect-category/add-defect-category.module')
        .then( m => m.AddDefectCategoryModule)
  },
  {
    path: PAGE_NAMES.ADD_DEFECT_ITEM_PAGE,
    loadChildren: () =>
      import('./pages/testing/defects/add-defect-item/add-defect-item.module')
        .then( m => m.AddDefectItemModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
