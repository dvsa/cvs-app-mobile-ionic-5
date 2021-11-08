export class ActivityDataMock {
  public static get WaitActivityData() {
    return ActivityDataMock.Activities[0];
  }

  public static get UpdateActivity() {
    return ActivityDataMock.UpdateActivities[0];
  }

  public static get Activities() {
    return [
      {
        activityType: 'wait',
        endTime: '2019-05-22T11:12:31.625Z',
        id: '8ae539aa-cbfb-49e2-8951-63567003b512',
        notes: 'qwewe',
        parentId: 'ec43a533-07a3-4170-9f45-9e1f83523a30',
        startTime: '2019-05-22T11:11:14.702Z',
        testStationEmail: 'teststationname@dvsa.gov.uk',
        testStationName: 'Abshire-Kub',
        testStationPNumber: '09-4129632',
        testStationType: 'gvts',
        testerName: 'zaluy5iy2',
        testerStaffId: 'ho3k2g87a',
        waitReason: ['Admin', 'Break']
      },
      {
        activityType: 'unaccountable time',
        endTime: '2019-05-22T11:12:31.625Z',
        id: '8ae539aa-cbfb-49e2-8951-63567003b512',
        notes: null,
        parentId: 'ec43a533-07a3-4170-9f45-9e1f83523a30',
        startTime: '2019-05-22T11:11:14.702Z',
        testStationEmail: 'teststationname@dvsa.gov.uk',
        testStationName: 'Abshire-Kub',
        testStationPNumber: '09-4129632',
        testStationType: 'gvts',
        testerName: 'zaluy5iy2',
        testerStaffId: 'ho3k2g87a',
        waitReason: []
      }
    ];
  }

  public static get UpdateActivities() {
    return [
      {
        id: '0',
        waitReason: ['Admin', 'Break'],
        notes: 'something'
      },
      {
        id: '1',
        waitReason: ['Admin'],
        notes: 'something'
      },
      {
        id: '2',
        waitReason: ['Break'],
        notes: 'something'
      }
    ];
  }
}
