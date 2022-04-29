import {Component, Input, OnInit} from '@angular/core';
import {ModalController } from '@ionic/angular';
import {
  VehicleLookupSearchCriteriaData
} from '@assets/app-data/vehicle-lookup-search-criteria/vehicle-lookup-search-criteria.data';

export interface SearchCriteriaItemModel {
  text: string;
  isChecked: boolean;
}

@Component({
  selector: 'page-vehicle-lookup-search-criteria-selection',
  templateUrl: 'vehicle-lookup-search-criteria-selection.html',
  styleUrls: ['vehicle-lookup-search-criteria-selection.scss']
})
export class VehicleLookupSearchCriteriaSelectionPage implements OnInit {
  @Input() selectedSearchCriteria: string;
  @Input() trailersOnly: boolean;
  searchCriteriaList: SearchCriteriaItemModel[];

  constructor(
    private modalCtrl: ModalController,
  ) {}

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
    return notFormattedSearchCriteriaList.map((searchCriteriaValue) => ({
        text: searchCriteriaValue,
        isChecked: this.selectedSearchCriteria === searchCriteriaValue
      }));
  }

  onCheck(searchCriteria: string): void {
    this.selectedSearchCriteria = searchCriteria;
    this.searchCriteriaList.map((searchCriteriaItem) => {
      searchCriteriaItem.isChecked = this.selectedSearchCriteria === searchCriteriaItem.text;
    });
  }

  async onSave(): Promise<void> {
    await this.modalCtrl.dismiss(this.selectedSearchCriteria);
  }
}
