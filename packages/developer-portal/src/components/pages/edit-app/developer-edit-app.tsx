import * as React from 'react'
import routes from '@/constants/routes'
import { Link, Redirect } from 'react-router-dom'
import { History } from 'history'
import { useHistory, useParams } from 'react-router'
import {
  Input,
  Button,
  Alert,
  H3,
  ButtonGroup,
  Formik,
  Form,
  H6,
  FormikValues,
  ModalV2,
  LevelRight,
} from '@reapit/elements-legacy'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'

import { useDispatch, useSelector } from 'react-redux'
import { CreateAppRevisionModel, AppDetailModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import Routes from '@/constants/routes'
import { selectAppDetailState } from '@/selector/app-detail'
import { Dispatch } from 'redux'
import GeneralInformationSection from './general-information-section'
import AgencyCloudIntegrationSection from './agency-cloud-integration-section'
// import AuthenticationFlowSection from './authentication-flow-section'
import RedirectUriSection from './redirect-uri-section'
import UploadImageSection from './upload-image-section'
import MarketplaceStatusSection from './marketplace-status-section'
import PermissionSection from './permission-section'
import { ScopeModel, CategoryModel } from '@reapit/foundations-ts-definitions'
import { selectCategories } from '@/selector/app-categories'
import { validationSchemaSubmitRevision } from './form-schema/validation-schema'
import { formFields } from './form-schema/form-fields'
import authFlows from '@/constants/app-auth-flow'
import { Section } from '@reapit/elements-legacy'
import { selectScopeList } from '@/selector/scopes/scope-list'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getDeveloperIdFromConnectSession } from '@/utils/session'
import { createAppRevision } from '@/actions/apps'
import { selectCurrentMemberData } from '@/selector/current-member'
import { selectSettingsPageDeveloperInformation } from '@/selector/settings'
import { Loader } from '@reapit/elements'
import { ReapitProductsSection } from './reapit-products-section'

const { CLIENT_SECRET } = authFlows

export type DeveloperSubmitAppProps = {}
export type CustomCreateRevisionModal = CreateAppRevisionModel & {
  isPrivateApp?: string
  limitToClientIds?: string
  redirectUris?: string
  signoutUris?: string
  authFlow?: string
  products: string
  isFree: false
}

export const labelTextOfField = {
  name: 'Name',
  supportEmail: 'Support email',
  telephone: 'Telephone',
  homePage: 'Home page',
  launchUri: 'Launch URI',
  summary: 'Summary',
  description: 'Description',
  redirectUris: 'Redirect URI(s)',
  signoutUris: 'Sign Out URI(s)',
  screen1ImageUrl: 'Feature Image',
  iconImageUrl: 'Icon',
  scopes: 'Permissions',
  authFlow: 'Authentication flow',
  limitToClientIds: 'Private Apps',
  privacyPolicyUrl: 'Privacy Policy',
  termsAndConditionsUrl: 'Terms & Conditions',
  pricingUrl: 'Pricing Info',
}

export const renderErrors = (errors: Record<string, string | string[]>) => {
  const isErrorsEmpty = typeof errors !== 'object' || Object.keys(errors).length === 0
  if (isErrorsEmpty) {
    return null
  }

  const description = errors[FIELD_ERROR_DESCRIPTION]

  return (
    <div className="has-text-danger">
      <H6 className="has-text-danger mb-1">{description || 'The following validation errors have occurred:'}</H6>
      <div>
        {Object.keys(errors).map((key) => {
          const value = errors[key]

          if (key === FIELD_ERROR_DESCRIPTION) {
            return null
          }

          if (typeof value === 'string') {
            return (
              <div data-test={key} key={key}>
                {labelTextOfField[key] || key}: {errors[key]}
              </div>
            )
          }

          return (
            <div data-test={key} key={key}>
              {labelTextOfField[key] || key}: {(errors[key] as string[]).join(', ')}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const generateInitialValues = (appDetail: AppDetailModel | null, developerId?: string | null) => {
  let initialValues

  if (appDetail) {
    const {
      category,
      authFlow,
      description,
      developerId,
      homePage,
      telephone,
      supportEmail,
      summary,
      launchUri,
      media,
      name,
      isListed,
      isDirectApi,
      scopes: appScopes,
      isFree,
      privacyPolicyUrl,
      pricingUrl,
      termsAndConditionsUrl,
      redirectUris = [],
      signoutUris = [],
      limitToClientIds = [],
      desktopIntegrationTypeIds = [],
      products,
    } = appDetail

    const icon = (media || []).filter(({ order }) => order === 0)[0]
    const iconImageUrl = icon ? icon.uri : ''
    const images = (media || [])
      .filter(({ type }) => type !== 'icon')
      .reduce((a, c, i) => ({ ...a, [`screen${i + 1}ImageUrl`]: c.uri }), { screen1ImageUrl: '' })
    // ^reason of using index instead of `order` property is because all images
    // in media have order of 0 (see ticket [CLD-623] to learn more)

    initialValues = {
      name,
      categoryId: category?.id || '',
      authFlow,
      description,
      developerId,
      homePage,
      telephone,
      supportEmail,
      summary,
      launchUri,
      iconImageUrl,
      isListed,
      isDirectApi,
      isFree,
      privacyPolicyUrl,
      pricingUrl,
      termsAndConditionsUrl,
      scopes: appScopes ? appScopes.map((item) => item.name) : [],
      redirectUris: redirectUris.join(','),
      signoutUris: signoutUris.join(','),
      limitToClientIds: limitToClientIds.join(','),
      isPrivateApp: limitToClientIds.length > 0 ? 'yes' : 'no',
      desktopIntegrationTypeIds: desktopIntegrationTypeIds,
      products: products?.join(',') ?? '',
      ...images,
    }
  } else {
    initialValues = {
      categoryId: '',
      authFlow: '',
      screen5ImageUrl: '',
      screen4ImageUrl: '',
      screen3ImageUrl: '',
      screen2ImageUrl: '',
      screen1ImageUrl: '',
      name: '',
      telephone: '',
      supportEmail: '',
      launchUri: '',
      iconImageUrl: '',
      homePage: '',
      description: '',
      summary: '',
      developerId,
      scopes: [],
      redirectUris: '',
      signoutUris: '',
      limitToClientIds: '',
      desktopIntegrationTypeIds: '',
      isFree: false,
      privacyPolicyUrl: '',
      pricingUrl: '',
      termsAndConditionsUrl: '',
      products: '',
    }
  }

  return initialValues
}

export const sanitizeAppData = (appData: CreateAppRevisionModel): CreateAppRevisionModel => {
  const sanitizedAppData = appData
  if (!sanitizedAppData.description) {
    delete sanitizedAppData.description
  }
  if (!sanitizedAppData.summary) {
    delete sanitizedAppData.summary
  }
  if (!sanitizedAppData.supportEmail) {
    delete sanitizedAppData.supportEmail
  }
  if (!sanitizedAppData.telephone) {
    delete sanitizedAppData.telephone
  }
  if (!sanitizedAppData.homePage) {
    delete sanitizedAppData.homePage
  }
  if (!sanitizedAppData.launchUri) {
    delete sanitizedAppData.launchUri
  }

  return sanitizedAppData
}

export const handleSubmitApp =
  ({
    appId,
    dispatch,
    setSubmitting,
    onSuccess,
    onError,
    currentOrganisation,
    setIsListing,
  }: {
    appId: string
    dispatch: Dispatch
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess: () => void
    onError: () => void
    currentOrganisation?: DeveloperModel
    setIsListing: React.Dispatch<React.SetStateAction<boolean>>
  }) =>
  (appModel: CustomCreateRevisionModal) => {
    setSubmitting(true)

    const appPreFormat = { ...appModel }
    delete appPreFormat.authFlow
    const { limitToClientIds, redirectUris, signoutUris, ...otherData } = appPreFormat
    let appToSubmit: CreateAppRevisionModel
    if (appModel.authFlow === CLIENT_SECRET) {
      appToSubmit = otherData
    } else {
      appToSubmit = {
        ...otherData,
        redirectUris: redirectUris ? redirectUris.split(',') : [],
        signoutUris: signoutUris ? signoutUris.split(',') : [],
      }
    }

    if (appModel.isPrivateApp === 'yes') {
      appToSubmit.limitToClientIds = limitToClientIds ? limitToClientIds.replace(/ /g, '').split(',') : []
    }

    if (appModel.isPrivateApp === 'no') {
      appToSubmit.limitToClientIds = []
    }
    const sanitizeData = sanitizeAppData(appToSubmit)

    const isCanList = currentOrganisation?.status !== 'pending' && currentOrganisation?.status !== 'incomplete'

    const products = appModel?.products?.split(',').filter(Boolean)

    if (!isCanList && !sanitizeData.isListed) {
      setIsListing(false)
    }

    if (!isCanList && sanitizeData.isListed) {
      sanitizeData.isListed = false
      setIsListing(true)
    }

    dispatch(
      createAppRevision({
        ...sanitizeData,
        id: appId,
        products,
        successCallback: onSuccess,
        errorCallback: onError,
      }),
    )
  }

export const handleSubmitAppSuccess =
  (
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setIsShowBillingNotification: React.Dispatch<React.SetStateAction<boolean>>,
  ) =>
  () => {
    setSubmitting(false)
    setIsShowBillingNotification(true)
  }

export const handleSubmitAppError = (setSubmitting: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setSubmitting(false)
}

export const handleGoBackToApps = (history: History) => {
  return () => {
    history.push(Routes.APPS)
  }
}

export type HandleOpenAppPreview = {
  scopes: ScopeModel[]
  categories: CategoryModel[]
  values: FormikValues
  appId: string
  appDetails?: AppDetailModel & { apiKey?: string }
}

export const handleOpenAppPreview =
  ({ appDetails, values, scopes, categories, appId = 'submit-app' }: HandleOpenAppPreview) =>
  () => {
    const { iconImageUrl, screen1ImageUrl, screen2ImageUrl, screen3ImageUrl, screen4ImageUrl, screen5ImageUrl } = values

    const media = [iconImageUrl, screen1ImageUrl, screen2ImageUrl, screen3ImageUrl, screen4ImageUrl, screen5ImageUrl]
      .filter((image) => image)
      .map((image) => ({ uri: image, type: image === iconImageUrl ? 'icon' : 'image' }))

    const appDetailState = {
      ...appDetails,
      ...values,
      scopes: scopes.filter((scope) => values.scopes.includes(scope.name)),
      category: categories.find((category) => values.categoryId === category.id),
      media,
    }

    const url = routes.APP_PREVIEW.replace(':appId', appId)
    localStorage.setItem('developer-preview-app', JSON.stringify(appDetailState))
    window.open(url, '_blank')
  }

export const modalContent = {
  admin: {
    incomplete: {
      title: 'Account Information Required',
      content: (
        <div>
          Any changes have been saved successfully.
          <br />
          However, before you can list an app in the Marketplace (&apos;Submit for approval&apos;), you will first need
          to submit your account information.
          <br />
          Please visit the&nbsp;
          <Link to="/settings/billing">&apos;Billing&apos;</Link> page, within Settings, to complete.
        </div>
      ),
    },
    pending: {
      title: 'Account Information Pending',
      content: (
        <div>
          Any changes have been saved successfully.
          <br />
          However, as we are currently verifying your account information you will not be able to list your app in the
          Marketplace (&apos;Submit for approval&apos;) until this has been confirmed.
          <br />
          To check the status of your account, please visit the&nbsp;
          <Link to="/settings/billing">&apos;Billing&apos;</Link> page.
        </div>
      ),
    },
  },
  user: {
    incomplete: {
      title: 'Account Information Required',
      content: (
        <div>
          Any changes have been saved successfully.
          <br />
          However, as your account information has not yet been completed you will be unable to list your app in the
          Marketplace (&apos;Submit for approval&apos;), please ask the Admin of your organisation to visit the
          &apos;Billing&apos; page under &apos;Settings&apos; to complete.
        </div>
      ),
    },
    pending: {
      title: 'Account Information Pending',
      content: (
        <div>
          Any changes have been saved successfully.
          <br />
          However, your account information is currently being reviewed by our Accounts Department. Once your account
          has been confirmed, you will be to list your app in the Marketplace (&apos;Submit for approval&apos;).
          <br />
          The Admin of your organisation can check the status of your account by visiting the &apos;Billing&apos; page
          under &apos;Settings&apos;.
        </div>
      ),
    },
  },
}

export const handleCloseModal = (setIsShowBillingNotification: React.Dispatch<React.SetStateAction<boolean>>) => () => {
  setIsShowBillingNotification(false)
}

export const DeveloperEditApp: React.FC<DeveloperSubmitAppProps> = () => {
  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const [isShowBillingNotification, setIsShowBillingNotification] = React.useState<boolean>(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const { appid } = useParams<{ appid: string }>()
  const appDetailState = useSelector(selectAppDetailState)
  const appCategories = useSelector(selectCategories)
  const scopes = useSelector(selectScopeList)
  const currentUser = useSelector(selectCurrentMemberData)
  const currentOrganisation = useSelector(selectSettingsPageDeveloperInformation)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = getDeveloperIdFromConnectSession(connectSession)
  const [isListing, setIsListing] = React.useState<boolean>(false)

  const goBackToApps = React.useCallback(handleGoBackToApps(history), [history])

  const { isLoading, errorMessage, data } = appDetailState
  if (isLoading) {
    return <Loader label="Loading" fullPage />
  }

  if (errorMessage) {
    return <Alert type="danger" message="Failed to fetch. Please try later." />
  }

  if (!data) {
    return null
  }

  const isPendingRevisionsExist = appDetailState.data?.pendingRevisions
  /**
   * When navigate to edit page, we still may have appDetailState data of previous editted app in redux
   * store so we need to check the current app and the old app must have same id. If not don't redirect
   * to APPS route.
   */
  const hasOldAppDetailData = appDetailState.data?.id !== null && appid !== appDetailState.data?.id
  if (isPendingRevisionsExist && !hasOldAppDetailData) {
    return <Redirect to={`${Routes.APPS}/${appid}`} />
  }

  const appId = data.id ?? ''
  const initialValues = generateInitialValues(data, developerId)

  return (
    <>
      <H3>Edit App</H3>
      <Formik
        validationSchema={validationSchemaSubmitRevision}
        initialValues={initialValues}
        onSubmit={handleSubmitApp({
          appId,
          dispatch,
          setSubmitting,
          onSuccess: handleSubmitAppSuccess(setSubmitting, setIsShowBillingNotification),
          onError: handleSubmitAppError(setSubmitting),
          currentOrganisation,
          setIsListing,
        })}
      >
        {({ setFieldValue, values, errors }) => {
          const { authFlow, isPrivateApp } = values
          const isListed = values.isListed
          return (
            <Form noValidate={true}>
              <GeneralInformationSection isListed={!!isListed} isFreeVal={values.isFree} />
              <AgencyCloudIntegrationSection />
              {/* Section not required right now - eventually we will remove but
               testing with users first to see if it causes confusion */}
              {/* <AuthenticationFlowSection authFlow={authFlow} setFieldValue={setFieldValue} /> */}
              <RedirectUriSection authFlow={authFlow} isPrivateApp={isPrivateApp} setFieldValue={setFieldValue} />
              <UploadImageSection isListed={!!isListed} />
              <MarketplaceStatusSection />
              {window.reapit.config.appEnv !== 'production' && <ReapitProductsSection app={data} />}
              <PermissionSection scopes={scopes} errors={errors} isListed={Boolean(isListed)} />
              <Section>
                {renderErrors(errors as unknown as Record<string, string | string[]>)}
                <LevelRight>
                  <ButtonGroup hasSpacing>
                    <Button onClick={goBackToApps} variant="danger" type="button">
                      Back To Apps
                    </Button>
                    <Button
                      onClick={handleOpenAppPreview({
                        appDetails: appDetailState.data || {},
                        values,
                        scopes,
                        categories: appCategories,
                        appId: appid,
                      })}
                      variant="secondary"
                      type="button"
                    >
                      Preview
                    </Button>
                    <Button
                      type="submit"
                      dataTest="submit-app-button"
                      variant="primary"
                      loading={submitting}
                      disabled={submitting}
                    >
                      Submit App
                    </Button>
                  </ButtonGroup>
                </LevelRight>
              </Section>
              <Input
                dataTest="submit-app-developer-id"
                type="hidden"
                labelText={formFields.developerId.label as string}
                id={formFields.developerId.name}
                name={formFields.developerId.name}
              />
            </Form>
          )
        }}
      </Formik>
      {currentUser?.role && currentOrganisation?.status && (
        <ModalV2
          isCentered={true}
          visible={isShowBillingNotification && isListing}
          onClose={handleCloseModal(setIsShowBillingNotification)}
          title={modalContent?.[currentUser.role]?.[currentOrganisation.status]?.title}
          footer={[
            <Button key="close" onClick={handleCloseModal(setIsShowBillingNotification)}>
              Close
            </Button>,
          ]}
        >
          {modalContent?.[currentUser.role]?.[currentOrganisation.status]?.content}
        </ModalV2>
      )}
      {isShowBillingNotification && !isListing && <Redirect to={Routes.APPS} />}
    </>
  )
}

export default DeveloperEditApp
