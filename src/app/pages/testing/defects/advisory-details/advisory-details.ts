import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DefectDetailsModel } from '@models/defects/defect-details.model';
import { TestTypeModel } from '@models/tests/test-type.model';
import { APP_STRINGS, PAGE_NAMES } from '@app/app.enums';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-advisory-details',
  templateUrl: 'advisory-details.html',
  styleUrls: ['advisory-details.scss'],
})
export class AdvisoryDetailsPage implements OnInit {
  vehicleTest: TestTypeModel;
  advisory: DefectDetailsModel;
  isEdit: boolean;

  constructor(
    private alertCtrl: AlertController,
    private testTypeService: TestTypeService,
    private router: Router,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.vehicleTest = this.router.getCurrentNavigation().extras.state.vehicleTest;
    this.advisory = this.router.getCurrentNavigation().extras.state.advisory;
    this.isEdit = this.router.getCurrentNavigation().extras.state.isEdit;
  }

  async cancelAdvisory(): Promise<void> {
    if (this.isEdit) {
      await this.navCtrl.navigateBack([PAGE_NAMES.TEST_COMPLETE_PAGE]);
    } else {
      await this.navCtrl.navigateBack([PAGE_NAMES.ADD_DEFECT_PAGE]);
    }
  }

  async submitAdvisory(): Promise<void> {
    if (!this.isEdit) {
      this.vehicleTest.defects.push(this.advisory);
    }
    await this.navCtrl.navigateBack([PAGE_NAMES.TEST_COMPLETE_PAGE]);
  }

  async removeAdvisory(): Promise<void> {
    await this.testTypeService.removeDefect(this.vehicleTest, this.advisory);
    await this.navCtrl.navigateBack([PAGE_NAMES.TEST_COMPLETE_PAGE]);
  }

  async removeAdvisoryConfirm(): Promise<void> {
    const REMOVE_ALERT = await this.alertCtrl.create({
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
            await this.removeAdvisory();
          }
        }
      ]
    });
    await REMOVE_ALERT.present();
  }
}
