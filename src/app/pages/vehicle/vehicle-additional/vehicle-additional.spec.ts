import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { VehicleAdditionalPage } from './vehicle-additional';
import { By } from '@angular/platform-browser';
import { APP_STRINGS, TECH_RECORD_STATUS } from '@app/app.enums';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';

describe('Component: VehicleAdditionalPage', () => {
  let component: VehicleAdditionalPage;
  let componentFixture: ComponentFixture<VehicleAdditionalPage>;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleAdditionalPage,
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
    componentFixture = TestBed.createComponent(VehicleAdditionalPage);
    component = componentFixture.componentInstance;
  });

  afterEach(() => {
    componentFixture.destroy();
    component = null;
  });

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
    component.ngOnInit();
  });

  it('should not display the provisional label if the techRecord is current', () => {
    component.vehicleData.techRecord.statusCode = TECH_RECORD_STATUS.CURRENT;

    componentFixture.detectChanges();
    componentFixture.whenStable().then(() => {
      const title = componentFixture.debugElement.query(
        By.css('ion-toolbar .ion-padding-start')
      );
      expect(title).toBeNull();
    });
  });

  it('should display the provisional label if the techRecord is provisional', () => {
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
