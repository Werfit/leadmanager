import React, { useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import store from '../store'
import { loadUser } from '../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from './layout/Header'
import Alerts from './layout/Alerts'

import Dashboard from './leads/Dashboard'

import Login from './accounts/Login'
import Register from './accounts/Register'

import PrivateRoute from './common/PrivateRoute'

const App = () => {
  useState(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <PrivateRoute exact path='/' component={ Dashboard } />

            <Route exact path='/login' component={ Login } />
            <Route exact path='/register' component={ Register } />
          </Switch>

          <Alerts />
        </div>
      </Router>
    </>
  )
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(App)