/* eslint-disable @typescript-eslint/no-shadow, max-len*/

export enum STORAGE {
  ATFS = 'atfs',
  DEFECTS = 'defects',
  TESTTYPES = 'test-types',
  PREPARERS = 'preparers',
  TECH_RECORDS = 'tech-records',
  STATE = 'state',
  VISIT = 'visit',
  ACTIVITIES = 'activities',
  TEST_HISTORY = 'test-history',
  JWT_TOKEN = 'jwt-token',
  SIGNATURE = 'signature-image',
  APP_VERSION = 'app-version',
  LATEST_VERSION = 'latest-version',
  EMPLOYEE_ID = 'employeeId'
}

export enum PATHS {
  TECH_RECORDS = 'tech-records'
}

export enum STATUS_CODE {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403
}

export enum CONNECTION_STATUS {
  OFFLINE = 0,
  ONLINE = 1
}

export enum LOCAL_STORAGE {
  INIT_SYNC = 'initSyncDone',
  FIRST_INIT = 'firstInit',
  EASTER_EGG = 'easterEgg',
  CACHING = 'caching',
  TESTER_DETAILS = 'tester-details',
  JWT_TOKEN = 'jwt-token',
  SIGNATURE = 'signature-image',
  IS_TEST_SUBMITTED = 'is-test-submitted',
  OBSFUCATED_TESTER = 'obs-tester-oid'
}

export enum APP {
  INIT_SYNC = 'initSyncDone',
  NAV_OUT = 'navigatedOutOfPage',
  TEST_SUBMITTED = 'testSubmitted',
  TEST_TYPES_UPDATE_COMPLETED_FIELDS = 'updateCompletedFields'
}

export enum TESTER_ROLES {
  FULL_ACCESS = 'CVSFullAccess',
  PSV = 'CVSPsvTester',
  HGV = 'CVSHgvTester',
  ADR = 'CVSAdrTester',
  TIR = 'CVSTirTester'
}

export enum DEFICIENCY_CATEGORY {
  ADVISORY = 'advisory',
  DANGEROUS = 'dangerous',
  MAJOR = 'major',
  PRS = 'prs',
  MINOR = 'minor'
}

export enum TEST_REPORT_TITLES {
  SINGLE_TEST = 'Single Test',
  LINKED_TEST = 'Linked Test',
  COMBINED_TEST = 'Combined Test'
}

export enum TEST_REPORT_STATUSES {
  SUBMITTED = 'submitted',
  CANCELLED = 'cancelled'
}

export enum TEST_TYPE_RESULTS {
  ABANDONED = 'abandoned',
  FAIL = 'fail',
  PASS = 'pass',
  PRS = 'prs'
}

export enum TEST_COMPLETION_STATUS {
  IN_PROGRESS = 'in progress',
  EDIT = 'edit'
}

export enum TEST_TYPE_FIELDS {
  DDL = 'ddl',
  NUMBER = 'number',
  DATE = 'date',
  EXPIRY_DATE = 'expiryDate',
  CERTIFICATE_NUMBER = 'certificateNumber',
  CERTIFICATE_NUMBER_CUSTOM = 'certificateNumberCustom'
}

export enum TEST_TYPE_SECTIONS {
  EXPIRY_DATE = 'Expiry date',
  EMISSION_DETAILS = 'Emission details',
  MODIFICATION = 'Modification'
}

export enum TEST_TYPE_INPUTS {
  SIC_CARRIED_OUT = 'seatbeltInstallationCheckDate',
  SIC_SEATBELTS_NUMBER = 'numberOfSeatbeltsFitted',
  SIC_LAST_DATE = 'lastSeatbeltInstallationCheckDate',
  CERTIFICATE_NUMBER = 'certificateNumber',
  TEST_RESULT = 'testResult',
  EXPIRY_DATE = 'expiryDate',
  MOD_TYPE = 'modType',
  EMISSION_STANDARD = 'emissionStandard',
  FUEL_TYPE = 'fuelType',
  K_LIMIT = 'smokeTestKLimitApplied',
  PT_SERIAL_NUMBER = 'particulateTrapSerialNumber',
  PT_FITTED = 'particulateTrapFitted',
  MOD_TYPE_USED = 'modificationTypeUsed'
}

export enum MOD_TYPES {
  P = 'P - Particulate trap',
  M = 'M - Modification or change of engine',
  G = 'G - Gas engine'
}

export enum EMISSION_STANDARD {
  _010 = '0.10 g/kWh Euro 3 PM',
  _003 = '0.03 g/kWh Euro IV PM',
  EURO_3 = 'Euro 3',
  EURO_4 = 'Euro 4',
  EURO_6 = 'Euro 6',
  EURO_VI = 'Euro VI',
  FULL_ELECTRIC = 'Full Electric'
}

export enum FUEL_TYPE {
  DIESEL = 'Diesel',
  GAS_CNG = 'Gas-CNG',
  GAS_LNG = 'Gas-LNG',
  GAS_LPG = 'Gas-LPG',
  FUEL_CELL = 'Fuel Cell',
  PETROL = 'Petrol',
  FULL_ELECTRIC = 'Full Electric'
}

export enum APP_COLORS {
  ATTENTION = 'attention',
  DANGER = 'danger',
  DARK = 'dark',
  LIGHT = 'light',
  TERTIARY = 'tertiary'
}

export enum APP_STRINGS {
  VEHICLE_DETAILS = 'Vehicle details',
  VEHICLE_NOT_FOUND = 'Vehicle not found',
  VEHICLE_NOT_FOUND_MESSAGE = 'Check you have entered the correct value or change the search criteria to identify a vehicle',
  WITHOUT_PREPARER = 'Continue without preparer ID',
  CONFIRM_PREPARER = 'You are about to add this preparer to the test.',
  ADD_PREPARER_INFO_TEXT = 'If you are shown a preparer ID, add this to the test now',
  WITHOUT_PREPARER_MSG = 'You won\'t be able to add this information later.',
  PREPARER_NOT_FOUND = 'Preparer not found',
  PREPARER_NOT_FOUND_MSG = 'You can continue without adding a preparer ID or search again.',
  SEARCH_AGAIN = 'Search again',
  CONTINUE = 'Continue',
  CANCEL = 'Cancel',
  CONFIRM = 'Confirm',
  SUBMIT = 'Submit',
  OK = 'OK',
  YES = 'Yes',
  NO = 'No',
  SAVE = 'Save',
  ENTER = 'Enter',
  REPORT_ISSUE = 'Report issue',
  TEST_STATION_SAFETY = 'Confirm test facility and safety',
  REPORT_TITLE = 'Report test facility issue',
  SPEAK_TO_TTL = 'Speak to your Technical Team Leader (TTL) if the issue cannot be resolved on site.',
  SEARCH_TEST_STATION = 'Find test facility',
  CALL = 'Call',
  TEST_TYPE = 'Test type',
  NO_SEATBELTS_ENTERED = 'No seatbelts entered',
  NO_SEATBELTS_ENTERED_SUBTITLE = 'The number of seatbelts fitted must be greater than zero (0) to carry out an installation check.',
  COMPLETE_ALL_TESTS = 'You must complete all test types marked "in progress" before reviewing.',
  TEST_NOT_COMPLETE = 'Test not complete',
  NO_TESTS_ADDED = 'No test type added',
  PLEASE_ADD_TEST = 'Add a test type before reviewing.',
  REMOVE = 'Remove',
  REMOVE_TEST_TITLE = 'Remove test',
  REMOVE_TEST_MSG = 'This action will remove this test from the vehicle.',
  NO_HISTORY = 'No test history found for this vehicle',
  CONFIRM_VEHICLE = 'Confirm vehicle',
  CONFIRM_VEHICLE_MSG = 'This action will confirm the vehicle for testing.',
  DEFECT_CAT = 'Defect category',
  DEFECT_ITEM = 'Defect item',
  DEFECT_DESC = 'Defect description',
  TEST = 'Test',
  IDENTIFY_VEHICLE = 'Identify vehicle',
  IDENTIFY_TRAILER = 'Identify trailer',
  SELECT_VEHICLE = 'Select vehicle',
  TEST_HISTORY = 'Test history',
  SUBMIT_TEST = 'Submit test',
  SUBMIT_TESTS = 'Submit tests',
  NEXT_VEHICLE = 'Next vehicle',
  SUBMIT_TEST_MESSAGE = 'You will not be able to make changes to this test after it has been submitted.',
  SUBMIT_TEST_TOAST_MESSAGE = 'The test has been submitted and emailed.',
  UNABLE_TO_SUBMIT_TESTS_TITLE = 'Unable to submit test',
  UNABLE_TO_START_VISIT = 'Unable to start visit',
  UNABLE_TO_END_VISIT = 'Unable to end visit',
  NO_INTERNET_CONNECTION = 'Make sure you are connected to the Internet and try again.',
  PLUGIN_FAILURE = 'Login failed, please try again',
  SETTINGS_BTN = 'Settings',
  TRY_AGAIN_BTN = 'Try again',
  CALL_SUPP_BTN = 'Call technical support',
  END_VISIT_WAITING_TITLE = 'Enter reason',
  END_VISIT_WAITING_MSG = 'Before ending your visit, enter details about your time spent not testing.',
  END_VISIT_TITLE = 'End visit',
  END_VISIT_MSG = 'You will not be able to add any other tests after you end this visit. Today\'s activity report will be sent to DVSA and ',
  END_VISIT_LOADING = 'Submitting site visit',
  REMOVE_DEFECT_TITLE = 'Remove defect',
  REMOVE_DEFECT_MSG = 'This action will remove this defect.',
  PLACEHOLDER_DEFECT_CAT = 'Search for a defect category or IM number',
  PLACEHOLDER_DEFECT_ITEM = 'Search for a defect item',
  PLACEHOLDER_DEFECT_DESC = 'Search for a defect description',
  APP_NAME = 'Vehicle Testing',
  APP_DESC_PT1 = 'Use this app to record commercial vehicle',
  APP_DESC_PT2 = 'tests at test facilities',
  SIGNATURE_TEXT = 'Once you are happy with your signature, select \'Save\'. After it has been saved, it cannot be edited and will be used each time you need to sign a certificate.',
  SIGNATURE_DIVIDER = 'use your finger to sign below',
  SIGN_CONF_TITLE = 'Save signature',
  SIGN_CONF_MSG = 'After it has been saved, it cannot be edited and will be used each time you need to sign a certificate.',
  SIGN_TOAST_MSG = 'Your Signature has been saved and will be used each time you need to sign a certificate',
  SIGN_NOT_ENTERED = 'Signature not entered',
  SIGN_ENTER = 'You must enter your signature before saving.',
  UNABLE_LOAD_DATA = 'Unable to load data',
  CACHING_ENABLED_STORAGE_CLEARED = 'Storage was cleared and caching was disabled. Ride on',
  CACHING_ENABLED = 'Caching was enabled',
  UNAUTHORISED = 'Unable to authorise',
  UNAUTHORISED_MSG = 'Your account isn\'t currently authorised to use this app. Close the app or call IT support.',
  UNAUTHORISED_TEST_MSG = 'Your account isn\'t currently authorised to test this vehicle. Call IT support.',
  WAIT_REASONS_MSG_ISSUE = 'You\'ve selected \'Site issue\', give more details in notes section.',
  WAIT_REASONS_MSG_OTHER = 'You\'ve selected \'Other\', give more details in notes section.',
  WAIT_REASONS_TITLE = 'Add notes',
  PROHIBITION_TITLE = 'Prohibition alert',
  PROHIBITION_MSG_NOTES = 'Explain why you haven\'t issued a prohibition for this defect in the Notes section.',
  PROHIBITION_MSG_CONFIRM = 'This defect requires you to issue a prohibition in Mobile Compliance. Confirm you’ve done this in the Prohibition section.',
  NO_PREPARER_ID_FOUND = 'No preparer ID found',
  NO_PREPARER_ID_GIVEN = 'No preparer ID given',
  TRAILER_ID_OR_VIN = 'Enter trailer ID or VIN',
  REG_NUMBER_TRAILER_ID_OR_VIN = 'Enter registration number, VIN or trailer ID',
  CONFIRMATION_MESSAGE_END_VISIT = 'Site visit has been submitted and sent to DVSA and ',
  CONFIRMATION_MESSAGE_SUBMIT_TEST = 'The tests have been submitted and will be emailed to ',
  CONFIRMATION_ADDITIONAL_MESSAGE_SUBMIT_TEST = 'If you do not receive the email, ',
  CONFIRMATION_ADDITIONAL_MESSAGE_BUTTON_SUBMIT_TEST = 'contact the Help Desk',
  PROVISIONAL_LABEL_TEXT = 'This is a provisional record.',
  TEST_CREATE_ERROR_BANNER = 'You must complete all vehicle and test type details before reviewing.',
  SKELETON = 'skeleton',
  SKELETON_ALERT_TITLE = 'Incomplete vehicle record',
  SKELETON_ALERT_MESSAGE = 'This vehicle does not have enough data to be tested. Call Technical Support to correct this record and use SAR to test this vehicle.',
  SKELETON_INFO = 'Requires more data to be tested',
  SKELETON_BANNER = 'Some vehicles matching this search do not have enough data to be tested. Call Technical Support to correct these records and use SAR to test this vehicle.',

  SITE_VISIT_CLOSED_TITLE = 'Site Visit is closed',
  SITE_VISIT_CLOSED_MESSAGE = 'This Site Visit has been closed. Open a new Site Visit to continue testing.',
  RECENTLY_FAILED_TEST_TITLE = 'Suggested test types'
}

export enum ODOMETER_METRIC {
  KILOMETRES = 'kilometres',
  MILES = 'miles',
  KM = 'km',
  MI = 'mi'
}

export enum DATE_FORMAT {
  DD_MM_YYYY = 'dd/MM/yyyy',
  D_MMM_YY = 'd MMM yy'
}

export enum DEFAULT_VALUES {
  NONE = 'None',
  NOT_ENTERED = 'Not entered'
}

export enum REG_EX_PATTERNS {
  NUMERIC = '[0-9]*'
}

export enum VEHICLE_TYPE {
  PSV = 'psv',
  HGV = 'hgv',
  TRL = 'trl',
  CAR = 'car',
  LGV = 'lgv',
  MOTORCYCLE = 'motorcycle'
}

export enum VEHICLE_SIZE {
  SMALL = 'small',
  LARGE = 'large'
}

export enum VEHICLE_CONFIGURATION {
  RIGID = 'rigid',
  ARTICULATED = 'articulated'
}

export enum TEST_STATION_TYPE {
  ATF = 'atf',
  GVTS = 'gvts',
  TECHNICAL_SECTION_OFFICE = 'tass',
  POTF = 'potf',
  OTHER = 'other'
}

export enum TEST_STATIONS_SEARCH {
  SECTIONS = '0123456789abcdefghijklmnopqrstuvwxyz'
}

export enum TEST_REPORT_STATUS {
  SUBMITTED = 'submitted',
  CANCELLED = 'cancelled'
}

export enum VEHICLE_CLASS {
  CLASS_1 = '1',
  CLASS_2 = '2',
  CLASS_3 = '3',
  CLASS_L = 'l',
  CLASS_N = 'n',
  CLASS_V = 'v',
  CLASS_T = 't',
  CLASS_S = 's'
}

export enum VEHICLE_STATUS {
  STATUS_1 = '1',
  STATUS_2 = '2',
  STATUS_3 = '3'
}

export enum EU_VEHICLE_CATEGORY {
  CAT_M1 = 'm1',
  CAT_M2 = 'm2',
  CAT_M3 = 'm3',
  CAT_N1 = 'n1',
  CAT_N2 = 'n2',
  CAT_N3 = 'n3',
  CAT_01 = 'o1',
  CAT_02 = 'o2',
  CAT_03 = 'o3',
  CAT_04 = 'o4'
}

export enum PROHIBITION_ISSUED {
  YES = 'yes',
  NO = 'no'
}

export enum ADR_VEHICLE_TYPE {
  SEMI_TRAILER_BATTERY = 'semi trailer battery',
  RIGID_BATTERY_TANK = 'rigid battery tank'
}

export enum ADR_DETAILS {
  SUBSTANCES_PERMITTED = 'Substances permitted under the tank code and any special provisions specified in 9 may be carried',
  SUBSTANCES_CLASS_UN = 'Substances (class UN number and if necessary packing group and proper shipping name) may be carried'
}

export enum GUIDANCE_NOTES {
  NEW_CERTIFICATE_REQUESTED = 'New certificate requested'
}

export enum MEMOS_APPLY {
  _07_09 = '07/09 3mth leak ext'
}

export enum TECH_RECORD_STATUS {
  ARCHIVED = 'archived',
  CURRENT = 'current',
  PROVISIONAL = 'provisional'
}

export enum AUTH {
  INVALID_TOKEN = 'Invalid Token',
  INTERNET_REQUIRED = 'Internet is required.',
  RE_LOGIN = 'Allow user to log in again',
  CONTINUE = 'Token is active, continue the flow',
  FAILED = 'Login failed'
}

export enum SIGNATURE_STATUS {
  SAVED = 'signature:saved',
  ERROR = 'signature:error',
  SAVED_EVENT = 'signature-saved'
}

export enum VISIT {
  ACTIVITY_TYPE_VISIT = 'visit',
  ACTIVITY_TYPE_WAIT = 'wait',
  ACTIVITY_TYPE_UNACCOUNTABLE_TIME = 'unaccountable time',
  ALREADY_ENDED = 'Activity already ended'
}

export enum PAGE_NAMES {
  TEST_STATION_SEARCH_PAGE = 'TestStationSearchPage',
  TEST_STATION_HOME_PAGE = 'TestStationHomePage',
  TEST_STATION_DETAILS_PAGE = 'TestStationDetailsPage',
  CATEGORY_READING_PAGE = 'CategoryReadingPage',
  REGION_READING_PAGE = 'RegionReadingPage',
  ODOMETER_READING_PAGE = 'OdometerReadingPage',
  TEST_CREATE_PAGE = 'TestCreatePage',
  TEST_ABANDONING_PAGE = 'TestAbandoningPage',
  COMPLETE_TEST_PAGE = 'CompleteTestPage',
  VEHICLE_DETAILS_PAGE = 'VehicleDetailsPage',
  VEHICLE_HISTORY_PAGE = 'VehicleHistoryPage',
  TEST_TYPES_LIST_PAGE = 'TestTypesListPage',
  REASONS_SELECTION_PAGE = 'ReasonsSelectionPage',
  TEST_CANCEL_PAGE = 'TestCancelPage',
  TEST_REVIEW_PAGE = 'TestReviewPage',
  SIGNATURE_PAD_PAGE = 'SignaturePadPage',
  VISIT_TIMELINE_PAGE = 'VisitTimelinePage',
  ADD_PREPARER_PAGE = 'AddPreparerPage',
  VISIT_CONFIRMATION_PAGE = 'VisitConfirmationPage',
  VEHICLE_LOOKUP_PAGE = 'VehicleLookupPage',
  VEHICLE_LOOKUP_SEARCH_CRITERIA_SELECTION = 'VehicleLookupSearchCriteriaSelectionPage',
  WAIT_TIME_REASONS_PAGE = 'WaitTimeReasonsPage',
  MULTIPLE_TECH_RECORDS_SELECTION = 'MultipleTechRecordsSelectionPage',
  DEFECT_DETAILS_SPECIALIST_TESTING = 'DefectDetailsSpecialistTestingPage'
}

export enum WAIT_TIME_REASONS {
  WAITING_FOR_VEHICLE = 'Waiting for vehicle',
  ADMIN = 'Admin',
  BREAK = 'Break',
  SITE_ISSUE = 'Site issue',
  OTHER = 'Other'
}

export enum ANALYTICS_EVENT_CATEGORIES {
  MOBILE_ACCESSIBILITY = 'accessibility',
  APP_UPDATE = 'app_update',
  DEFECTS = 'defects',
  TEST_TYPES = 'test_types',
  ERRORS = 'errors',
  REVIEWS = 'reviews',
  DURATION = 'duration',
  VISIT = 'visit',
  TEST = 'test',
  TEST_HISTORY = 'test_history',
  SUGGESTED_TEST_TYPES_POPUP = 'suggested_test_types_popup'
}

export enum ANALYTICS_EVENTS {
  APP_UPDATE = 'app_update',
  IOS_FONT_SIZE_USAGE = 'ios_font_size_usage',
  IOS_VOICEOVER_USAGE = 'ios_voiceover_usage',
  DEFECT_NOTES_USAGE = 'defect_notes_usage',
  REMOVE_DEFECT = 'remove_defect',
  ADD_DEFECT = 'add_defect',
  ADD_DEFECT_TIME_TAKEN = 'add_defect_time_taken',
  ABANDON_TEST_TYPE = 'abandon_test_type',
  REMOVE_TEST_TYPE = 'remove_test_type',
  TEST_ERROR = 'test_error',
  TEST_REVIEW_UNSUCCESSFUL = 'test_review_unsuccessful',
  ADD_ODOMETER_READING_TIME_TAKEN = 'add_odometer_reading_time_taken',
  CANCEL_TEST = 'cancel_test',
  SUBMIT_TEST = 'submit_test',
  SUBMIT_VISIT = 'submit_visit',
  SUBMITTED_TESTS = 'submitted_tests',
  ADD_TEST_TYPE_TIME_TAKEN = 'add_test_type_time_taken',
  SEARCH_VEHICLE_TIME_TAKEN = 'search_vehicle_time_taken',
  CONFIRM_VEHICLE_TIME_TAKEN = 'confirm_vehicle_time_taken',
  CONFIRM_PREPARER_TIME_TAKEN = 'confirm_preparer_time_taken',
  SUGGESTED_TEST_TYPES_POPUP = 'suggested_test_types_popup',
  ADD_SUGGESTED_TEST_TYPE = 'add_suggested_test_type',
  VIEW_TEST_HISTORY = 'view_test_history'
}

export enum ANALYTICS_LABEL {
  DEFICIENCY_REFERENCE = 'deficiency_reference',
  TEST_TYPE_NAME = 'test_type_name',
  ERROR = 'error',
  MISSING_MADATORY_FIELD = 'missing_mandatory_field'
}

export enum ANALYTICS_VALUE {
  NO_TEST_ADDED = 'No test added before review',
  NOT_ALL_TESTS_COMPLETED = 'Not all tests completed before review',
  COUNTRY_OF_REGISTRATION = 'countryOfRegistration',
  EU_VEHICLE_CATEGORY = 'euVehicleCategory',
  ODOMETER_READING = 'odometerReading',
  TEST_SUBMISSION_FAILED = 'Test submission failed',
  ENDING_ACTIVITY_FAILED = 'Ending activity failed',
  WAIT_ACTIVITY_SUBMISSION_FAILED = 'Wait activity submission failed',
  START_ACTIVITY_FAILED = 'Starting activity failed',
  TEST_RESULT_HISTORY_FAILED = 'Failed retrieving the testResultsHistory',
  TEST_RECORD_FAILED = 'Failed retrieving the techRecord',
  VEHICLE_NOT_FOUND = 'Vehicle not found',
  SAVING_SIGNATURE_FAILED = 'Saving signature failed',
  VIEW_TEST_HISTORY = 'View test history'
}

export enum ANALYTICS_SCREEN_NAMES {
  GET_STARTED = 'Get Started Screen',
  TEST_STATION_SEARCH = 'Test Station Search Screen',
  TEST_STATION_DETAILS = 'Test Station Details Screen',
  VISIT_TIMELINE = 'Visit Timeline Screen',
  VEHICLE_SEARCH = 'Vehicle Search Screen',
  VEHICLE_DETAILS = 'Vehicle Details Screen',
  VEHICLE_TEST_HISTORY = 'Vehicle Test History Screen',
  VEHICLE_TEST_HISTORY_DETAILS = 'Vehicle Test History Details Screen',
  ENTER_PREPARER = 'Enter Preparer Screen',
  TEST_OVERVIEW = 'Test Overview Screen',
  TEST_TYPE_DETAILS = 'Test Type Details Screen',
  TEST_REVIEW = 'Test Review Screen',
  TEST_CANCEL = 'Test Cancel Screen'
}

export enum ACCESSIBILITY_DEFAULT_VALUES {
  TEXT_SIZE = 106
}

export enum LOG_TYPES {
  INFO = 'info',
  ERROR = 'error'
}

export enum LEC_CERTIFICATE_NUMBER_PREFIXES {
  LP = 'LP',
  LF = 'LF'
}

export enum TIR_CERTIFICATE_NUMBER_PREFIXES {
  GB_V = 'GB/V',
  GB_T = 'GB/T'
}

export enum SPEC_VALUES {
  CERTIFICATE_NUMBER = '67868977',
  TIR_CERTIFICATE_NUMBER = 'GB/V67868977',
  EMISSION_STANDARD = '0.16 g/kWh Euro 3 PM'
}

export enum TEST_TYPES_IDS {
  _39 = '39',
  _44 = '44',
  _45 = '45',
  _49 = '49',
  _56 = '56',
  _57 = '57',
  _62 = '62',
  _63 = '63',
  _91 = '91',
  _101 = '101',
  _122 = '122',
  _123 = '123' // specialist tests category
}

export enum APP_UPDATE {
  TITLE = 'Update required',
  BUTTON = 'Close Vehicle Testing app'
}
