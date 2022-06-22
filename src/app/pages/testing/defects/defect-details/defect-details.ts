import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  NavController,
} from '@ionic/angular';
import {
  AdditionalInfoMetadataModel,
  DefectDetailsModel,
  DefectLocationModel
} from '@models/defects/defect-details.model';
import { DefectsService } from '@providers/defects/defects.service';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestTypeService } from '@providers/test-type/test-type.service';
import {
  APP_STRINGS,
  DEFICIENCY_CATEGORY,
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL, PAGE_NAMES
} from '@app/app.enums';
import { ProhibitionClearanceTestTypesData } from '@assets/app-data/test-types-data/prohibition-clearance-test-types.data';
import { TestTypesFieldsMetadata } from '@assets/app-data/test-types-data/test-types-fields.metadata';
import { AnalyticsService } from '@providers/global';
import { Router } from '@angular/router';

@Component({
  selector: 'page-defect-details',
  templateUrl: 'defect-details.html',
  styleUrls: ['defect-details.scss'],

})
export class DefectDetailsPage implements OnInit {
  vehicleTest: TestTypeModel;
  defect: DefectDetailsModel;
  defectMetadata: AdditionalInfoMetadataModel;
  isEdit: boolean;
  isLocation: boolean;
  tempDefectLocation: DefectLocationModel;
  tempDefectNotes: string;
  tempPrs: boolean;
  fromTestReview: boolean;
  showPrs = true;
  notesChanged= false;
  showProhibition = false;
  prohibitionAsterisk = false;
  prohibitionClearanceTestTypesIds: string[] =
    ProhibitionClearanceTestTypesData.ProhibitionClearanceTestTypesIds;
  isProhibitionClearance: boolean;
  appStrings = APP_STRINGS;

  constructor(
    public navCtrl: NavController,
    public defectsService: DefectsService,
    private testTypeService: TestTypeService,
    private analyticsService: AnalyticsService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.vehicleTest = this.router.getCurrentNavigation().extras.state.vehicleTest;
    this.defect = this.router.getCurrentNavigation().extras.state.deficiency;
    this.isEdit = this.router.getCurrentNavigation().extras.state.isEdit;
    this.fromTestReview = this.router.getCurrentNavigation().extras.state.fromTestReview;

    this.tempDefectLocation = Object.assign({}, this.defect.additionalInformation.location);
    this.tempDefectNotes = this.defect.additionalInformation.notes;
    this.defectMetadata = this.defect.metadata.category.additionalInfo;
    this.tempPrs = this.defect.prs;
    this.isLocation =
      this.defectMetadata && this.defectMetadata.location
        ? this.checkForLocation(this.defectMetadata.location)
        : false;
    this.checkForPrs(this.defect);
    this.checkForProhibition(this.defect);
  }

  ionViewWillEnter() {
    this.isProhibitionClearance =
      this.prohibitionClearanceTestTypesIds.indexOf(this.vehicleTest.testTypeId) !== -1;
  }

  async goBack() {
    this.defect.additionalInformation.location = Object.assign({}, this.tempDefectLocation);
    this.defect.additionalInformation.notes = this.tempDefectNotes;
    this.defect.prs = this.tempPrs;
    if (this.isEdit) {
      await this.navCtrl.navigateBack([PAGE_NAMES.TEST_COMPLETE_PAGE]);
    } else {
      await this.navCtrl.navigateBack([PAGE_NAMES.ADD_DEFECT_PAGE]);
    }
  }

  async addDefect(): Promise<void> {
    // @TODO - I don't think this is needed anymore
    // if (!this.fromTestReview) {
    //   if (!this.isEdit) {
    //     await this.testTypeService.addDefect(this.vehicleTest, this.defect);
    //   }
    //   await this.navCtrl.navigateBack([PAGE_NAMES.TEST_COMPLETE_PAGE]);
    // } else {
      if (!this.isEdit) {
        await this.testTypeService.addDefect(this.vehicleTest, this.defect);
      }
      await this.navCtrl.navigateBack([PAGE_NAMES.TEST_COMPLETE_PAGE]);
    // }

    if (this.notesChanged) {
      await this.onNotesChanged();
    }
  }

  private getTestTypeDetailsFromFieldsMetadata(testTypeModel: TestTypeModel) {
    return TestTypesFieldsMetadata.FieldsMetadata.find(
      (fieldsMetadata) => testTypeModel.testTypeId === fieldsMetadata.testTypeId
    );
  }

  checkForLocation(location: any): boolean {
    for (const type in location) {
      if (location[type]) {
        return true;
      }
    }
    return false;
  }

  checkIfDefectWasAdded(): boolean {
    let found = false;
    this.vehicleTest.defects.forEach((defect) => {
      if (defect.deficiencyRef === this.defect.deficiencyRef) {
        found = true;
      }
    });
    return found;
  }

  checkForPrs(defect: any): void {
    if (defect.deficiencyCategory === DEFICIENCY_CATEGORY.MINOR) {
      this.showPrs = false;
      defect.prs = null;
    }
  }

  checkForProhibition(defect: any): void {
    if (defect.deficiencyCategory === DEFICIENCY_CATEGORY.DANGEROUS) {
      this.showProhibition = true;
      if (this.defect.stdForProhibition) {
        this.prohibitionAsterisk = true;
      }
    }
  }

  async checkProhibitionStatus(): Promise<void> {
    if (this.showProhibition && !this.isProhibitionClearance) {
      if (!this.prohibitionAsterisk && !this.defect.prohibitionIssued) {
        await this.showProhibitionAlert(APP_STRINGS.PROHIBITION_MSG_CONFIRM);
      } else {
        await this.addDefect();
      }
    } else {
      await this.addDefect();
    }
  }

  async showProhibitionAlert(showThisMessage: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: APP_STRINGS.PROHIBITION_TITLE,
      message: showThisMessage,
      buttons: [
        {
          text: APP_STRINGS.OK
        }
      ]
    });
    await alert.present();
  }

  async removeDefectConfirm(defect: DefectDetailsModel): Promise<void> {
    const confirm = await this.alertCtrl.create({
      header: APP_STRINGS.REMOVE_DEFECT_TITLE,
      message: APP_STRINGS.REMOVE_DEFECT_MSG,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          handler: () => {}
        },
        {
          text: APP_STRINGS.REMOVE,
          handler: async () => {
            await this.removeDefect(defect);
          }
        }
      ]
    });
    await confirm.present();
  }

  async removeDefect(defect: DefectDetailsModel): Promise<void> {
    await this.testTypeService.removeDefect(this.vehicleTest, defect);
    await this.navCtrl.navigateBack([PAGE_NAMES.TEST_COMPLETE_PAGE]);
  }

  private async onNotesChanged() {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.DEFECTS,
      event: ANALYTICS_EVENTS.DEFECT_NOTES_USAGE,
      label: ANALYTICS_LABEL.DEFICIENCY_REFERENCE
    });

    await this.analyticsService.addCustomDimension(
      Object.keys(ANALYTICS_LABEL).indexOf('DEFICIENCY_REFERENCE') + 1,
      this.defect.deficiencyRef
    );
  }
}
