import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alerts = ({ errors, msg }) => {
  const [toShowErrors, setToShowErrors] = useState(false)
  const [toShowMsgs, setToShowMsgs] = useState(false)

  useEffect(() => {
    setToShowErrors(errors.status ? true : false)
  }, [errors])

  useEffect(() => {
    setToShowMsgs(msg.exists)
  }, [msg])

  if (toShowErrors)
    return ( 
      <div className='alert alert-danger'>
        { errors.msg.name && <div>Name: { errors.msg.name.join() } </div> }
        { errors.msg.email && <div>Email: { errors.msg.email.join() } </div> }
        { errors.msg.message && <div>Message: { errors.msg.message.join() } </div> }
        { errors.msg.password && <div>Password: { errors.msg.password.join() } </div> }
        { errors.msg.detail !== '' && <div>{ errors.msg.detail } </div> }
        { errors.msg.non_field_errors && <div>{ errors.msg.non_field_errors } </div> }
      </div>
    )

  return toShowMsgs && (
    <div className='alert alert-success'>
      { msg.msg }
    </div>
  )
}

Alerts.propTypes = {
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  msg: state.messages
})

export default connect(mapStateToProps)(Alerts)
