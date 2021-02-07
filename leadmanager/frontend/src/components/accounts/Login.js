import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser } from '../../actions/auth'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const onSubmit = e => {
    e.preventDefault()

    props.loginUser(username, pass)
  }

  return !props.isAuthenticated ? (
    <div className='col-md-6 m-auto'>
      <div className='card card-body mt-5'>
        <h2 className='text-center'>Login</h2>
        <form onSubmit={ e => onSubmit(e) }>
          <div className='form-group'>
            <label>
              Name
            </label>
            <input
              name='name'
              type='text'
              className='form-control'
              value={ username }
              onChange={ e => setUsername(e.target.value) }
            />
          </div>
          <div className='form-group'>
            <label>
              Password
            </label>
            <input
              name='password'
              type='password'
              className='form-control'
              value={ pass }
              onChange={ e => setPass(e.target.value) }
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  ) : <Redirect to='/' />
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login)
 