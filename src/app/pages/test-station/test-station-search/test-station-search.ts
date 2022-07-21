import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import { TestStationService } from '@providers/test-station/test-station.service';
import { ANALYTICS_SCREEN_NAMES, APP, PAGE_NAMES } from '@app/app.enums';
import { AnalyticsService } from '@providers/global';
import {EventsService} from '@providers/events/events.service';
import {Router} from '@angular/router';

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

  constructor(
    public events: EventsService,
    private testStationService: TestStationService,
    private analyticsService: AnalyticsService,
    private zone: NgZone,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getTestStations();
  }

  async ionViewDidEnter() {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_STATION_SEARCH);
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

  async openTestStation(testStation: TestStationReferenceDataModel): Promise<void> {
    await this.router.navigate([PAGE_NAMES.TEST_STATION_DETAILS_PAGE], {state: {testStation}});

    this.clearSearch();
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
    this.searchVal = '';
    this.filteredTestStations = this.testStationService.sortAndSearchTestStation(
      this.testStations,
      this.searchVal,
      ['testStationName']
    );
  }
}
