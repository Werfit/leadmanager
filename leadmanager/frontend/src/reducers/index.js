import { combineReducers } from 'redux'

import auth from './auth'
import leads from './leads'
import errors from './errors'
import messages from './messages'

export default combineReducers({
  leads, errors, messages, auth
})