import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActionSheetController,
  ModalController
} from '@ionic/angular';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import {
  ODOMETER_METRIC,
  REG_EX_PATTERNS
} from '@app/app.enums';
import { VisitService } from '@providers/visit/visit.service';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-odometer-reading',
  templateUrl: 'odometer-reading.html',
  styleUrls: ['odometer-reading.scss']
})
export class OdometerReadingPage implements OnInit {
  odometerReading: string;
  odometerMetric: string;
  @Input() vehicle: VehicleModel;
  @Input() errorIncomplete: boolean;
  patterns;

  @ViewChild('valueInput') valueInput;

  constructor(
    public visitService: VisitService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router,
    private vehicleService: VehicleService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.odometerReading =
      this.vehicle.odometerReading && this.vehicle.odometerReading.length
        ? this.vehicle.odometerReading
        : null;
    this.odometerMetric =
      this.vehicle.odometerMetric && this.vehicle.odometerMetric.length
        ? this.vehicle.odometerMetric
        : ODOMETER_METRIC.KILOMETRES;
    this.patterns = REG_EX_PATTERNS;
    if (this.vehicle.odometerReading) {
      this.errorIncomplete = false;
    }
  }

  ionViewDidEnter() {
    // setTimeout(() => {
    //   this.valueInput.focus();
    // }, 150);
  }

  valueInputChange(value) {
    this.cdRef.detectChanges();
    console.log('valueInputChange fired');
    console.log(value)
    this.odometerReading = value.length > 7 ? value.substring(0, 7) : value;
  }

  displayOdometerMetricCapitalized() {
    return this.odometerMetric.charAt(0).toUpperCase() + this.odometerMetric.slice(1);
  }

  async onSave() {
    this.vehicle = await this.vehicleService.setOdometer(
      this.vehicle,
      this.odometerReading,
      this.odometerMetric
    );

    await this.modalCtrl.dismiss();
  }

  async onEdit() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Kilometres',
          handler: () => {
            this.odometerMetric = ODOMETER_METRIC.KILOMETRES;
          }
        },
        {
          text: 'Miles',
          handler: () => {
            this.odometerMetric = ODOMETER_METRIC.MILES;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
}
