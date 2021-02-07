import React, { useState } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addLead } from '../../actions/leads'

const Form = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = e => {
    e.preventDefault()

    props.addLead({
      name, email, message
    })

    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className='card card-body mt-4 mb-4'>
      <h2>Add Lead Form</h2>

      <form onSubmit={ e => onSubmit(e) }>
        <div className='form-group'>
          <label>
            Name
          </label>
          <input
            name='name'
            type='text'
            className='form-control'
            value={ name }
            onChange={ e => setName(e.target.value) }
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
            Message
          </label>
          <textarea
            name='message'
            type='text'
            className='form-control'
            value={ message }
            onChange={ e => setMessage(e.target.value) }
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

Form.propTypes = {
  addLead: PropTypes.func.isRequired
}

export default connect(null, { addLead })(Form)
