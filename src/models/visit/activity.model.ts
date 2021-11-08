export interface ActivityModel {
  activityType: string;
  testStationName: string;
  testStationPNumber: string;
  testStationEmail: string;
  testStationType: string;
  testerName: string;
  testerStaffId: string;
  testerEmail?: string;
  startTime: string;
  endTime?: string;
  parentId?: string;
  waitReason?: string[];
  notes?: string;
  id?: string;
}
