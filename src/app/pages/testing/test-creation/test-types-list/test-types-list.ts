import { Component, OnInit } from '@angular/core';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { TestTypesReferenceDataModel } from '@models/reference-data-models/test-types.model';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import {
  APP_STRINGS,
  PAGE_NAMES
} from '@app/app.enums';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'page-tests-types-list',
  templateUrl: 'test-types-list.html',
  styleUrls: ['test-types-list.scss']
})
export class TestTypesListPage implements OnInit {
  vehicleData: VehicleModel;
  testTypeReferenceData: TestTypesReferenceDataModel[];
  firstPage: boolean;
  previousPageName: string;
  backBtn: string;
  backBtnName: string;
  testTypeCategoryName: string;
  previousTestTypeName: string;

  constructor(
    private testTypeService: TestTypeService,
    private vehicleService: VehicleService,
    public commonFunctions: CommonFunctionsService,
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.vehicleData = this.router.getCurrentNavigation().extras.state.vehicleData;
      this.testTypeReferenceData = this.router.getCurrentNavigation().extras.state.testTypeData;
      this.previousTestTypeName = this.router.getCurrentNavigation().extras.state.previousTestTypeName;
      this.previousPageName = this.router.getCurrentNavigation().extras.state.previousPageName;
      this.testTypeCategoryName = this.router.getCurrentNavigation().extras.state.testTypeCategoryName;
      this.backBtn = this.router.getCurrentNavigation().extras.state.backBtn;
      if (this.testTypeReferenceData) {
        this.testTypeReferenceData = this.testTypeService.orderTestTypesArray(
          this.testTypeReferenceData,
          'sortId',
          'asc'
        );
      } else {
        this.getTestTypeRefByStorage();
      }
      this.firstPage = this.previousPageName !== PAGE_NAMES.TEST_TYPES_LIST_PAGE;

      if (this.firstPage) {
        this.backBtnName = APP_STRINGS.TEST_TYPE;
      } else {
        this.backBtnName = this.commonFunctions.capitalizeString(this.backBtn);
      }
    });
  }

  getTestTypeRefByStorage(): void {
    this.testTypeService
      .getTestTypesFromStorage()
      .subscribe((data: TestTypesReferenceDataModel[]) => {
        this.testTypeReferenceData = this.testTypeService.orderTestTypesArray(
          data,
          'sortId',
          'asc'
        );
      });
  }

  async selectedItem(testType: TestTypesReferenceDataModel, vehicleData: VehicleModel): Promise<void> {
    if (this.firstPage) {
      this.testTypeCategoryName = testType.name;
    }

    if (testType.nextTestTypesOrCategories) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      await this.router.navigate([PAGE_NAMES.TEST_TYPES_LIST_PAGE], {
        state: {
          vehicleData,
          testTypeData: testType.nextTestTypesOrCategories,
          previousTestTypeName: testType.name,
          previousPageName: PAGE_NAMES.TEST_TYPES_LIST_PAGE,
          testTypeCategoryName: this.testTypeCategoryName,
          backBtn: this.previousTestTypeName || APP_STRINGS.TEST_TYPE
        }
      });
    } else {
      testType.name = this.testTypeCategoryName;
      const test = this.testTypeService.createTestType(
        testType,
        this.vehicleData.techRecord.vehicleType
      );
      test.testTypeCategoryName = this.testTypeCategoryName;
      this.vehicleService.addTestType(vehicleData, test);
      await this.navCtrl.navigateBack(PAGE_NAMES.TEST_CREATE_PAGE);
    }
  }

  async cancelTypes() {
    await this.navCtrl.pop();
  }

  canDisplay(addedTestsIds: string[], testToDisplay: TestTypesReferenceDataModel | any): boolean {
    return addedTestsIds.every((elem) =>
      testToDisplay.linkedIds ? testToDisplay.linkedIds.indexOf(elem) > -1 : true
    );
  }

  canDisplayCategory(
    testTypeCategory: TestTypesReferenceDataModel,
    addedTestTypesIds: string[]
  ): boolean {
    let displayable = false;
    if (testTypeCategory.nextTestTypesOrCategories) {
      for (const elem of testTypeCategory.nextTestTypesOrCategories) {
        if (elem.nextTestTypesOrCategories) {
          displayable = this.canDisplayCategory(elem, addedTestTypesIds);
        } else {
          if (addedTestTypesIds.indexOf(elem.id) === -1) {displayable = true;}
        }
      }
      return displayable;
    }
    return addedTestTypesIds.indexOf(testTypeCategory.id) === -1;
  }

  addedTestTypesIds(vehicleData: VehicleModel): string[] {
    const addedIds = [];
    for (const testType of vehicleData.testTypes) {
      addedIds.push(testType.testTypeId);
    }
    return addedIds;
  }
}
