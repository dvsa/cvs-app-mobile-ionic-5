import { Component, OnInit } from '@angular/core';
import { DefectsService } from '@providers/defects/defects.service';
import { APP, DEFICIENCY_CATEGORY, APP_STRINGS, PAGE_NAMES } from '@app/app.enums';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { TestTypeModel } from '@models/tests/test-type.model';
import {
  DefectCategoryReferenceDataModel,
  DefectDeficiencyReferenceDataModel,
  DefectItemReferenceDataModel
} from '@models/reference-data-models/defects.reference-model';
import { EventsService } from '@providers/events/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-add-defect',
  templateUrl: 'add-defect.html',
  styleUrls: ['add-defect.scss'],
})
export class AddDefectPage implements OnInit {
  vehicleType: string;
  vehicleTest: TestTypeModel;
  category: DefectCategoryReferenceDataModel;
  item: DefectItemReferenceDataModel;
  filteredDeficiencies: DefectDeficiencyReferenceDataModel[];
  fromTestReview: boolean;
  searchVal = '';
  appStrings = APP_STRINGS;

  constructor(
    private events: EventsService,
    public defectsService: DefectsService,
    private router: Router,
    public commonFunc: CommonFunctionsService
  ) {
  }

  ngOnInit() {
    this.vehicleType = this.router.getCurrentNavigation().extras.state.vehicleType;
    this.vehicleTest = this.router.getCurrentNavigation().extras.state.vehicleTest;
    this.category = this.router.getCurrentNavigation().extras.state.category;
    this.item = this.router.getCurrentNavigation().extras.state.item;
    this.fromTestReview = this.router.getCurrentNavigation().extras.state.fromTestReview;
    this.filteredDeficiencies = this.populateDeficienciesArray();
  }

  async selectDeficiency(deficiency: DefectDeficiencyReferenceDataModel): Promise<void> {
    const defect = this.defectsService.createDefect(
      this.category,
      this.item,
      deficiency,
      this.vehicleType,
      false
    );

    await this.router.navigate([PAGE_NAMES.DEFECT_DETAILS_PAGE], {
      state: {
        vehicleTest: this.vehicleTest,
        deficiency: defect,
        isEdit: false,
        fromTestReview: this.fromTestReview
      }
    });
  }

  async addAdvisory(): Promise<void> {
    const advisory = this.defectsService.createDefect(
      this.category,
      this.item,
      null,
      this.vehicleType,
      true
    );

    await this.router.navigate([PAGE_NAMES.ADVISORY_DETAILS_PAGE], {
      state: {
        vehicleTest: this.vehicleTest,
        advisory,
        isEdit: false
      }
    });
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredDeficiencies = this.populateDeficienciesArray();
  }

  returnBadgeClass(deficiencyCategory): string {
    return deficiencyCategory === this.commonFunc.capitalizeString(DEFICIENCY_CATEGORY.MINOR)
      ? 'badge-text-black'
      : '';
  }

  private populateDeficienciesArray(): DefectDeficiencyReferenceDataModel[] {
    const filteredArr = this.defectsService.searchDefect(this.item.deficiencies, this.searchVal, [
      'deficiencyId',
      'deficiencyText'
    ]);
    return this.defectsService.orderDefectsArray(filteredArr, 'deficiencyId', 'asc');
  }
}
