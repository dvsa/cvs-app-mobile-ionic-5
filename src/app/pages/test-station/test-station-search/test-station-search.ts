import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import { TestStationService } from '@providers/test-station/test-station.service';
import { ANALYTICS_SCREEN_NAMES, APP } from '@app/app.enums';
import { AnalyticsService } from '@providers/global';
import {EventsService} from '@providers/events/events.service';

@Component({
  selector: 'page-test-station-search',
  templateUrl: 'test-station-search.html',
  styleUrls: ['test-station-search.scss'],
})
export class TestStationSearchPage implements OnInit {
  @ViewChild('searchBar') searchBar;
  testStations: TestStationReferenceDataModel[] = [];
  filteredTestStations: any[] = [];
  searchVal = '';
  focusOut = false;

  constructor(
    public events: EventsService,
    private testStationService: TestStationService,
    private analyticsService: AnalyticsService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    this.getTestStations();
  }

  ionViewDidEnter() {
    this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_STATION_SEARCH);
  }

  getTestStations(): void {
    this.testStationService
      .getTestStationsFromStorage()
      .subscribe((testStations: TestStationReferenceDataModel[]) => {
        this.testStations = this.filteredTestStations = this.testStationService.sortAndSearchTestStation(
          testStations,
          this.searchVal,
          ['testStationName']
        );
      });
  }

  // @TODO - Ionic 5 Replace Navigation to test station details page when ready
  openTestStation(testStation: TestStationReferenceDataModel): void {
    // this.navCtrl.push('TestStationDetailsPage', { testStation: testStation }).then(() => {
    this.clearSearch();
    this.focusOut = false;
    // });
  }

  boldSearchVal(str: string, find: string): string {
    return this.testStationService.boldSearchVal(str, find);
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.zone.run(() => {
      this.filteredTestStations = this.testStationService.sortAndSearchTestStation(
        this.testStations,
        this.searchVal,
        ['testStationName', 'testStationPNumber', 'testStationAddress']
      );
    });
  }

  clearSearch(): void {
    this.events.publish(APP.NAV_OUT);
    this.searchVal = '';
    this.filteredTestStations = this.testStationService.sortAndSearchTestStation(
      this.testStations,
      this.searchVal,
      ['testStationName']
    );
  }

  keepCancelOn(ev, hideCancel?: boolean) {
    this.zone.run(() => (this.focusOut = !hideCancel));
  }
}
