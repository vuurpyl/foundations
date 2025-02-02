import * as React from 'react'
import { mount } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import { DeveloperEditionModal, handleAfterClose, handleOnConfirm, handleOnCreated } from '../developer-edition-modal'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { developerCreateSubscriptionClearError } from '@/actions/developer-subscriptions'
import { developerStub } from '@/sagas/__stubs__/developer'

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Object),
  useSelector: jest.fn(() => jest.fn()),
}))

describe('DeveloperEditionModal', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when visible', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DeveloperEditionModal visible={true} setSubscribingState={jest.fn()} />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when not visible', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DeveloperEditionModal visible={false} setSubscribingState={jest.fn()} />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleOnConfirm', () => {
    it('should run correctly', () => {
      const developer = { id: developerStub.id, name: developerStub.name, email: developerStub.email }
      const dispatch = jest.fn()
      const onCreated = jest.fn((developer) => jest.fn(developer))
      handleOnConfirm(developer, dispatch, onCreated)()
      expect(dispatch).toBeCalled()
    })
  })

  describe('handleAfterClose', () => {
    it('should run correctly', () => {
      const setSuccess = jest.fn()
      const dispatch = jest.fn()
      const setSubscribingState = jest.fn()
      handleAfterClose(setSuccess, dispatch, setSubscribingState)()
      expect(setSuccess).toBeCalled()
      expect(setSuccess).toBeCalledWith(false)
      expect(dispatch).toBeCalled()
      expect(dispatch).toBeCalledWith(developerCreateSubscriptionClearError())
      expect(setSubscribingState).toBeCalled()
    })
  })

  describe('handleOnCreated', () => {
    it('should run correctly', () => {
      const setSuccess = jest.fn()
      const setSelectedDeveloper = jest.fn()
      handleOnCreated(setSelectedDeveloper, setSuccess)(developerStub)()
      expect(setSuccess).toBeCalled()
      expect(setSuccess).toBeCalledWith(true)
      expect(setSelectedDeveloper).toBeCalled()
      expect(setSelectedDeveloper).toBeCalledWith(developerStub)
    })
  })
})
