import { TesterDetailsModel } from '@models/tester-details.model';
import { TESTER_ROLES } from '@app/app.enums';
import { DefectDetailsModel } from '@models/defects/defect-details.model';

const mockDefectsDetails = (args?: Partial<DefectDetailsModel>): DefectDetailsModel => {
  const mock: DefectDetailsModel = {
    deficiencyCategory: 'major',
    deficiencyText: 'missing.',
    prs: false,
    additionalInformation: {
      location: {
        axleNumber: null,
        horizontal: null,
        vertical: null,
        longitudinal: 'front',
        rowNumber: null,
        lateral: null,
        seatNumber: null
      },
      notes: 'None'
    },
    itemNumber: 1,
    deficiencyRef: '1.1.a',
    stdForProhibition: false,
    deficiencySubId: null,
    imDescription: 'Registration Plate',
    deficiencyId: 'a',
    itemDescription: 'A registration plate:',
    imNumber: 1
  } as DefectDetailsModel;

  return { ...mock, ...args };
};

const mockTesterDetails = (args?: Partial<TesterDetailsModel>): TesterDetailsModel => {
  const mock: TesterDetailsModel = {
    testerName: 'John Doe',
    testerId: '1234567890',
    testerEmail: 'test@email.com',
    testerRoles: [TESTER_ROLES.PSV]
  } as TesterDetailsModel;

  return { ...mock, ...args };
};

export const MOCK_UTILS = {
  mockTesterDetails,
  mockDefectsDetails
};
