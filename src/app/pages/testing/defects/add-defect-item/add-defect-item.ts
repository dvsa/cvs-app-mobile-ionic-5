import { Component, OnInit } from '@angular/core';
import { DefectsService } from '@providers/defects/defects.service';
import { APP, APP_STRINGS, PAGE_NAMES } from '@app/app.enums';
import { TestTypeModel } from '@models/tests/test-type.model';
import {
  DefectCategoryReferenceDataModel,
  DefectItemReferenceDataModel
} from '@models/reference-data-models/defects.reference-model';
import { Router } from '@angular/router';
import { EventsService } from '@providers/events/events.service';

@Component({
  selector: 'page-add-defect-item',
  templateUrl: 'add-defect-item.html',
  styleUrls: ['add-defect-item.scss'],
})
export class AddDefectItemPage implements OnInit {
  vehicleType: string;
  vehicleTest: TestTypeModel;
  category: DefectCategoryReferenceDataModel;
  filteredItems: DefectItemReferenceDataModel[];
  fromTestReview: boolean;
  searchVal = '';
  appStrings = APP_STRINGS;

  constructor(
    private events: EventsService,
    private defectsService: DefectsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.vehicleType = this.router.getCurrentNavigation().extras.state.vehicleType;
    this.vehicleTest = this.router.getCurrentNavigation().extras.state.vehicleTest;
    this.category = this.router.getCurrentNavigation().extras.state.category;
    this.fromTestReview = this.router.getCurrentNavigation().extras.state.fromTestReview;
    this.filteredItems = this.populateItemsArray();
  }

  async selectItem(item: DefectItemReferenceDataModel): Promise<void> {
    await this.router.navigate([PAGE_NAMES.ADD_DEFECT_PAGE], {
      state: {
        vehicleType: this.vehicleType,
        vehicleTest: this.vehicleTest,
        category: this.category,
        item,
        fromTestReview: this.fromTestReview
      }
    });
    this.events.publish(APP.NAV_OUT);
  }

  searchList(e): void {
    this.searchVal = e.target.value;
    this.filteredItems = this.populateItemsArray();
  }

  private populateItemsArray(): DefectItemReferenceDataModel[] {
    const filteredArr = this.defectsService.searchDefect(this.category.items, this.searchVal, [
      'itemNumber',
      'itemDescription'
    ]);
    return this.defectsService.orderDefectsArray(filteredArr, 'itemNumber', 'asc');
  }
}
