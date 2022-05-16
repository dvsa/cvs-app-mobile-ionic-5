import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { By } from '@angular/platform-browser';
import { APP_STRINGS, TECH_RECORD_STATUS } from '@app/app.enums';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import { VehicleWeightsPage } from './vehicle-weights';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('Component: VehicleWeightsPage', () => {
  let component: VehicleWeightsPage;
  let componentFixture: ComponentFixture<VehicleWeightsPage>;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleWeightsPage,
        FormatVrmPipe
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        CommonFunctionsService,
      ]
    });
    router = TestBed.inject(Router);
    componentFixture = TestBed.createComponent(VehicleWeightsPage);
    component = componentFixture.componentInstance;

  });

  afterEach(() => {
    componentFixture.destroy();
    component = null;
  });

  describe('provisional', () => {
    beforeEach(() => {
      spyOn(router, 'getCurrentNavigation').and.returnValue(
        { extras:
            {
              state: {
                vehicleData: VehicleDataMock.VehicleData,
              }
            }
        } as any
      );
    });

    it('should not display the provisional label if the techRecord is current', async () => {
      component.ngOnInit();
      component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.CURRENT;

      componentFixture.detectChanges();
      componentFixture.whenStable().then(() => {
        const title = componentFixture.debugElement.query(
          By.css('ion-toolbar .ion-padding-start')
        );
        expect(title).toBeNull();
      });
    });

    it('should display the provisional label if the techRecord is provisional', async () => {
      component.ngOnInit();
      component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.PROVISIONAL;

      componentFixture.detectChanges();
      componentFixture.whenStable().then(() => {
        const title = componentFixture.debugElement.query(
          By.css('ion-toolbar .ion-padding-start')
        );
        expect(title.nativeElement.innerText).toBe(APP_STRINGS.PROVISIONAL_LABEL_TEXT);
      });
    });
  });

  it('should sort the axles on initialisation', () => {
    const multiAxleVehicle = {
      techRecord: {
        axles: [
          {axleNumber: 2},
          {axleNumber: 1},
          {axleNumber: 3},
        ]
      }
    } as VehicleModel;

    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              vehicleData: multiAxleVehicle
            }
          }
      } as any
    );
    component.ngOnInit();
    const axleData = component.vehicleData.techRecord.axles;
    expect(axleData.length).toEqual(3);
    expect(axleData[0].axleNumber).toEqual(1);
    expect(axleData[1].axleNumber).toEqual(2);
    expect(axleData[2].axleNumber).toEqual(3);
  });
});
