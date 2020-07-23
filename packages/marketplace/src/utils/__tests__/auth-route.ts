import { getAuthRoute, getDefaultRoute, getDefaultPath } from '../auth-route'
import Routes from '../../constants/routes'

describe('getAuthRoute', () => {
  it('should return correct route', () => {
    expect(getAuthRoute()).toEqual(Routes.LOGIN)
  })
})

describe('getDefaultRoute', () => {
  it('should return correct route', () => {
    expect(getDefaultRoute()).toEqual(`${window.location.origin}${Routes.INSTALLED_APPS}`)
  })
})

describe('getDefaultPath', () => {
  it('should return INSTALLED_APPS ', () => {
    expect(getDefaultPath()).toEqual(Routes.INSTALLED_APPS)
  })
})
