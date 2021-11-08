import { MOD_TYPES, TEST_TYPE_FIELDS, TEST_TYPE_RESULTS } from '@app/app.enums';

export class TestTypeMetadataMock {
  public static get TestTypeMetadata() {
    return {
      testTypeId: '39',
      sections: [
        {
          sectionName: 'Result',
          inputs: [
            {
              testTypePropertyName: 'testResult',
              label: 'Test result',
              type: 'ddl',
              title: 'Test result',
              values: [
                {
                  text: 'Pass',
                  value: TEST_TYPE_RESULTS.PASS,
                  cssClass: ''
                },
                {
                  text: 'Fail',
                  value: TEST_TYPE_RESULTS.FAIL,
                  cssClass: 'danger-action-button'
                }
              ],
              defaultValue: 'Select',
              deactivateButtonOnSelection: true
            }
          ]
        },
        {
          sectionName: 'Certificate number',
          inputs: [
            {
              testTypePropertyName: 'certificateNumber',
              placeholder: 'Enter',
              type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM
            }
          ],
          dependentOn: ['testResult']
        },
        {
          sectionName: 'Seatbelt installation check',
          inputs: [
            {
              testTypePropertyName: 'seatbeltInstallationCheckDate',
              label: 'Carried out during this test',
              type: 'ddl',
              title: 'Was a seatbelt installation check carried out?',
              values: [
                {
                  text: 'Yes',
                  value: true,
                  cssClass: ''
                },
                {
                  text: 'No',
                  value: false,
                  cssClass: ''
                }
              ],
              defaultValue: 'No'
            },
            {
              testTypePropertyName: 'numberOfSeatbeltsFitted',
              label: 'Number of seatbelts fitted',
              info: 'If there are no seatbelts fitted, enter zero (0).',
              type: 'number',
              defaultValue: 'Enter'
            },
            {
              testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
              label: 'Most recent installation check',
              type: 'date',
              defaultValue: 'Enter',
              dependentOn: [
                { testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0' }
              ]
            }
          ]
        },
        {
          sectionName: 'Modification',
          inputs: [
            {
              testTypePropertyName: 'modType',
              label: 'Mod type',
              type: 'ddl',
              title: 'Mod type',
              values: [
                {
                  text: MOD_TYPES.P,
                  value: MOD_TYPES.P.toLowerCase(),
                  cssClass: ''
                },
                {
                  text: MOD_TYPES.M,
                  value: MOD_TYPES.M.toLowerCase(),
                  cssClass: ''
                },
                {
                  text: MOD_TYPES.G,
                  value: MOD_TYPES.G.toLowerCase(),
                  cssClass: ''
                }
              ],
              defaultValue: 'Select',
              dependentOn: [
                {
                  testTypePropertyName: 'testResult',
                  valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                }
              ]
            }
          ]
        }
      ],
      hasDefects: false,
      hasNotes: true
    };
  }
}
