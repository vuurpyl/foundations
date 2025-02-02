import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '@/core/store'
import { fetchFeatureApps, fetchAppDetail, fetchDeveloperApps } from '@/actions/apps'
import { fetchApps } from '@/actions/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import {
  selectClientId,
  selectDeveloperId,
  selectIsAdmin,
  selectProduct,
  selectSandboxDeveloper,
} from '@/selector/auth'
import { fetchDesktopIntegrationTypes } from '@/actions/desktop-integration-types'
// Needed for filtering but commented out for now
// import { fetchCategories } from '@/actions/categories'
import { APPS_PER_PAGE, FEATURED_APPS, GET_ALL_PAGE_SIZE, INSTALLED_APPS_PERPAGE } from '@/constants/paginator'
import { getNumberOfItems } from './browse-app'
import { fetchInstallationsList } from '../actions/installations'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1

  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession) return null
  const clientId = selectClientId(connectSession)
  const developerId = selectDeveloperId(connectSession)
  const isSandboxDeveloper = selectSandboxDeveloper(connectSession)
  const isDesktopAdmin = selectIsAdmin(connectSession)
  const product = selectProduct(connectSession)

  switch (route) {
    case Routes.APPS: {
      const numOfItemsPerPage = getNumberOfItems()
      // store.dispatch(fetchDesktopIntegrationTypes({}))
      // store.dispatch(fetchCategories({}))
      if (developerId) {
        store.dispatch(
          fetchDeveloperApps({
            pageNumber: page,
            pageSize: numOfItemsPerPage,
            developerId: [developerId],
            product,
          }),
        )
      }
      store.dispatch(fetchFeatureApps({ pageNumber: 1, pageSize: FEATURED_APPS, product }))
      store.dispatch(
        fetchApps({
          pageNumber: page,
          pageSize: numOfItemsPerPage,
          isInfinite: true,
          product,
        }),
      )
      break
    }
    case Routes.APP_DETAIL: {
      store.dispatch(fetchDesktopIntegrationTypes({}))
      if (id) {
        store.dispatch(fetchAppDetail({ id, clientId }))
      }
      break
    }
    case Routes.APP_DETAIL_MANAGE: {
      store.dispatch(fetchDesktopIntegrationTypes({}))
      if (id) {
        store.dispatch(fetchAppDetail({ id, clientId }))
      }
      break
    }
    case Routes.INSTALLED_APPS:
      store.dispatch(
        fetchApps({
          pageNumber: page,
          pageSize: INSTALLED_APPS_PERPAGE,
          onlyInstalled: true,
          developerId: isSandboxDeveloper && developerId ? [developerId] : undefined,
          showHiddenApps: true,
          product,
        }),
      )
      break
    case Routes.MY_APPS:
      store.dispatch(
        fetchApps({
          onlyInstalled: true,
          pageNumber: page,
          pageSize: APPS_PER_PAGE,
          developerId: isSandboxDeveloper && developerId ? [developerId] : undefined,
          product,
        }),
      )
      break
    case Routes.SETTINGS:
      if (isDesktopAdmin) {
        store.dispatch(fetchApps({ pageNumber: 1, pageSize: GET_ALL_PAGE_SIZE, clientId: '', product }))
        store.dispatch(
          fetchInstallationsList({
            pageNumber: 1,
            pageSize: GET_ALL_PAGE_SIZE,
            clientId: [clientId],
          }),
        )
      }
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
