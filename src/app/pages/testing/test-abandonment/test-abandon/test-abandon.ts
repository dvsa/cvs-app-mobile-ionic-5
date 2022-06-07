import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { TestTypeModel } from '@models/tests/test-type.model';
import { VisitService } from '@providers/visit/visit.service';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { AnalyticsService } from '@providers/global';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL
} from '@app/app.enums';

@Component({
  selector: 'page-test-abandon',
  templateUrl: 'test-abandon.html',
  styleUrls: ['test-abandon.scss']
})
export class TestAbandonPage implements OnInit {
  vehicleTest: TestTypeModel;
  selectedReasons: string[];
  additionalComment: string;
  editMode: string;
  altAbandon: boolean;
  fromTestReview: boolean;
  changeOpacity = false;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public visitService: VisitService,
    private analyticsService: AnalyticsService,
    private testTypeService: TestTypeService
  ) {
    this.vehicleTest = this.navParams.get('vehicleTest');
    this.selectedReasons = this.navParams.get('selectedReasons');
    this.editMode = this.navParams.get('editMode');
    this.altAbandon = this.navParams.get('altAbandon');
    this.fromTestReview = this.navParams.get('fromTestReview');
  }

  ngOnInit() {
    if (!this.editMode) {
      this.additionalComment = this.vehicleTest.additionalCommentsForAbandon;
    }
  }

  onDoneHandler() {
    this.updateVehicleTestModel();
    if (!this.fromTestReview) {
      this.altAbandon
        ? this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4))
        : this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
    } else {
      this.navCtrl.popToRoot();
    }
  }

  onDone() {
    this.changeOpacity = true;
    const alert = this.alertCtrl.create({
      title: 'Abandon test',
      message: 'You will not be able to make changes to this test after it has been abandoned.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Abandon',
          cssClass: 'danger-action-button',
          handler: () => {
            this.onDoneHandler();
          }
        }
      ]
    });
    alert.onDidDismiss(() => (this.changeOpacity = false));
    alert.present();
  }

  async updateVehicleTestModel() {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.TEST_TYPES,
      event: ANALYTICS_EVENTS.ABANDON_TEST_TYPE,
      label: ANALYTICS_LABEL.TEST_TYPE_NAME
    });

    await this.analyticsService.addCustomDimension(
      Object.keys(ANALYTICS_LABEL).indexOf('TEST_TYPE_NAME') + 1,
      this.vehicleTest.testTypeName
    );

    this.vehicleTest.reasons.push(...this.selectedReasons);
    if (this.additionalComment && this.additionalComment.length) {
      this.vehicleTest.additionalCommentsForAbandon = this.additionalComment;
    }
    this.vehicleTest.testResult = this.testTypeService.setTestResult(this.vehicleTest, false);
    this.visitService.updateVisit();
  }
}
