const Routes = {
  AUTHENTICATION: '/authentication',
  AUTHENTICATION_LOGIN_TYPE: '/authentication/:loginType',
  WELCOME: '/welcome',
  APPS: '/apps',
  APP_DETAIL: '/apps/:appid',
  SWAGGER: '/swagger',
  DESKTOP: '/desktop',
  APPS_EDIT: '/apps/:appid/edit',
  API_DOCS: '/api-docs',
  ANALYTICS: '/analytics',
  ANALYTICS_TAB: '/analytics/:activeTab?',
  RESET_PASSWORD: '/reset-password',
  WEBHOOKS: '/webhooks',
  SETTINGS: '/settings/',
  SETTINGS_PROFILE_TAB: '/settings/profile',
  SETTINGS_ORGANISATION_TAB: '/settings/organisation',
  SETTINGS_BILLING_TAB: '/settings/billing',
  SUBMIT_APP: '/submit-app',
  HELP: '/help',
  APP_PREVIEW: '/apps/:appId/preview',
  DEVELOPER_EDITION_DOWNLOAD: '/edition-download',
  REGISTER: '/register',
  REGISTER_CONFIRM: '/register/confirm',
  LOGIN: '/login',
  FOUR_O_FOUR: '/404',
  FORGOT_PASSWORD: '/forgot-password',
  INVITE: '/invite',
}

export default Routes
