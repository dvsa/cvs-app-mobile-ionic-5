import { Component, OnInit } from '@angular/core';
import { DefectsService } from '@providers/defects/defects.service';
import { APP, APP_STRINGS, PAGE_NAMES } from '@app/app.enums';
import { TestTypeModel } from '@models/tests/test-type.model';
import { DefectCategoryReferenceDataModel } from '@models/reference-data-models/defects.reference-model';
import { Router } from '@angular/router';
import { EventsService } from '@providers/events/events.service';

@Component({
  selector: 'page-add-defect-category',
  templateUrl: 'add-defect-category.html',
  styleUrls: ['add-defect-category.scss'],
})
export class AddDefectCategoryPage implements OnInit {
  vehicleType: string;
  vehicleTest: TestTypeModel;
  defectCategories: DefectCategoryReferenceDataModel[];
  filteredCategories: DefectCategoryReferenceDataModel[];
  fromTestReview: boolean;
  searchVal = '';
  focusOut = false;
  appStrings = APP_STRINGS;
  testTypeName: string;

  constructor(
    public events: EventsService,
    private defectsService: DefectsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.vehicleType = this.router.getCurrentNavigation().extras.state.vehicleType;
    this.vehicleTest = this.router.getCurrentNavigation().extras.state.vehicleTest;
    this.defectCategories = this.router.getCurrentNavigation().extras.state.defects;
    this.fromTestReview = this.router.getCurrentNavigation().extras.state.fromTestReview;
    this.filteredCategories = this.populateCategoriesArray();
  }

  ionViewWillEnter() {
  }

  async selectCategory(category: DefectCategoryReferenceDataModel): Promise<void> {
    this.focusOut = false;
    await this.router.navigate([PAGE_NAMES.ADD_DEFECT_CATEGORY_PAGE], {
      state: {
        vehicleType: this.vehicleType,
        vehicleTest: this.vehicleTest,
        category,
        fromTestReview: this.fromTestReview
      }
    });
    this.events.publish(APP.NAV_OUT);
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredCategories = this.populateCategoriesArray();
  }

  private populateCategoriesArray(): DefectCategoryReferenceDataModel[] {
    const filteredArr = this.defectsService.searchDefect(this.defectCategories, this.searchVal, [
      'imNumber',
      'imDescription'
    ]);
    return this.defectsService.orderDefectsArray(filteredArr, 'imNumber', 'asc');
  }
}
