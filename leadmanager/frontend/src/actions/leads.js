import axios from 'axios'

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, CREATE_MESSAGE } from './types'
import { createMessage, returnErrors} from './messages'
import { tokenConfig } from './auth'

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios.get('/api/leads/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// DELETE LEAD
export const deleteLead = id => (dispatch, getState) => {
  axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ msg: 'Lead is deleted', exists: true }))
      dispatch({
        type: DELETE_LEAD,
        payload: id
      })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// ADD LEAD
export const addLead = lead => (dispatch, getState) => {
  axios.post('/api/leads/', lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ msg: 'Lead is added', exists: true }))

      dispatch({
        type: ADD_LEAD,
        payload: res.data
      })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}