import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { VehicleLookupSearchCriteriaData } from '../../../../../assets/app-data/vehicle-lookup-search-criteria/vehicle-lookup-search-criteria.data';

export interface SearchCriteriaItemModel {
  text: string;
  isChecked: boolean;
}

@IonicPage()
@Component({
  selector: 'page-vehicle-lookup-search-criteria-selection',
  templateUrl: 'vehicle-lookup-search-criteria-selection.html'
})
export class VehicleLookupSearchCriteriaSelectionPage implements OnInit {
  selectedSearchCriteria: string;
  trailersOnly: boolean;
  searchCriteriaList: SearchCriteriaItemModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.selectedSearchCriteria = this.navParams.get('selectedSearchCriteria');
    this.trailersOnly = this.navParams.get('trailersOnly');
  }

  ngOnInit(): void {
    this.searchCriteriaList = this.trailersOnly
      ? this.getFormattedSearchCriteriaList(
          VehicleLookupSearchCriteriaData.VehicleLookupSearchCriteriaTrailersOnly
        )
      : this.getFormattedSearchCriteriaList(
          VehicleLookupSearchCriteriaData.VehicleLookupSearchCriteria
        );
  }

  getFormattedSearchCriteriaList(
    notFormattedSearchCriteriaList: string[]
  ): SearchCriteriaItemModel[] {
    return notFormattedSearchCriteriaList.map((searchCriteriaValue) => {
      return {
        text: searchCriteriaValue,
        isChecked: this.selectedSearchCriteria === searchCriteriaValue
      };
    });
  }

  onCheck(searchCriteria: string): void {
    this.selectedSearchCriteria = searchCriteria;
    this.searchCriteriaList.map((searchCriteriaItem) => {
      searchCriteriaItem.isChecked = this.selectedSearchCriteria === searchCriteriaItem.text;
    });
  }

  onSave(): void {
    this.viewCtrl.dismiss({ selectedSearchCriteria: this.selectedSearchCriteria });
  }
}
