import { ActivityModel } from '@models/visit/activity.model';

export class ActivityDataModelMock {
  public static get ActivityData(): ActivityModel {
    return {
      activityType: 'visit',
      testStationName: 'Some test station',
      testStationPNumber: '12345',
      testStationEmail: '12345Station@mail.com',
      testStationType: 'atf',
      testerName: 'Hercules',
      testerStaffId: 'hercules1',
      testerEmail: 'tester@mail.com',
      startTime: new Date().toISOString(),
    };
  }
}
