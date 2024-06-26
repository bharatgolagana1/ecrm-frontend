export enum AppSettingsConfigKey {
  FileName = 'appSettings.json',
  Path = 'assets/configs',
  APIURL = 'https://demo.engagecrmpro.com',
}

export enum AppRoutePaths {
  Default = '',
  Login = 'login',
  Empty = 'empty',
  Waiting = 'waiting',
  Error = 'error',
  UserManagement = 'user-management',
  UserList = 'user-list',
  Dashboard = 'dashboard',
  EnquiryUpdate = 'enquiry-update',
  ResetPassword = 'reset-password',
  Email = 'email',
  ForgotPassword = 'forgot-password',
  DashboardWrapper = ' dashboard-wrapper',
  EnquiryDetails = 'enquiry-details',
  WorkList = 'work-list',
  EnquiryDetailsListView = 'enquiry-listview',
  LoginDialog = 'login-dialog',
  EnquiryDetailsHistory = 'enquiry-details-history/:id',
  EnquiryDetailsUpdate = 'enquiry-details-update/:id',
  ServiceCalendar = 'service-calendar',
  ServiceEffortsList = 'service-efforts-listview/:id/:Date',
  ServiceEfforts = 'service-efforts/:index/:id/:Date',
  WorksheetDetails = 'worksheet-details',
  WorksheetApproval = 'worksheet-approval/:id'
}

export enum EcrmUserAdminRoutePath {
  Default = '',
  User = 'users/:id',
  Users = 'users',
  AddUser = 'new-user',
}
