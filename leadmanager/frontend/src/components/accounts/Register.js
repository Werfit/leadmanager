import React, { useState } from 'react' 
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { registerUser } from '../../actions/auth'
import { createError } from '../../actions/messages'

const Register = ({ isAuthenticated, ...props }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('') // Password confirmation

  const onSubmit = e => {
    e.preventDefault()

    if (pass !== pass2)
      props.createError({
        msg: {
          detail: 'Passwords are not equal'
        },
        status: 400
      })
    else
      props.registerUser({
        username, email, password: pass
      })
  }

  return !isAuthenticated ? (
    <div className='col-md-6 m-auto'>
      <div className='card card-body mt-5'>
        <h2 className='text-center'>Register</h2>

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
              Email
            </label>
            <input
              name='email'
              type='email'
              className='form-control'
              value={ email }
              onChange={ e => setEmail(e.target.value) }
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
            <label>
              Confirm password
            </label>
            <input
              name='password2'
              type='password'
              className='form-control'
              value={ pass2 }
              onChange={ e => setPass2(e.target.value) }
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  ) : <Redirect to='/' />
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { registerUser, createError })(Register)
 