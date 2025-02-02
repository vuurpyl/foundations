import React from 'react'
import { ModalPropsV2 } from '@reapit/elements-legacy'

export type AuthFlow = 'authorisationCode' | 'clientCredentials'

export type WizardStep =
  | 'BEFORE_YOU_START'
  | 'INPUT_APP_NAME'
  | 'CREATE_NEW_APP'
  | 'INPUT_AUTHENTICATION_URIS'
  | 'GRANT_PERMISSION'
  | 'SUBMIT_APP_SUCCESS'
  | 'INPUT_ATHENTICATION_TYPE'

export type SetWizardStep = React.Dispatch<React.SetStateAction<WizardStep>>
export type SetAuthFlow = (field: string, authFlow: AuthFlow) => void
export type SetDirectApi = (field: string, value: boolean) => void

export type WizardStepComponentProps = {
  setWizardStep: React.Dispatch<React.SetStateAction<WizardStep>>
} & Partial<Pick<ModalPropsV2, 'onClose'>>

export type WizardStepComponent = React.FC<WizardStepComponentProps>
