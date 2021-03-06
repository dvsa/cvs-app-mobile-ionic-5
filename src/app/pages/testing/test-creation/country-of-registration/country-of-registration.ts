import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CountryOfRegistrationData } from '@assets/app-data/country-of-registration/country-of-registration.data';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VisitService } from '@providers/visit/visit.service';
import { APP } from '@app/app.enums';
import { EventsService } from '@providers/events/events.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'page-country-of-registration',
  templateUrl: 'country-of-registration.html',
  styleUrls: ['country-of-registration.scss']
})
export class CountryOfRegistrationPage implements OnInit {
  @ViewChild('searchBar') searchBar;
  searchVal = '';
  topElem = [];
  botElem = [];
  notApplicableElem = [];
  countriesArr = [];
  filteredCountries = [];
  groupedCountries = [];
  @Input() vehicle: VehicleModel;

  constructor(
    private commonFunctionsService: CommonFunctionsService,
    private visitService: VisitService,
    private events: EventsService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit(): void {
    this.countriesArr = CountryOfRegistrationData.CountryData;
    this.topElem = this.countriesArr.splice(0, 1);
    this.botElem = this.countriesArr.splice(this.countriesArr.length - 3, 2);
    this.notApplicableElem = this.countriesArr.splice(this.countriesArr.length - 1, 1);
    this.resetFilteredCountries();
  }

  filterCountries(searchVal: string) {
    this.filteredCountries = this.commonFunctionsService.searchFor(this.countriesArr, searchVal, [
      'key',
      'value'
    ]);
  }

  resetFilteredCountries() {
    this.filterCountries(this.searchVal);
    this.filteredCountries.sort(this.commonFunctionsService.orderBy('value', 'asc'));
    this.groupedCountries = this.commonFunctionsService.groupArrayAlphabetically(
      this.filteredCountries,
      'value'
    );
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.resetFilteredCountries();
  }

  setVehicleRegCountry(regCountryItem) {
    this.vehicle.countryOfRegistration = regCountryItem.key;
  }

  async onSave() {
    await this.visitService.updateVisit();
    await this.modalCtrl.dismiss();
  }
}
