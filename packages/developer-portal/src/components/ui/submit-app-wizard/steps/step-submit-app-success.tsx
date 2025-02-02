import React from 'react'
import AuthFlow from '@/constants/app-auth-flow'
import AppAuthenticationDetail from '@/components/pages/app-detail/app-authentication-detail'
import { ModalBody, Button, ModalFooter, H5 } from '@reapit/elements-legacy'
import { WizardStep, WizardStepComponent } from '../types'
import { useFormikContext } from 'formik'
import { formFields } from '../form-fields'
import { CreateAppModel } from '@reapit/foundations-ts-definitions'
import { wizzardSteps } from '../constant'

const { nameField, externalIdField, authFlowField, appIdField } = formFields

export const onHandleFinish = (setWizardStep: React.Dispatch<React.SetStateAction<WizardStep>>, onClose: any) => () => {
  onClose()
  setWizardStep(wizzardSteps.BEFORE_YOU_START)
}

export const StepSubmitAppSuccess: WizardStepComponent = ({ onClose, setWizardStep }) => {
  const { values } = useFormikContext<CreateAppModel>()
  const authFlow = values[authFlowField.name]
  const id = values[appIdField.name]

  return (
    <>
      <ModalBody
        body={
          <div>
            <H5>You have successfully added &apos;{values[nameField.name]}&apos;</H5>
            <b className="mb-1">Authentication</b>
            <div className="mb-3">
              <b>Client ID:</b> {values[externalIdField.name]}
            </div>
            <div className="mb-3">
              {authFlow === AuthFlow.CLIENT_SECRET && <AppAuthenticationDetail withCustomHeader={true} appId={id} />}
            </div>
            <p className="mb-3">Please click on &apos;Finish&apos; below to view your app and edit any details.</p>
            <p className="mb-3">
              You can also use the listing preview to see how your app will display in the Marketplace to potential
              clients.
            </p>
            <p className="mb-3">
              When you are ready to publish your app you will need to add some additional information such as a Summary,
              Description & Images and you will also need to make it &apos;Listed&apos; so it is visible in the
              Marketplace. It will then be sent to our Admin Team for approval.
            </p>
          </div>
        }
      />
      <ModalFooter footerItems={<Button onClick={onHandleFinish(setWizardStep, onClose)}>Finish</Button>} />
    </>
  )
}
