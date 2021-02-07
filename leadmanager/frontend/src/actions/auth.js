import axios from 'axios'

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED, LOUGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILED } from './types'
import { returnErrors } from './messages'

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({
    type: USER_LOADING
  })

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// LOGIN USER
export const loginUser = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request Body
  const body = JSON.stringify({
    username, password
  })

  axios.post('/api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILED
      })
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

// LOGOUT USER
export const logoutUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({
    type: USER_LOADING
  })

  axios.post('/api/auth/logout', null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOUGOUT_SUCCESS
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

// REGISTER USER
export const registerUser = user => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request Body
  const body = JSON.stringify(user)

  axios.post('/api/auth/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAILED
      })
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

// SET UP TOKEN WITH CONFIG
export const tokenConfig = getState => {
  // Get token from the state
  const token = getState().auth.token

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token, add to headers config
  if (token)
    config.headers['Authorization'] = `Token ${token}`

  return config
}