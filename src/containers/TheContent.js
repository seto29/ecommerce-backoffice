import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const token = Cookies.get('token');

  return (
    <main className="c-main">
    {
      token?
        <CContainer fluid>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )} />
                )
              })}
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Suspense>
        </CContainer>
      :
        <Redirect
        to="/login"/>
    }
    </main>
  )
}

export default React.memo(TheContent)
