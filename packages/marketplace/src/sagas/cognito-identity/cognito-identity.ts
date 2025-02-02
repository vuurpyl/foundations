import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'

import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { ChangePasswordParams, changePasswordSuccess, changePasswordFailed } from '@/actions/cognito-identity'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { changePasswordService } from '@/services/cognito-identity'
import { notification } from '@reapit/elements-legacy'

export const clientPasswordChange = function* ({ data }: Action<ChangePasswordParams>) {
  try {
    /* rename for compatible reason */
    const { currentPassword: password, password: newPassword, email } = data
    const connectClientId = window.reapit.config.connectClientId
    const response = yield call(changePasswordService, {
      userName: email,
      password,
      newPassword,
      connectClientId,
    })
    const isCallAPISuccess = response === 'SUCCESS'
    if (!isCallAPISuccess) {
      yield put(changePasswordFailed('Server error'))
      notification.error({
        message: 'Server error',
      })
      return
    }
    yield put(changePasswordSuccess())
    localStorage.setItem('isPasswordChanged', 'true')
    reapitConnectBrowserSession.connectLogoutRedirect()
  } catch (error) {
    yield put(changePasswordFailed(error.message))
    notification.error({
      message: error.message,
    })
  }
}

export const clientPasswordChangeListen = function* () {
  yield takeLatest<Action<ChangePasswordParams>>(ActionTypes.CHANGE_PASSWORD, clientPasswordChange)
}

export const cognitoIdentitySagas = function* () {
  yield all([fork(clientPasswordChangeListen)])
}
