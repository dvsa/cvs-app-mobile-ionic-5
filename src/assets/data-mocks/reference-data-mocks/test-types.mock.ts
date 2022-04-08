import { TestTypesReferenceDataModel } from '@models/reference-data-models/test-types.model';

export class TestTypesReferenceDataMock {
  public static get TestTypesData(): TestTypesReferenceDataModel[] {
    return [
      {
        id: '1',
        name: 'annual test',
        testTypeName: 'Annual test',
        suggestedTestTypeIds: ['1', '2', '4'],
        forVehicleType: ['psv'],
        forVehicleSize: ['small', 'large'],
        forVehicleConfiguration: ['articulated', 'rigid'],
        forVehicleAxles: null,
        forEuVehicleCategory: null,
        forVehicleClass: null,
        forVehicleSubclass: null,
        forVehicleWheels: null,
        testTypeClassification: 'Annual With Certificate',
        linkedIds: ['38', '39']
      },
      {
        id: '2',
        name: 'class 6a (seatbelt installation check)',
        forVehicleType: ['psv'],
        forVehicleSize: ['small', 'large'],
        forVehicleConfiguration: ['rigid'],
        forVehicleAxles: null,
        forEuVehicleCategory: null,
        forVehicleClass: null,
        forVehicleSubclass: null,
        forVehicleWheels: null,
        nextTestTypesOrCategories: [
          {
            id: '3',
            name: 'annual',
            testTypeName: 'Class 6A seatbelt installation check (annual test)',
            forVehicleType: ['psv'],
            forVehicleSize: ['small', 'large'],
            forVehicleConfiguration: ['rigid'],
            forVehicleAxles: null,
            forEuVehicleCategory: null,
            forVehicleClass: null,
            forVehicleSubclass: null,
            forVehicleWheels: null,
            testTypeClassification: 'Annual With Certificate',
            linkedIds: ['38', '39']
          },
          {
            id: '4',
            name: 'first test',
            testTypeName: 'Class 6A seatbelt installation check (first test)',
            forVehicleType: ['psv'],
            forVehicleSize: ['large'],
            forVehicleConfiguration: ['rigid'],
            forVehicleAxles: null,
            forEuVehicleCategory: null,
            forVehicleClass: null,
            forVehicleSubclass: null,
            forVehicleWheels: null,
            testTypeClassification: 'Annual With Certificate',
            linkedIds: ['38', '39']
          }
        ]
      },
      {
        id: '5',
        name: 'retest',
        forVehicleType: ['psv'],
        forVehicleSize: ['large', 'small'],
        forVehicleConfiguration: ['rigid', 'articulated'],
        forVehicleAxles: null,
        forEuVehicleCategory: null,
        forVehicleClass: null,
        forVehicleSubclass: null,
        forVehicleWheels: null,
        nextTestTypesOrCategories: [
          {
            id: '6',
            name: 'paid',
            forVehicleType: ['psv'],
            forVehicleSize: ['large', 'small'],
            forVehicleConfiguration: ['rigid', 'articulated'],
            forVehicleAxles: null,
            forEuVehicleCategory: null,
            forVehicleClass: null,
            forVehicleSubclass: null,
            forVehicleWheels: null,
            nextTestTypesOrCategories: [
              {
                id: '7',
                name: 'any psv',
                testTypeName: 'Paid retest',
                forVehicleType: ['psv'],
                forVehicleSize: ['large', 'small'],
                forVehicleConfiguration: ['rigid', 'articulated'],
                forVehicleAxles: null,
                forEuVehicleCategory: null,
                forVehicleClass: null,
                forVehicleSubclass: null,
                forVehicleWheels: null,
                testTypeClassification: 'Annual With Certificate',
                linkedIds: ['38', '39']
              },
              {
                id: '8',
                name: 'class 6a (seatbelt installation check)',
                testTypeName: 'Paid retest with Class 6A seatbelt installation check',
                forVehicleType: ['psv'],
                forVehicleSize: ['small', 'large'],
                forVehicleConfiguration: ['rigid'],
                forVehicleAxles: null,
                forEuVehicleCategory: null,
                forVehicleClass: null,
                forVehicleSubclass: null,
                forVehicleWheels: null,
                testTypeClassification: 'Annual With Certificate',
                linkedIds: ['38', '39']
              }
            ]
          },
          {
            id: '9',
            name: 'part paid',
            forVehicleType: ['psv'],
            forVehicleSize: ['large', 'small'],
            forVehicleConfiguration: ['rigid', 'articulated'],
            forVehicleAxles: null,
            forEuVehicleCategory: null,
            forVehicleClass: null,
            forVehicleSubclass: null,
            forVehicleWheels: null,
            nextTestTypesOrCategories: [
              {
                id: 'hjau6621',
                name: 'triple test',
                testTypeName: 'Triple test',
                forVehicleType: ['psv'],
                forVehicleSize: ['large', 'small'],
                forVehicleConfiguration: ['rigid', 'articulated'],
                forVehicleAxles: [2],
                forEuVehicleCategory: null,
                forVehicleClass: null,
                forVehicleSubclass: null,
                forVehicleWheels: null,
                linkedIds: ['38', '39']
              }
            ]
          }
        ]
      },
      {
        id: 'bsgs2341212',
        name: 'full test',
        testTypeName: 'Full test',
        forVehicleType: ['psv', 'trailer'],
        forVehicleSize: ['large'],
        forVehicleConfiguration: ['articulated'],
        forVehicleAxles: [2],
        forEuVehicleCategory: null,
        forVehicleClass: null,
        forVehicleSubclass: null,
        forVehicleWheels: null,
        linkedIds: null,
        nextTestTypesOrCategories: null
      }
    ];
  }
}
