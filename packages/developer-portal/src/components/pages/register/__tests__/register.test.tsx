import * as React from 'react'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import {
  Register,
  onSubmit,
  onDeclineTermsAndConditions,
  onLoginButtonClick,
  handleSetFormDefault,
  formSubmit,
} from '../register'
import { developerCreate } from '@/actions/developer'
import { DATE_TIME_FORMAT } from '@reapit/elements-legacy'
import MockDate from 'mockdate'
import appState from '@/reducers/__stubs__/app-state'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { getMockRouterProps } from '@/utils/mock-helper'

const mockRegisterFormValues: CreateDeveloperModel = {
  name: 'test',
  companyName: 'test',
  email: 'test@email.com',
  telephone: '9991112311',
  agreedTerms: '',
}

describe('Register', () => {
  const { history } = getMockRouterProps({})
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.REGISTER, key: 'registerRoute' }]}>
            <Register />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('onSubmit', () => {
    beforeAll(() => {
      MockDate.set(new Date('2020-05-21'))
    })
    afterAll(() => {
      MockDate.reset()
    })
    it('should run correctly', () => {
      const fn = onSubmit(spyDispatch)
      fn(mockRegisterFormValues)
      expect(spyDispatch).toBeCalledWith(
        developerCreate({
          ...mockRegisterFormValues,
          agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
        }),
      )
    })
  })
  describe('onDeclineTermsAndConditions', () => {
    it('should run correctly', () => {
      const mockSetTermsAndConditionsModalVisible = jest.fn()
      const fn = onDeclineTermsAndConditions(mockSetTermsAndConditionsModalVisible)
      fn()
      expect(mockSetTermsAndConditionsModalVisible).toBeCalledWith(false)
    })
  })
  describe('onLoginButtonClick', () => {
    it('should redirect to developer login page', () => {
      const fn = onLoginButtonClick(history)
      fn()
      expect(history.replace).toBeCalledWith(`${Routes.LOGIN}`)
    })
  })
  describe('handleSetFormDefault', () => {
    it('should run correctly', () => {
      const dispatch = jest.fn()
      const fn = handleSetFormDefault(dispatch)
      fn()
      expect(dispatch).toBeCalled()
    })
  })
  describe('formSubmit', () => {
    it('should run correctly', () => {
      const testFunc = (value) => {
        expect(value).toBeTruthy()
      }
      formSubmit(testFunc)
    })
  })
})
