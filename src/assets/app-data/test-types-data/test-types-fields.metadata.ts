import {
  EMISSION_STANDARD,
  FUEL_TYPE,
  MOD_TYPES,
  TEST_TYPE_FIELDS,
  TEST_TYPE_RESULTS
} from '@app/app.enums';

export class TestTypesFieldsMetadata {
  public static get LecMinExpiryDate(): string {
    const minDate = new Date();
    minDate.setFullYear(new Date().getFullYear() + 1);
    return minDate.toISOString();
  }

  public static get LecMaxExpiryDate(): string {
    const maxDate = new Date();
    maxDate.setFullYear(new Date().getFullYear() + 2, new Date().getMonth() - 1);
    return maxDate.toISOString();
  }

  public static get FieldsMetadata() {
    return [
      {
        testTypeId: '1',
        testTypeName: 'Annual test',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '3',
        testTypeName: 'Class 6A seatbelt installation check (annual test)',
        sections: [
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
                defaultValue: 'Yes'
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
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '4',
        testTypeName: 'Class 6A seatbelt installation check (first test)',
        sections: [
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
                defaultValue: 'Yes'
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
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '7',
        testTypeName: 'Paid retest',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '8',
        testTypeName: 'Paid retest with Class 6A seatbelt installation check',
        sections: [
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
                defaultValue: 'Yes'
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
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: 'paidRetestWithoutClass6aSeatbeltInstallationCheck',
        sections: [],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '10',
        testTypeName: 'Part-paid retest',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '14',
        testTypeName: 'Paid prohibition clearance (full inspection with certificate)',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '15',
        testTypeName: 'Paid prohibition clearance (full inspection without certificate)',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '16',
        testTypeName: 'Part-paid prohibition clearance (full inspection)',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '18',
        testTypeName: 'Paid prohibition clearance (retest with certificate)',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '19',
        testTypeName: 'Paid prohibition clearance (retest without certificate)',
        sections: [
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
          }
        ],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '21',
        testTypeName: 'Part-paid prohibition clearance (retest with certificate)',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '22',
        testTypeName: 'Part-paid prohibition clearance (retest without certificate)',
        sections: [
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
          }
        ],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '23',
        testTypeName: 'Part-paid prohibition clearance (partial inspection)',
        sections: [
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '27',
        testTypeName:
          'Paid prohibition clearance with Class 6A seatbelt installation check (full inspection)',
        sections: [
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
                defaultValue: 'Yes'
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
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '28',
        testTypeName: 'Prohibition clearance (retest with Class 6A seatbelt installation check)',
        sections: [
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
                defaultValue: 'Yes'
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
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '30',
        testTypeName: 'Voluntary brake test',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '31',
        testTypeName: 'Voluntary headlamp aim check',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '32',
        testTypeName: 'Voluntary smoke test',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '33',
        testTypeName: 'Voluntary multi check (headlamp aim, smoke and brake test)',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '34',
        testTypeName: 'Voluntary speed limiter check',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '35',
        testTypeName: 'Voluntary Vitesse 100',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '36',
        testTypeName: 'Voluntary Tempo 100',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '38',
        testTypeName: 'Notifiable alteration check',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '39',
        testTypeName: 'Low Emissions Certificate (LEC) with annual test',
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
            sectionName: 'Expiry date',
            inputs: [
              {
                testTypePropertyName: 'testExpiryDate',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.EXPIRY_DATE,
                minDate: TestTypesFieldsMetadata.LecMinExpiryDate,
                maxDate: TestTypesFieldsMetadata.LecMaxExpiryDate,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Emission details',
            inputs: [
              {
                testTypePropertyName: 'emissionStandard',
                label: 'Emission standard',
                type: 'ddl',
                title: 'Emission standard',
                values: [
                  {
                    text: EMISSION_STANDARD._010,
                    value: EMISSION_STANDARD._010,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD._003,
                    value: EMISSION_STANDARD._003,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_3,
                    value: EMISSION_STANDARD.EURO_3,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_4,
                    value: EMISSION_STANDARD.EURO_4,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_6,
                    value: EMISSION_STANDARD.EURO_6,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_VI,
                    value: EMISSION_STANDARD.EURO_VI,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.FULL_ELECTRIC,
                    value: EMISSION_STANDARD.FULL_ELECTRIC,
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
              },
              {
                testTypePropertyName: 'smokeTestKLimitApplied',
                title: 'Smoke test "K" limit applied',
                label: 'Smoke test "K" limit applied',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              },
              {
                testTypePropertyName: 'fuelType',
                label: 'Fuel type',
                type: 'ddl',
                title: 'Fuel type',
                values: [
                  {
                    text: FUEL_TYPE.DIESEL,
                    value: FUEL_TYPE.DIESEL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_CNG,
                    value: FUEL_TYPE.GAS_CNG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_LNG,
                    value: FUEL_TYPE.GAS_LNG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_LPG,
                    value: FUEL_TYPE.GAS_LPG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.FUEL_CELL,
                    value: FUEL_TYPE.FUEL_CELL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.PETROL,
                    value: FUEL_TYPE.PETROL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.FULL_ELECTRIC,
                    value: FUEL_TYPE.FULL_ELECTRIC.toLowerCase(),
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
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Modification',
            inputs: [
              {
                testTypePropertyName: 'modType',
                label: 'Modification type',
                type: 'ddl',
                title: 'Modification type',
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
              },
              {
                testTypePropertyName: 'particulateTrapFitted',
                title: 'Particulate trap fitted',
                label: 'Particulate trap fitted',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.M.toLowerCase()
                  },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.G.toLowerCase()
                  }
                ]
              },
              {
                testTypePropertyName: 'particulateTrapSerialNumber',
                title: 'Particulate trap serial number',
                label: 'Particulate trap serial number',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.M.toLowerCase()
                  },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.G.toLowerCase()
                  }
                ]
              },
              {
                testTypePropertyName: 'modificationTypeUsed',
                title: 'Modification type used',
                label: 'Modification type used',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.P.toLowerCase()
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: 'lecWithoutAnnualTest',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '40',
        testTypeName: 'Annual test',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '41',
        testTypeName: 'First test',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '44',
        testTypeName: 'Low Emissions Certificate (LEC) with annual test',
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
            sectionName: 'Expiry date',
            inputs: [
              {
                testTypePropertyName: 'testExpiryDate',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.EXPIRY_DATE,
                minDate: TestTypesFieldsMetadata.LecMinExpiryDate,
                maxDate: TestTypesFieldsMetadata.LecMaxExpiryDate,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Emission details',
            inputs: [
              {
                testTypePropertyName: 'emissionStandard',
                label: 'Emission standard',
                type: 'ddl',
                title: 'Emission standard',
                values: [
                  {
                    text: EMISSION_STANDARD._010,
                    value: EMISSION_STANDARD._010,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD._003,
                    value: EMISSION_STANDARD._003,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_3,
                    value: EMISSION_STANDARD.EURO_3,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_4,
                    value: EMISSION_STANDARD.EURO_4,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_6,
                    value: EMISSION_STANDARD.EURO_6,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_VI,
                    value: EMISSION_STANDARD.EURO_VI,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.FULL_ELECTRIC,
                    value: EMISSION_STANDARD.FULL_ELECTRIC,
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
              },
              {
                testTypePropertyName: 'smokeTestKLimitApplied',
                title: 'Smoke test "K" limit applied',
                label: 'Smoke test "K" limit applied',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              },
              {
                testTypePropertyName: 'fuelType',
                label: 'Fuel type',
                type: 'ddl',
                title: 'Fuel type',
                values: [
                  {
                    text: FUEL_TYPE.DIESEL,
                    value: FUEL_TYPE.DIESEL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_CNG,
                    value: FUEL_TYPE.GAS_CNG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_LNG,
                    value: FUEL_TYPE.GAS_LNG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_LPG,
                    value: FUEL_TYPE.GAS_LPG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.FUEL_CELL,
                    value: FUEL_TYPE.FUEL_CELL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.PETROL,
                    value: FUEL_TYPE.PETROL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.FULL_ELECTRIC,
                    value: FUEL_TYPE.FULL_ELECTRIC.toLowerCase(),
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
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Modification',
            inputs: [
              {
                testTypePropertyName: 'modType',
                label: 'Modification type',
                type: 'ddl',
                title: 'Modification type',
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
              },
              {
                testTypePropertyName: 'particulateTrapFitted',
                title: 'Particulate trap fitted',
                label: 'Particulate trap fitted',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.M.toLowerCase()
                  },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.G.toLowerCase()
                  }
                ]
              },
              {
                testTypePropertyName: 'particulateTrapSerialNumber',
                title: 'Particulate trap serial number',
                label: 'Particulate trap serial number',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.M.toLowerCase()
                  },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.G.toLowerCase()
                  }
                ]
              },
              {
                testTypePropertyName: 'modificationTypeUsed',
                title: 'Modification type used',
                label: 'Modification type used',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.P.toLowerCase()
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '45',
        testTypeName: 'Low Emissions Certificate (LEC)',
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
            sectionName: 'Expiry date',
            inputs: [
              {
                testTypePropertyName: 'testExpiryDate',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.EXPIRY_DATE,
                minDate: TestTypesFieldsMetadata.LecMinExpiryDate,
                maxDate: TestTypesFieldsMetadata.LecMaxExpiryDate,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Emission details',
            inputs: [
              {
                testTypePropertyName: 'emissionStandard',
                label: 'Emission standard',
                type: 'ddl',
                title: 'Emission standard',
                values: [
                  {
                    text: EMISSION_STANDARD._010,
                    value: EMISSION_STANDARD._010,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD._003,
                    value: EMISSION_STANDARD._003,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_3,
                    value: EMISSION_STANDARD.EURO_3,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_4,
                    value: EMISSION_STANDARD.EURO_4,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_6,
                    value: EMISSION_STANDARD.EURO_6,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.EURO_VI,
                    value: EMISSION_STANDARD.EURO_VI,
                    cssClass: ''
                  },
                  {
                    text: EMISSION_STANDARD.FULL_ELECTRIC,
                    value: EMISSION_STANDARD.FULL_ELECTRIC,
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
              },
              {
                testTypePropertyName: 'smokeTestKLimitApplied',
                title: 'Smoke test "K" limit applied',
                label: 'Smoke test "K" limit applied',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              },
              {
                testTypePropertyName: 'fuelType',
                label: 'Fuel type',
                type: 'ddl',
                title: 'Fuel type',
                values: [
                  {
                    text: FUEL_TYPE.DIESEL,
                    value: FUEL_TYPE.DIESEL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_CNG,
                    value: FUEL_TYPE.GAS_CNG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_LNG,
                    value: FUEL_TYPE.GAS_LNG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.GAS_LPG,
                    value: FUEL_TYPE.GAS_LPG.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.FUEL_CELL,
                    value: FUEL_TYPE.FUEL_CELL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.PETROL,
                    value: FUEL_TYPE.PETROL.toLowerCase(),
                    cssClass: ''
                  },
                  {
                    text: FUEL_TYPE.FULL_ELECTRIC,
                    value: FUEL_TYPE.FULL_ELECTRIC.toLowerCase(),
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
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Modification',
            inputs: [
              {
                testTypePropertyName: 'modType',
                label: 'Modification type',
                type: 'ddl',
                title: 'Modification type',
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
              },
              {
                testTypePropertyName: 'particulateTrapFitted',
                title: 'Particulate trap fitted',
                label: 'Particulate trap fitted',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.M.toLowerCase()
                  },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.G.toLowerCase()
                  }
                ]
              },
              {
                testTypePropertyName: 'particulateTrapSerialNumber',
                title: 'Particulate trap serial number',
                label: 'Particulate trap serial number',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.M.toLowerCase()
                  },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.G.toLowerCase()
                  }
                ]
              },
              {
                testTypePropertyName: 'modificationTypeUsed',
                title: 'Modification type used',
                label: 'Modification type used',
                type: 'number',
                defaultValue: 'Enter',
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  },
                  { testTypePropertyName: 'modType', valueToBeDifferentFrom: null },
                  {
                    testTypePropertyName: 'modType',
                    valueToBeDifferentFrom: MOD_TYPES.P.toLowerCase()
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '47',
        testTypeName: 'Free notifiable alteration',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '48',
        testTypeName: 'Paid notifiable alteration',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '49',
        testTypeName: 'TIR test',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '50',
        testTypeName: 'ADR test',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Expiry date',
            inputs: [
              {
                testTypePropertyName: 'testExpiryDate',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.EXPIRY_DATE,
                minDate: new Date().toISOString(),
                maxDate: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 2)
                ).toISOString(),
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '53',
        testTypeName: 'Paid annual test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '54',
        testTypeName: 'Part paid annual test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '199',
        testTypeName: 'Free loaded retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '56',
        testTypeName: 'Paid TIR retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '57',
        testTypeName: 'Free TIR retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '59',
        testTypeName: 'Paid ADR retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Expiry date',
            inputs: [
              {
                testTypePropertyName: 'testExpiryDate',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.EXPIRY_DATE,
                minDate: new Date().toISOString(),
                maxDate: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 2)
                ).toISOString(),
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '60',
        testTypeName: 'Free ADR retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          },
          {
            sectionName: 'Expiry date',
            inputs: [
              {
                testTypePropertyName: 'testExpiryDate',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.EXPIRY_DATE,
                minDate: new Date().toISOString(),
                maxDate: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 2)
                ).toISOString(),
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '62',
        testTypeName: 'Paid roadworthiness retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '63',
        testTypeName: 'Part paid roadworthiness retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '65',
        testTypeName: 'Paid first test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '66',
        testTypeName: 'Part paid first test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '67',
        testTypeName: 'Free first test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '70',
        testTypeName: 'Paid prohibition clearance (full inspection with certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '71',
        testTypeName: 'Paid prohibition clearance (full inspection without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '72',
        testTypeName: 'Part paid prohibition clearance (full inspection without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '73',
        testTypeName: 'Part paid prohibition clearance (part inspection without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '76',
        testTypeName: 'Paid prohibition clearance (retest with certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '77',
        testTypeName: 'Paid prohibition clearance (retest without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '79',
        testTypeName: 'Part paid prohibition clearance (retest with certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '80',
        testTypeName: 'Part paid prohibition clearance (retest without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '82',
        testTypeName:
          'Paid prohibition clearance on first test (full inspection with certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '83',
        testTypeName: 'Paid retest prohibition clearance on first test',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '85',
        testTypeName: 'Voluntary brake test',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '86',
        testTypeName: 'Voluntary multi-check',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '87',
        testTypeName: 'Voluntary Shaker plate check',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '88',
        testTypeName: 'Voluntary Speed limiter check',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '89',
        testTypeName: 'Voluntary smoke test',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '90',
        testTypeName: 'Voluntary headlamp aim test',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '91',
        testTypeName: 'Voluntary roadworthiness test',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '93',
        testTypeName:
          'Prohibition clearance (retest without Class 6A seatbelt installation check)',
        sections: [
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
                defaultValue: 'Yes'
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
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      // ----- duplicated test types with different testTypeIds for TRLs with 1 axle -----
      {
        testTypeId: '94',
        testTypeName: 'Annual test',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '95',
        testTypeName: 'First test',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '98',
        testTypeName: 'Paid annual test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '99',
        testTypeName: 'Part paid annual test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '100',
        testTypeName: 'Vitesse 100 Replacement',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '101',
        testTypeName: 'Paid roadworthiness retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '103',
        testTypeName: 'Paid first test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '104',
        testTypeName: 'Part paid first test retest',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '107',
        testTypeName: 'Paid prohibition clearance (full inspection with certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '108',
        testTypeName: 'Paid prohibition clearance (full inspection without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '109',
        testTypeName: 'Part paid prohibition clearance (full inspection without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '110',
        testTypeName: 'Part paid prohibition clearance (part inspection without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '113',
        testTypeName: 'Paid prohibition clearance (retest with certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '114',
        testTypeName: 'Paid prohibition clearance (retest without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '116',
        testTypeName: 'Part paid prohibition clearance (retest with certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '117',
        testTypeName: 'Part paid prohibition clearance (retest without certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '119',
        testTypeName:
          'Paid prohibition clearance on first test (full inspection with certification)',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '120',
        testTypeName: 'Paid retest prohibition clearance on first test',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '121',
        testTypeName: 'Vitesse 100 Application',
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
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '122',
        testTypeName: 'Voluntary roadworthiness test',
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      // ----- specialist tests -----
      {
        testTypeId: '125',
        testTypeName: 'Basic IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '126',
        testTypeName: 'Normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '186',
        testTypeName: 'Normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '187',
        testTypeName: 'Normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '128',
        testTypeName: 'Appeal on a normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '188',
        testTypeName: 'Appeal on a normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '189',
        testTypeName: 'Appeal on a normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '129',
        testTypeName: 'Appeal on a basic IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '130',
        testTypeName: 'IVA mutual recognition/ end of series & inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '133',
        testTypeName: 'Full MSVA moped vehicle inspection',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '134',
        testTypeName: 'Full MSVA unbodied vehicle inspection',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '135',
        testTypeName: 'Full MSVA bodied vehicle inspection',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '136',
        testTypeName: 'Part MSVA inspection',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '198',
        testTypeName: 'Part MSVA inspection',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '138',
        testTypeName: 'Appeal on a MSVA moped vehicle inspection',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '139',
        testTypeName: 'Appeal on a MSVA unbodied vehicle inspection',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '140',
        testTypeName: 'Appeal on a MSVA bodied vehicle inspection',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '142',
        testTypeName: 'COIF with annual test',
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
            sectionName: 'Certificate number (COIF)',
            inputs: [
              {
                testTypePropertyName: 'certificateNumber',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '143',
        testTypeName: 'COIF without annual test',
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
            sectionName: 'Certificate number (COIF)',
            inputs: [
              {
                testTypePropertyName: 'certificateNumber',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '144',
        testTypeName: 'Type approved to bus directive COIF',
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
            sectionName: 'Certificate number (COIF)',
            inputs: [
              {
                testTypePropertyName: 'certificateNumber',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '146',
        testTypeName: 'Seatbelt installation check COIF with annual test',
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
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '147',
        testTypeName: 'Seatbelt installation check COIF without annual test',
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
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '148',
        testTypeName: 'Annex 7 COIF',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '150',
        testTypeName: 'DDA Schedule 1, 2 or 3',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '151',
        testTypeName: 'DDA Schedule 1 + 2 or 3',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '153',
        testTypeName: 'Normal voluntary IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '190',
        testTypeName: 'Normal voluntary IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '191',
        testTypeName: 'Normal voluntary IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '154',
        testTypeName: 'Basic voluntary IVA inspection',
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
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '158',
        testTypeName: 'Paid basic IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '159',
        testTypeName: 'Free basic IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '161',
        testTypeName: 'Paid normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '192',
        testTypeName: 'Paid normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '193',
        testTypeName: 'Paid normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '162',
        testTypeName: 'Free normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '194',
        testTypeName: 'Free normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '195',
        testTypeName: 'Free normal IVA inspection',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '163',
        testTypeName: 'Mutual recognition/ end of series IVA retest',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '166',
        testTypeName: 'Paid MSVA moped vehicle retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '167',
        testTypeName: 'Free MSVA moped vehicle retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '169',
        testTypeName: 'Paid MSVA unbodied vehicle retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '170',
        testTypeName: 'Free MSVA unbodied vehicle retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '172',
        testTypeName: 'Paid MSVA bodied vehicle retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '173',
        testTypeName: 'Free MSVA bodied vehicle retest',
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '175',
        testTypeName: 'COIF retest with annual test',
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
            sectionName: 'Certificate number (COIF)',
            inputs: [
              {
                testTypePropertyName: 'certificateNumber',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '176',
        testTypeName: 'COIF retest without annual test',
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
            sectionName: 'Certificate number (COIF)',
            inputs: [
              {
                testTypePropertyName: 'certificateNumber',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '177',
        testTypeName: 'Seatbelt installation check COIF retest with annual test',
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
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '178',
        testTypeName: 'Annex 7 COIF retest',
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
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '179',
        testTypeName: 'TILT COIF retest',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          },
          {
            sectionName: 'Certificate number (COIF)',
            inputs: [
              {
                testTypePropertyName: 'certificateNumber',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '181',
        testTypeName: 'DDA Schedule 1, 2 or 3 retest',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '182',
        testTypeName: 'DDA Schedule 1 + 2 or 3 retest',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
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
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
                dependentOn: [
                  {
                    testTypePropertyName: 'testResult',
                    valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
                  }
                ]
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '184',
        testTypeName: 'Normal voluntary IVA inspection retest',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '196',
        testTypeName: 'Normal voluntary IVA inspection retest',
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
                  },
                  {
                    text: 'Prs',
                    value: TEST_TYPE_RESULTS.PRS,
                    cssClass: 'prs-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '197',
        testTypeName: 'Normal voluntary IVA inspection retest',
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
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '185',
        testTypeName: 'Basic voluntary IVA inspection retest',
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
          }
        ],
        hasSpecialistDefects: true,
        hasNotes: true
      }
    ];
  }
}
