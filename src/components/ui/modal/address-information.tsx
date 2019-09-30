import React from 'react'
import { Input, Button, SelectBox, SelectBoxOptions, CameraImageInput } from '@reapit/elements'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { oc } from 'ts-optchain'
import { DOCUMENT_TYPE } from '@/constants/appointment-detail'
import { ContactModel, AddressModel } from '@/types/contact-api-schema'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ReduxState } from '@/types/core'
import { checkListDetailShowModal, checkListDetailAddressUpdateData } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'

const optionsMonth = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' }
] as SelectBoxOptions[]

const MIN_YEAR = 1900
const MAX_YEAR = 2100

const renderYearOptions = () => {
  let i
  const yearArray: SelectBoxOptions[] = []
  for (i = MIN_YEAR; i <= MAX_YEAR; i++) {
    const year = { label: `${i}`, value: `${i}` } as SelectBoxOptions
    yearArray.push(year)
  }
  return yearArray
}

const optionsDocumentType = [
  { label: DOCUMENT_TYPE.MORTGATE, value: DOCUMENT_TYPE.MORTGATE },
  { label: DOCUMENT_TYPE.BILL, value: DOCUMENT_TYPE.BILL },
  { label: DOCUMENT_TYPE.TAX_BILL, value: DOCUMENT_TYPE.TAX_BILL },
  { label: DOCUMENT_TYPE.DRIVING_LICENSE, value: DOCUMENT_TYPE.DRIVING_LICENSE },
  { label: DOCUMENT_TYPE.PHOTO_CARD_DRIVING_LICENSE, value: DOCUMENT_TYPE.PHOTO_CARD_DRIVING_LICENSE },
  { label: DOCUMENT_TYPE.INSURANCE_CERTIFICATE, value: DOCUMENT_TYPE.INSURANCE_CERTIFICATE },
  { label: DOCUMENT_TYPE.STATE_PENSION, value: DOCUMENT_TYPE.STATE_PENSION },
  { label: DOCUMENT_TYPE.CURRENT_BENEFIT, value: DOCUMENT_TYPE.CURRENT_BENEFIT },
  { label: DOCUMENT_TYPE.BANK_STATEMENT, value: DOCUMENT_TYPE.BANK_STATEMENT },
  { label: DOCUMENT_TYPE.HOUSE_PURCHASE, value: DOCUMENT_TYPE.HOUSE_PURCHASE },
  { label: DOCUMENT_TYPE.CREDIT_STATEMENT, value: DOCUMENT_TYPE.CREDIT_STATEMENT },
  { label: DOCUMENT_TYPE.TAX_NOTIFICATION, value: DOCUMENT_TYPE.TAX_NOTIFICATION },
  { label: DOCUMENT_TYPE.ACCOUNT_DOCUMENT, value: DOCUMENT_TYPE.ACCOUNT_DOCUMENT },
  { label: DOCUMENT_TYPE.LETTER_FROM_COUNCIL, value: DOCUMENT_TYPE.LETTER_FROM_COUNCIL }
]

export const handleMoreThreeYear = ({ setShowMoreThreeYearInput, isShowMoreThreeYearInput }) => () => {
  setShowMoreThreeYearInput(!isShowMoreThreeYearInput)
}

export const AddressInput = ({ index, values, setFieldValue }) => {
  return (
    <div key={index}>
      <Input
        type="text"
        labelText="Type"
        id={`addresses[${index}][type]`}
        name={`addresses[${index}][type]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].type : null}
        onChange={() => setFieldValue(`values.addresses[${index}].type`)}
      />
      <Input
        type="text"
        labelText="Building Name"
        id={`addresses[${index}][buildingName]`}
        name={`addresses[${index}][buildingName]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].buildingName : null}
        onChange={() => setFieldValue(`values.addresses[${index}].buildingName`)}
      />
      <Input
        type="text"
        labelText="Building Number"
        id={`addresses[${index}][buildingNumber]`}
        name={`addresses[${index}][buildingNumber]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].buildingNumber : null}
        onChange={() => setFieldValue(`values.addresses[${index}].buildingNumber`)}
      />
      <Input
        type="text"
        labelText="Line 1"
        id={`addresses[${index}][line1]`}
        name={`addresses[${index}][line1]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].line1 : null}
        onChange={() => setFieldValue(`values.addresses[${index}].line1`)}
      />
      <Input
        type="text"
        labelText="Line 2"
        id={`addresses[${index}][line2]`}
        name={`addresses[${index}][line2]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].line2 : null}
        onChange={() => setFieldValue(`values.addresses[${index}].line2`)}
      />
      <Input
        type="text"
        labelText="Line 3"
        id={`addresses[${index}][line3]`}
        name={`addresses[${index}][line3]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].line3 : null}
        onChange={() => setFieldValue(`values.addresses[${index}].line3`)}
      />
      <Input
        type="text"
        labelText="Line 4"
        id={`addresses[${index}][line4]`}
        name={`addresses[${index}][line4]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].line4 : null}
        onChange={() => setFieldValue(`values.addresses[${index}].line4`)}
      />
      <Input
        type="text"
        labelText="Post Code"
        id={`addresses[${index}][postcode]`}
        name={`addresses[${index}][postcode]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].postcode : null}
        onChange={() => setFieldValue(`values.addresses[${index}].postcode`)}
      />
      <SelectBox
        labelText="Year"
        options={renderYearOptions()}
        id={`addresses[${index}]year`}
        name={`addresses[${index}]year`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].year : null}
        onChange={() => setFieldValue(`values.addresses[${index}].year`)}
      />
      <SelectBox
        labelText="Month"
        id={`addresses[${index}]month`}
        name={`addresses[${index}]month`}
        options={optionsMonth}
        value={values.addresses && values.addresses[index] ? values.addresses[index].month : null}
        onChange={() => setFieldValue(`values.addresses[${index}].month`)}
      />
      <SelectBox
        labelText="Document Type"
        id={`addresses[${index}]documentType`}
        name={`addresses[${index}]documentType`}
        options={optionsDocumentType}
        value={values.addresses && values.addresses[index] ? values.addresses[index].documentType : null}
        onChange={() => setFieldValue(`values.addresses[${index}].documentType`)}
      />
      <Input
        type="hidden"
        id={`addresses[${index}][documentImage]`}
        name={`addresses[${index}][documentImage]`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].documentImage : null}
        onChange={() => setFieldValue(`values.addresses[${index}].documentImage`)}
      />
      <CameraImageInput
        labelText="Upload file/Take a picture"
        id={`addresses[${index}]documentFileInput`}
        name={`addresses[${index}]documentFileInput`}
        value={values.addresses && values.addresses[index] ? values.addresses[index].documentFileInput : null}
        onChange={() => setFieldValue(`values.addresses[${index}].documentFileInput`)}
      />
    </div>
  )
}

export const renderExtraForm = ({ isShowMoreThreeYearInput, values, index, setFieldValue }) => {
  if (isShowMoreThreeYearInput) {
    return (
      <AddressInput data-test="address-input" key={index} index={index} values={values} setFieldValue={setFieldValue} />
    )
  }
}

export const renderForm = ({
  addresses,
  isShowMoreThreeYearInput,
  setShowMoreThreeYearInput,
  onNextHandler,
  onPrevHandler
}) => ({ values, setFieldValue }) => {
  return (
    <Form>
      {addresses.map((_, index) => {
        return <AddressInput key={index} index={index} values={values} setFieldValue={setFieldValue} />
      })}
      <div className={styles.moreThreeYearLink}>
        <a
          data-test="more-three-year"
          onClick={handleMoreThreeYear({ setShowMoreThreeYearInput, isShowMoreThreeYearInput })}
        >
          More than 3 year?
        </a>
      </div>
      {renderExtraForm({ isShowMoreThreeYearInput, values, setFieldValue, index: addresses.length })}
      <div className={styles.footerBtn}>
        <Button className="mr-2" variant="primary" type="submit">
          Submit
        </Button>
        <Button className="mr-2" variant="primary" type="button" onClick={onPrevHandler}>
          Previous
        </Button>
        <Button variant="primary" type="button" onClick={onNextHandler}>
          Next
        </Button>
      </div>
    </Form>
  )
}

export type AddressInformationProps = {
  contact: ContactModel
  onNextHandler: () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: any) => void
}

export const AddressInformation: React.FC<AddressInformationProps> = ({
  contact,
  onNextHandler,
  onPrevHandler,
  onHandleSubmit
}) => {
  const [isShowMoreThreeYearInput, setShowMoreThreeYearInput] = React.useState(false)
  return (
    <div>
      <Formik
        initialValues={{
          addresses: contact.addresses || []
        }}
        onSubmit={onHandleSubmit}
        render={renderForm({
          addresses: contact.addresses,
          isShowMoreThreeYearInput,
          setShowMoreThreeYearInput,
          onNextHandler,
          onPrevHandler
        })}
      />
    </div>
  )
}

export type MappedProps = {
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState): MappedProps => {
  return {
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
  }
}

export type MappedActions = {
  onNextHandler: () => void
  onPrevHandler: () => void
  onHandleSubmit: (values: AddressModel[]) => void
}

export type OwnPropsProps = {
  id: string
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnPropsProps): MappedActions => {
  return {
    onHandleSubmit: (values: any) => {
      const newValues = {
        ...values,
        id: ownProps.id
      }
      dispatch(checkListDetailAddressUpdateData(newValues))
    },
    onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.DECLARATION_RISK_MANAGEMENT)),
    onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.ADDRESS_INFORMATION))
  }
}

export const AddressInformationWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressInformation)

AddressInformationWithRedux.displayName = 'AddressInformationWithRedux'

export default AddressInformationWithRedux
