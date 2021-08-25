import React, { useContext } from 'react'
import '../shared/providers/styles/styles.providers.scss'
import './App.scss'
import AppLayout from '../shared/layouts/'
import { BrowserRouter as Router, BrowserRouter, Route, Switch } from 'react-router-dom'
import { routes } from '../shared/routes/routes'
import { Login } from '../shared/layouts/login/login'
import { QueryParamProvider } from 'use-query-params'
import { SessionContext } from '../shared/providers/context/session.provider'
import { ISessionContext } from '../shared/providers/context/session.interface'
import { ChatProvider } from '../shared/providers/context/chat.provider'

const App = () => {
  const { isAuthenticated }: any = useContext<ISessionContext>(SessionContext)
  return (
    <BrowserRouter>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          {isAuthenticated && (
            <ChatProvider>
              <AppLayout>
                <Switch>
                  {routes.map(route => (
                    <Route exact path={route.routeTo} component={route.component} />
                  ))}
                </Switch>
              </AppLayout>
            </ChatProvider>
          )}
          {!isAuthenticated && (
            <Switch>
              <Route exact path="*" component={Login} />
            </Switch>
          )}
        </QueryParamProvider>
      </Router>
    </BrowserRouter>
  )
}

export default App
