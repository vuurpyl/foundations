import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, generateMenuConfig, callbackAppClick } from '../menu'
import { AppState } from '../../../../core/app-state'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({
    location: 'location',
  })),
}))

jest.mock('../../../../core/app-state')

describe('Menu', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Menu />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const location = {
        hash: 'mockHash',
        key: 'mockKey',
        pathname: 'mockPathname',
        search: '',
        state: {},
      }
      const logoutCallback = jest.fn()
      const setAppState = jest.fn()
      const result = generateMenuConfig(logoutCallback, location, setAppState, {} as AppState, true)
      expect(result).toBeDefined()
    })
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      const fn = callbackAppClick()
      expect(fn).toEqual('https://marketplace.reapit.cloud/installed')
    })
  })
})
