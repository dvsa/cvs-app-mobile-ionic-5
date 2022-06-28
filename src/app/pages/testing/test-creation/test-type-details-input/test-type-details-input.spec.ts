import {
  ComponentFixture,
  TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  AlertController,
  ModalController,
} from '@ionic/angular';
import {
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { TestTypeDetailsInputPage } from './test-type-details-input';
import { AlertControllerMock } from 'ionic-mocks';
import { ViewControllerMock } from '@test-config/ionic-mocks/view-controller.mock';
import { TEST_TYPE_FIELDS, TEST_TYPE_INPUTS } from '@app/app.enums';
import { ModalControllerMock } from '@test-config/mocks/modal-controller.mock';

describe('Component: TestTypeDetailsInputPage', () => {
  let comp: TestTypeDetailsInputPage;
  let fixture: ComponentFixture<TestTypeDetailsInputPage>;

  let alertCtrl: AlertController;
  let viewCtrl: ViewControllerMock;

  // const mockValueInput: HTMLIonInputElement = {
  //   input: new EventEmitter<UIEvent>(),
  //   setFocus: () => {},
  // };

  const mockInput = {
    testTypePropertyName: 'test',
    label: {
      toUpperCase: () => {},
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestTypeDetailsInputPage],
      imports: [],
      providers: [
        ChangeDetectorRef,
        {
          provide: AlertController,
          useFactory: () => AlertControllerMock.instance(),
        },
        { provide: ModalController, useClass: ModalControllerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeDetailsInputPage);
    comp = fixture.componentInstance;
    // comp.valueInput = mockValueInput;
    comp.inputValue = 'test';
    comp.input = mockInput;
    // comp.customValueInput = mockValueInput;
    alertCtrl = TestBed.inject(AlertController);
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    alertCtrl = null;
    viewCtrl = null;
    jasmine.clock().uninstall();
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should test ngOnInit logic', () => {
    expect(comp.testTypeFields).toBe(undefined);
    comp.ngOnInit();
    expect(comp.testTypeFields).toBe(TEST_TYPE_FIELDS);
  });

  it('should dismiss the view', async () => {
    spyOn(viewCtrl, 'dismiss');
    await comp.onCancel();
    expect(viewCtrl.dismiss).toHaveBeenCalled();
  });

  xit('should test onDone logic', () => {
    spyOn(viewCtrl, 'dismiss');
    comp.vehicleCategory = 'B';
    comp.inputValue = '0322';
    comp.onDone();
    expect(alertCtrl.create).toHaveBeenCalled();
    comp.vehicleCategory = 'A';
    comp.inputValue = '566';
    comp.onDone();
    expect(viewCtrl.dismiss).toHaveBeenCalled();
  });

  xit('should call setFocus on valueInput on ionViewDidEnter action ', () => {
    const spyValueInput = spyOn(comp.valueInput, 'setFocus').and.callThrough();
    comp.ionViewDidEnter();
    jasmine.clock().tick(150);
    expect(spyValueInput).toHaveBeenCalled();

  });

  xit('should call setFocus on customValueInput ionViewDidEnter action', () => {
    const spyCustomValueInput = spyOn(
      comp.customValueInput,
      'setFocus'
    ).and.callThrough();
    comp.ionViewDidEnter();
    jasmine.clock().tick(150);
    expect(spyCustomValueInput).toHaveBeenCalled();
  });

  it('should update inputValue with given value on valueInputChange action', () => {
    comp.valueInputChange('test');
    expect(comp.inputValue).toEqual('test');
  });

  describe('should update inputValue with substring of given value on valueInputChange action based on testTypePropertyName', () => {
    const testValue = 'testing-test-testing-test';
    it('SIC_SEATBELTS_NUMBER', () => {
      mockInput.testTypePropertyName = TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER;
      fixture.detectChanges();
      comp.valueInputChange(testValue);
      expect(comp.inputValue).toEqual(testValue.substring(0, 3));
    });
    it('K_LIMIT', () => {
      mockInput.testTypePropertyName = TEST_TYPE_INPUTS.K_LIMIT;
      fixture.detectChanges();
      comp.valueInputChange(testValue);
      expect(comp.inputValue).toEqual(testValue.substring(0, 10));
    });
    it('PT_SERIAL_NUMBER', () => {
      mockInput.testTypePropertyName = TEST_TYPE_INPUTS.PT_SERIAL_NUMBER;
      fixture.detectChanges();
      comp.valueInputChange(testValue);
      expect(comp.inputValue).toEqual(testValue.substring(0, 30));
    });
    it('MOD_TYPE_USED', () => {
      mockInput.testTypePropertyName = TEST_TYPE_INPUTS.MOD_TYPE_USED;
      fixture.detectChanges();
      comp.valueInputChange(testValue);
      expect(comp.inputValue).toEqual(testValue.substring(0, 40));
    });
    it('PT_FITTED', () => {
      mockInput.testTypePropertyName = TEST_TYPE_INPUTS.MOD_TYPE_USED;
      fixture.detectChanges();
      comp.valueInputChange(testValue);
      expect(comp.inputValue).toEqual(testValue.substring(0, 40));
    });
  });
});
