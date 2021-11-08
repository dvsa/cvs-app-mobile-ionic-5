import { DefectDetailsModel } from '@models/defects/defect-details.model';

export class DefectDetailsDataMock {
  public static get DefectData(): DefectDetailsModel {
    return DefectDetailsDataMock.DefectDetails[0];
  }

  public static get DefectDetails(): DefectDetailsModel[] {
    return [
      {
        deficiencyRef: '1.1.a',
        deficiencyCategory: 'major',
        deficiencyId: 'a',
        deficiencySubId: null,
        deficiencyText: 'missing.',
        imNumber: 1,
        imDescription: 'Registration Plate',
        itemNumber: 1,
        itemDescription: 'A registration plate:',
        stdForProhibition: false,
        metadata: {
          category: {
            additionalInfo: {
              location: {
                axleNumber: null,
                horizontal: null,
                vertical: null,
                longitudinal: ['front', 'rear'],
                rowNumber: null,
                lateral: null,
                seatNumber: null
              },
              notes: false
            }
          }
        },
        prs: false,
        prohibitionIssued: false,
        additionalInformation: {
          notes: '',
          location: {
            vertical: '',
            horizontal: '',
            lateral: '',
            longitudinal: 'front',
            rowNumber: null,
            seatNumber: null,
            axleNumber: null
          }
        }
      },
      {
        deficiencyRef: '1.2',
        deficiencyCategory: 'Advisory',
        deficiencyId: null,
        deficiencySubId: null,
        stdForProhibition: false,
        deficiencyText: '',
        imNumber: 1,
        imDescription: 'Registration Plate',
        itemNumber: 2,
        itemDescription: 'A registration mark:',
        metadata: {
          category: { additionalInfo: null }
        },
        prs: null,
        prohibitionIssued: false,
        additionalInformation: {
          notes: 'test',
          location: null
        }
      }
    ];
  }
}
