import { PortalProvider } from '@reapit/elements-legacy'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import * as React from 'react'

const App = () => {
  return (
    <Provider store={store.reduxStore}>
      <PortalProvider>
        <Router />
      </PortalProvider>
    </Provider>
  )
}

export default App
