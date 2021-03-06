import { Component, OnInit } from '@angular/core';
import { AbandonmentReasonItemModel } from '@models/tests/abandonment-reason-item.model';
import { TestAbandonmentReasonsData } from '@assets/app-data/abandon-data/test-abandonment-reasons.data';
import { TestTypeModel } from '@models/tests/test-type.model';
import { APP_STRINGS, PAGE_NAMES, VEHICLE_TYPE } from '@app/app.enums';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-reasons-selection',
  templateUrl: 'reasons-selection.html',
  styleUrls: ['reasons-selection.scss']
})
export class ReasonsSelectionPage implements OnInit{
  vehicleTest: TestTypeModel;
  vehicleType: string;
  selectedReasons: string[] = [];
  reasonsList: AbandonmentReasonItemModel[];
  fromTestReview: boolean;
  APP_STRINGS: typeof APP_STRINGS = APP_STRINGS;

  constructor(
    private testTypeService: TestTypeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vehicleTest = this.router.getCurrentNavigation().extras.state.vehicleTest;
    this.vehicleType = this.router.getCurrentNavigation().extras.state.vehicleType;
    this.fromTestReview = this.router.getCurrentNavigation().extras.state.fromTestReview;
  }

  ionViewWillEnter() {
    this.reasonsList = this.transformReasons(this.vehicleType);
  }

  async onNext() {
    await this.router.navigate([PAGE_NAMES.TEST_ABANDON_PAGE], {
      state: {
        vehicleTest: this.vehicleTest,
        selectedReasons: this.selectedReasons,
        editMode: true,
        fromTestReview: this.fromTestReview
      }
    });
  }

  onCheck(reason: AbandonmentReasonItemModel) {
    reason.isChecked = !reason.isChecked;
    if (reason.isChecked) {
      this.selectedReasons.push(reason.text);
    } else {
      this.selectedReasons.splice(this.selectedReasons.indexOf(reason.text), 1);
    }
  }

  populateReasonList(vehicleType: string): string[] {
    let reasonsList: string[];
    if (this.testTypeService.isSpecialistTestType(this.vehicleTest.testTypeId)) {
      reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsSpecialistTestTypesData;
    } else {
      if (vehicleType === VEHICLE_TYPE.PSV) {
        reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsPsvData;
      } else {
        if (this.testTypeService.isTirTestType(this.vehicleTest.testTypeId)) {
          reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsTirTestTypesData;
        } else {
          reasonsList = TestAbandonmentReasonsData.TestAbandonmentReasonsHgvTrailerData;
        }
      }
    }
    return reasonsList;
  }

  transformReasons(vehicleType: string): { text: string; isChecked: boolean }[] {
    const reasonsList: string[] = this.populateReasonList(vehicleType);
    return reasonsList.map((reason) => ({
        text: reason,
        isChecked: false
      }));
  }
}
