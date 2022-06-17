import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  APP_STRINGS,
  REG_EX_PATTERNS,
  TEST_TYPE_FIELDS,
  TEST_TYPE_INPUTS
} from '@app/app.enums';
import { Router } from '@angular/router';

@Component({
  selector: 'page-test-type-details-input',
  templateUrl: 'test-type-details-input.html'
})
export class TestTypeDetailsInputPage implements OnInit {
  vehicleCategory;
  sectionName;
  input;
  fromTestReview;
  inputValue: string;
  testTypeFields;
  testTypesInputs: typeof TEST_TYPE_INPUTS = TEST_TYPE_INPUTS;
  patterns: typeof REG_EX_PATTERNS;
  errorIncomplete: boolean;

  @ViewChild('valueInput') valueInput: TextInput;
  @ViewChild('customValueInput') customValueInput: TextInput;

  constructor(
    public router: Router,
    private cdRef: ChangeDetectorRef,
    private alertCtrl: AlertController
  ) {
    this.vehicleCategory = this.router.getCurrentNavigation().extras.state.vehicleCategory;
    this.sectionName = this.router.getCurrentNavigation().extras.state.sectionName;
    this.input = this.router.getCurrentNavigation().extras.state.input;
    this.fromTestReview = this.router.getCurrentNavigation().extras.state.fromTestReview;
    this.inputValue = this.router.getCurrentNavigation().extras.state.existentValue;
    this.errorIncomplete = this.router.getCurrentNavigation().extras.state.errorIncomplete;
  }

  ngOnInit() {
    this.testTypeFields = TEST_TYPE_FIELDS;
    this.patterns = REG_EX_PATTERNS;
  }

  ionViewDidEnter() {
    setTimeout(() => {
      if (this.valueInput) {
        this.valueInput.setFocus();
      }
      if (this.customValueInput) {
        this.customValueInput.setFocus();
      }
    }, 150);
  }

  valueInputChange(value) {
    this.cdRef.detectChanges();
    switch (this.input.testTypePropertyName) {
      case TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER:
        this.inputValue = value.length > 3 ? value.substring(0, 3) : value;
        break;
      case TEST_TYPE_INPUTS.K_LIMIT:
        this.inputValue = value.length > 10 ? value.substring(0, 10) : value;
        break;
      case TEST_TYPE_INPUTS.PT_SERIAL_NUMBER:
        this.inputValue = value.length > 30 ? value.substring(0, 30) : value;
        break;
      case TEST_TYPE_INPUTS.PT_FITTED:
      case TEST_TYPE_INPUTS.MOD_TYPE_USED:
        this.inputValue = value.length > 40 ? value.substring(0, 40) : value;
        break;
    }
  }

  async onCancel() {
    await this.alertCtrl.dismiss({fromTestReview: this.fromTestReview});
  }

  async onDone() {
    if (this.inputValue && this.inputValue.length) {
      this.errorIncomplete = false;
    } else {
      this.errorIncomplete = true;
    }
    if (
      this.vehicleCategory === 'B' &&
      ((this.inputValue && this.inputValue.charAt(0) === '0') || !this.inputValue)
    ) {
      const ALERT = await this.alertCtrl.create({
        header: APP_STRINGS.NO_SEATBELTS_ENTERED,
        message: APP_STRINGS.NO_SEATBELTS_ENTERED_SUBTITLE,
        buttons: [APP_STRINGS.OK]
      });
      await ALERT.present();
    } else {
      await this.alertCtrl.dismiss({
        inputValue: this.inputValue,
        fromTestReview: this.fromTestReview,
        errorIncomplete: this.errorIncomplete
      });
    }
  }
}
