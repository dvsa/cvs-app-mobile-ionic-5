import {
  AlertController, ModalController,
} from '@ionic/angular';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SpecialistCustomDefectModel } from '@models/defects/defect-details.model';
import { TestTypeModel } from '@models/tests/test-type.model';
import { VisitService } from '@providers/visit/visit.service';
import { APP_STRINGS } from '@app/app.enums';
import { TestTypeService } from '@providers/test-type/test-type.service';

@Component({
  selector: 'page-defect-details-specialist-testing',
  templateUrl: 'defect-details-specialist-testing.html',
  styleUrls: ['defect-details-specialist-testing.scss']
})
export class DefectDetailsSpecialistTestingPage {
  @Input() isEdit: boolean;
  @Input() defectIndex: number;
  @Input() defect: SpecialistCustomDefectModel;
  @Input() testType: TestTypeModel;
  @Input() errorIncomplete: boolean;

  constructor(
    private visitService: VisitService,
    private cdRef: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private testTypeService: TestTypeService,
    private modalCtrl: ModalController,
  ) {}

  ionViewWillEnter() {
    if (!this.isEdit) {
      this.errorIncomplete = false;
    }
  }

  async onCancel(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  async onDone(): Promise<void> {
    this.defect.hasAllMandatoryFields = !!this.defect.referenceNumber && !!this.defect.defectName;
    if (!this.isEdit) {
      this.testType.customDefects.push(this.defect);
    }
    await this.visitService.updateVisit();
    await this.modalCtrl.dismiss();
  }

  async onRemoveDefect(): Promise<void> {
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
            await this.testTypeService.removeSpecialistCustomDefect(this.testType, this.defectIndex);
            await this.modalCtrl.dismiss();
          }
        }
      ]
    });
    await confirm.present();
  }

  onInputChange(field: string, charsLimit: number, value: string): void {
    this.cdRef.detectChanges();
    this.defect[field] = value.length > charsLimit ? value.substring(0, charsLimit) : value;
  }
}
