import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { PrivateRoute } from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getAccess } from '../../utils/get-access'

jest.mock('../../utils/get-access', () => ({
  getAccess: jest.fn(() => true),
}))

describe('PrivateRouter', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  it('should match a snapshot if has access', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.LOGIN, key: 'loginRoute' }]}>
            <PrivateRoute component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot if has no access', () => {
    ;(getAccess as jest.Mock).mockReturnValue(false)

    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.LOGIN, key: 'loginRoute' }]}>
            <PrivateRoute component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
