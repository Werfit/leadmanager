import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/auth'

const Header = ({ isAuthenticated, user, ...props }) => {
  const onLogOut = e => {
    e.preventDefault()

    props.logoutUser()
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className='container'>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Lead Manager</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              { !isAuthenticated ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>Login</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/Register'>Register</Link>
                </li>
              </>) : (
                <>
                  <li className='nav-item navbar-text mr-3'>
                    <strong>
                      { user && user.username }
                    </strong>
                  </li>
                  <li className='nav-item'>
                    <button className='nav-link btn btn-info btn-sm text-light' onClick={ e => onLogOut(e) }>Log out</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const stateMapToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(stateMapToProps, { logoutUser })(Header)
