import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getLeads, deleteLead } from '../../actions/leads'

const Leads = (props) => {
  
  useEffect(() => {
    props.getLeads()
  }, [])

  const removeLead = (e, id) => {
    e.preventDefault()

    props.deleteLead(id)
  }

  return (
    <div>
      <h2>Leads List</h2>

      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { props.leads.map(lead => (
            <tr key={ lead.id }>
              <td>{ lead.id }</td>
              <td>{ lead.name }</td>
              <td>{ lead.email }</td>
              <td>{ lead.message }</td>
              <td>
                <button className='btn btn-danger btn-sm' onClick={ e => removeLead(e, lead.id) }>
                  Delete
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}

// Unnecessary
Leads.propTypes = {
  leads: PropTypes.array.isRequired,
  getLeads: PropTypes.func.isRequired,
  deleteLead: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  leads: state.leads.leads
})

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads)
