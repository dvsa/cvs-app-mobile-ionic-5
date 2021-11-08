/* eslint-disable max-len */

export class DefectsReferenceDataMock {
  public static get DefectsDataItem() {
    return DefectsReferenceDataMock.DefectsData[0].items[0];
  }

  public static get DefectDataCategory() {
    return DefectsReferenceDataMock.DefectsData[0];
  }

  public static get DefectDataDeficiencies() {
    return DefectsReferenceDataMock.DefectsData[1].items[2].deficiencies;
  }

  public static get DefectDataDeficiency() {
    return DefectsReferenceDataMock.DefectsData[1].items[2].deficiencies[0];
  }

  public static get DefectsData() {
    return [
      {
        imDescription: 'Registration Plate',
        additionalInfo: {
          psv: {
            location: {
              axleNumber: [],
              horizontal: [],
              vertical: [],
              longitudinal: ['front'],
              rowNumber: [],
              lateral: [],
              seatNumber: []
            },
            notes: false
          },
          hgv: {},
          trl: {}
        },
        imNumber: 1,
        items: [
          {
            itemNumber: 1,
            itemDescription: 'A registration plate:',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText: 'missing.',
                ref: '1.1.a',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText: 'insecure.',
                ref: '1.1.b',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'b'
              }
            ],
            forVehicleType: ['psv']
          },
          {
            itemNumber: 2,
            itemDescription: 'A registration mark:',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText: 'missing.',
                ref: '1.2.a',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText: 'illegible.',
                ref: '1.2.b',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'b'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText: 'not in accordance with the requirements.',
                ref: '1.2.c',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'c'
              }
            ],
            forVehicleType: ['psv']
          }
        ],
        forVehicleType: ['psv']
      },
      {
        imDescription: 'Seat Belts & Supplementary Restraint Systems',
        additionalInfo: {
          psv: {
            location: {
              axleNumber: [],
              horizontal: [],
              vertical: ['upper'],
              longitudinal: [],
              rowNumber: [2],
              lateral: ['nearside'],
              seatNumber: [2]
            },
            notes: true
          },
          hgv: {},
          trl: {}
        },
        imNumber: 3,
        items: [
          {
            itemNumber: 1,
            itemDescription: 'Obligatory Seat Belt:',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText: 'missing.',
                ref: '3.1.a',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText: 'of an incorrect type.',
                ref: '3.1.b',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'b'
              }
            ],
            forVehicleType: ['psv', 'hgv']
          },
          {
            itemNumber: 2,
            itemDescription: 'Anchorages:',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'with excessive corrosion, serious deterioration or a fracture in a load bearing member of the vehicle structure within 30cm of the anchorage (where a seat belt is attached to a seat frame this will apply to all seat mounting points).',
                ref: '3.2.a.i',
                stdForProhibition: false,
                deficiencySubId: 'i',
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'dangerous',
                deficiencyText:
                  'with excessive corrosion, serious deterioration or a fracture in a load bearing member of the vehicle structure within 30cm of the anchorage (where a seat belt is attached to a seat frame this will apply to all seat mounting points) and is likely to detach.',
                ref: '3.2.a.ii',
                stdForProhibition: true,
                deficiencySubId: 'ii',
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'a seat belt not securely fixed to the seat or to the vehicle structure.',
                ref: '3.2.b',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'b'
              }
            ],
            forVehicleType: ['psv', 'hgv']
          },
          {
            itemNumber: 3,
            itemDescription: 'Locking Mechanism, Stalks, Retracting Mechanism and Fittings:',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'locking mechanism of a seat belt does not secure or release as intended.',
                ref: '3.3.a',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'an attachment or adjustment fitting fractured, badly deteriorated or not operating effectively.',
                ref: '3.3.b',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'b'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'corrosion or deterioration of a flexible stalk likely to lead to failure under load.',
                ref: '3.3.c',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'c'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText: 'broken flexible stalk strands',
                ref: '3.3.d',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'd'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'a retracting mechanism that does not retract the webbing sufficiently to remove all of the slack from the belt with the locking mechanism fastened and the seat unoccupied.',
                ref: '3.3.e',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'e'
              }
            ],
            forVehicleType: ['psv', 'hgv']
          },
          {
            itemNumber: 4,
            itemDescription: 'Condition of Webbing:',
            deficiencies: [
              {
                deficiencyCategory: 'minor',
                deficiencyText:
                  'a cut or damage or fluffing or fraying, which is not sufficient to obstruct correct operation of the belt or which has not clearly weakened the webbing.',
                ref: '3.4.a.i',
                stdForProhibition: false,
                deficiencySubId: 'i',
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'a cut or damage or fluffing or fraying or overstretching sufficient to obstruct correct operation of the belt or significantly weaken the webbing.',
                ref: '3.4.a.ii',
                stdForProhibition: false,
                deficiencySubId: 'ii',
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText: 'stitching badly frayed, insecure, incomplete or repaired.',
                ref: '3.4.b',
                stdForProhibition: false,
                deficiencySubId: 'ii',
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              }
            ],
            forVehicleType: ['psv', 'hgv']
          },
          {
            itemNumber: 5,
            itemDescription:
              'Obvious signs of structural weakness in a Seat belt; fitting, guide, stalk or pivot',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText: 'such that failure is likely.',
                ref: '3.5',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: null
              }
            ],
            forVehicleType: ['psv', 'hgv']
          },
          {
            itemNumber: 6,
            itemDescription: 'Seats with seat belts attached to them:',
            deficiencies: [
              {
                deficiencyCategory: 'dangerous',
                deficiencyText: 'insecure.',
                ref: '3.6.a',
                stdForProhibition: true,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText: 'with a cracked or fractured leg or frame.',
                ref: '3.6.b',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'b'
              }
            ],
            forVehicleType: ['psv', 'hgv']
          },
          {
            itemNumber: 7,
            itemDescription: 'A seat belt:',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'load limiter or pretensioner obviously missing where fitted as original equipment.',
                ref: '3.7.a',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText:
                  'pretensioner or a ‘folded type’ webbing load limiter obviously deployed.',
                ref: '3.7.b',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'b'
              }
            ],
            forVehicleType: ['psv', 'hgv']
          },
          {
            itemNumber: 8,
            itemDescription: 'An airbag:',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText: 'missing.',
                ref: '3.8.a',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'a'
              },
              {
                deficiencyCategory: 'major',
                deficiencyText: 'deployed or disconnected.',
                ref: '3.8.b',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: 'b'
              }
            ],
            forVehicleType: ['psv', 'hgv']
          },
          {
            itemNumber: 9,
            itemDescription: 'The SRS warning lamp',
            deficiencies: [
              {
                deficiencyCategory: 'major',
                deficiencyText: 'indicates any kind of failure of the system.',
                ref: '3.9',
                stdForProhibition: false,
                deficiencySubId: null,
                forVehicleType: ['psv', 'hgv'],
                deficiencyId: null
              }
            ],
            forVehicleType: ['psv', 'hgv']
          }
        ],
        forVehicleType: ['psv']
      }
    ];
  }
}
