/**
 * Please follow the <<STATE>>_<<ACTION_TYPE>> pattern and group actions by STATE
 */
const ActionTypes = {
  // Install
  APP_INSTALL_REQUEST_DATA: 'APP_INSTALL_REQUEST_DATA',
  APP_INSTALL_LOADING: 'APP_INSTALL_LOADING',
  APP_INSTALL_REQUEST_DATA_SUCCESS: 'APP_INSTALL_REQUEST_DATA_SUCCESS',
  APP_INSTALL_REQUEST_DATA_FAILURE: 'APP_INSTALL_REQUEST_DATA_FAILURE',
  APP_INSTALL_DONE: 'APP_INSTALL_DONE',

  // Uninstall
  APP_UNINSTALL_REQUEST_DATA: 'APP_UNINSTALL_REQUEST_DATA',
  APP_UNINSTALL_LOADING: 'APP_UNINSTALL_LOADING',
  APP_UNINSTALL_REQUEST_DATA_SUCCESS: 'APP_UNINSTALL_REQUEST_DATA_SUCCESS',
  APP_UNINSTALL_REQUEST_DATA_FAILURE: 'APP_UNINSTALL_REQUEST_DATA_FAILURE',
  APP_UNINSTALL_DONE: 'APP_UNINSTALL_DONE',

  // Auth actions
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_CHANGE_LOGIN_TYPE: 'AUTH_CHANGE_LOGIN_TYPE',
  AUTH_SET_DESKTOP_SESSION: 'AUTH_SET_DESKTOP_SESSION',

  // Error actions
  ERROR_THROWN_COMPONENT: 'ERROR_THROWN_COMPONENT',
  ERROR_THROWN_SERVER: 'ERROR_THROWN_SERVER',
  ERROR_CLEARED_COMPONENT: 'ERROR_CLEARED_COMPONENT',
  ERROR_CLEARED_SERVER: 'ERROR_CLEARED_SERVER',

  // Client actions
  CLIENT_REQUEST_DATA: 'CLIENT_REQUEST_DATA',
  CLIENT_REQUEST_FAILURE: 'CLIENT_REQUEST_FAILURE',
  CLIENT_LOADING: 'CLIENT_LOADING',
  CLIENT_RECEIVE_DATA: 'CLIENT_RECEIVE_DATA',
  CLIENT_CLEAR_DATA: 'CLIENT_CLEAR_DATA',

  // My apps actions
  MY_APPS_REQUEST_DATA: 'MY_APPS_REQUEST_DATA',
  MY_APPS_LOADING: 'MY_APPS_LOADING',
  MY_APPS_REQUEST_DATA_FAILURE: 'MY_APPS_REQUEST_DATA_FAILURE',
  MY_APPS_RECEIVE_DATA: 'MY_APPS_RECEIVE_DATA',
  MY_APPS_CLEAR_DATA: 'MY_APPS_CLEAR_DATA',

  // Developer actions
  DEVELOPER_REQUEST_DATA: 'DEVELOPER_REQUEST_DATA',
  DEVELOPER_REQUEST_DATA_FAILURE: 'DEVELOPER_REQUEST_DATA_FAILURE',
  DEVELOPER_LOADING: 'DEVELOPER_LOADING',
  DEVELOPER_RECEIVE_DATA: 'DEVELOPER_RECEIVE_DATA',
  DEVELOPER_CLEAR_DATA: 'DEVELOPER_CLEAR_DATA',
  DEVELOPER_CREATE: 'DEVELOPER_CREATE',
  DEVELOPER_SET_FORM_STATE: 'DEVELOPER_SET_FORM_STATE',

  // App Detail actions
  APP_DETAIL_REQUEST_DATA: 'APP_DETAIL_REQUEST_DATA',
  APP_DETAIL_LOADING: 'APP_DETAIL_LOADING',
  APP_DETAIL_REQUEST_DATA_FAILURE: 'APP_DETAIL_REQUEST_DATA_FAILURE',
  APP_DETAIL_RECEIVE_DATA: 'APP_DETAIL_RECEIVE_DATA',
  APP_DETAIL_CLEAR_DATA: 'APP_DETAIL_CLEAR_DATA',

  // Client App Detail actions
  CLIENT_APP_DETAIL_REQUEST_DATA: 'CLIENT_APP_DETAIL_REQUEST_DATA',
  CLIENT_APP_DETAIL_LOADING: 'CLIENT_APP_DETAIL_LOADING',
  CLIENT_APP_DETAIL_REQUEST_DATA_FAILURE: 'CLIENT_APP_DETAIL_REQUEST_DATA_FAILURE',
  CLIENT_APP_DETAIL_RECEIVE_DATA: 'CLIENT_APP_DETAIL_RECEIVE_DATA',
  CLIENT_APP_DETAIL_CLEAR_DATA: 'CLIENT_APP_DETAIL_CLEAR_DATA',

  // App Permission actions
  APP_PERMISION_REQUEST_DATA: 'APP_PERMISION_REQUEST_DATA',
  APP_PERMISION_REQUEST_DATA_FAILURE: 'APP_PERMISION_REQUEST_DATA_FAILURE',
  APP_PERMISION_LOADING: 'APP_PERMISION_LOADING',
  APP_PERMISION_RECEIVE_DATA: 'APP_PERMISION_RECEIVE_DATA',

  // Admin actions
  ADMIN_LOADING: 'ADMIN_LOADING',
  ADMIN_REQUEST_REVISIONS: 'ADMIN_REQUEST_REVISIONS',
  ADMIN_RECEIVE_REVISIONS: 'ADMIN_RECEIVE_REVISIONS',

  // submit app acions
  DEVELOPER_SUBMIT_APP: 'DEVELOPER_SUBMIT_APP',
  DEVELOPER_SUBMIT_APP_SET_FORM_STATE: 'DEVELOPER_SUBMIT_APP_SET_FORM_STATE',

  // submit revision acions
  DEVELOPER_SUBMIT_REVISION: 'DEVELOPER_SUBMIT_REVISION',
  DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE: 'DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE',

  // Client actions
  ADMIN_APPROVALS_REQUEST_DATA: 'ADMIN_APPROVALS_REQUEST_DATA',
  ADMIN_APPROVALS_REQUEST_FAILURE: 'ADMIN_APPROVALS_REQUEST_FAILURE',
  ADMIN_APPROVALS_LOADING: 'ADMIN_APPROVALS_LOADING',
  ADMIN_APPROVALS_RECEIVE_DATA: 'ADMIN_APPROVALS_RECEIVE_DATA',
  ADMIN_APPROVALS_CLEAR_DATA: 'ADMIN_APPROVALS_CLEAR_DATA',

  // Revision Detail actions
  REVISION_DETAIL_REQUEST_DATA: 'REVISION_DETAIL_REQUEST_DATA',
  REVISION_DETAIL_LOADING: 'REVISION_DETAIL_LOADING',
  REVISION_DETAIL_REQUEST_DATA__FAILURE: 'REVISION_DETAIL_REQUEST_DATA__FAILURE',
  REVISION_DETAIL_RECEIVE_DATA: 'REVISION_DETAIL_RECEIVE_DATA',
  REVISION_DETAIL_CLEAR_DATA: 'REVISION_DETAIL_CLEAR_DATA',

  REVISION_SUBMIT_APPROVE: 'REVISION_SUBMIT_APPROVE',
  REVISION_APPROVE_SET_FORM_STATE: 'REVISION_APPROVE_SET_FORM_STATE',
  REVISION_SUBMIT_DECLINE: 'REVISION_SUBMIT_DECLINE',
  REVISION_DECLINE_SET_FORM_STATE: 'REVISION_DECLINE_SET_FORM_STATE',

  // App detail modal
  SET_APP_DETAIL_MODAL_STATE_VIEW: 'SET_APP_DETAIL_MODAL_STATE_VIEW',
  SET_APP_DETAIL_MODAL_STATE_PERMISSION: 'SET_APP_DETAIL_MODAL_STATE_PERMISSION'
}

export default ActionTypes
