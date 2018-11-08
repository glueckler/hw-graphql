import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { graphql } from 'react-apollo'

import CurrentUser from '../queries/CurrentUser'

export default WrappedComponent => {
  class hoc extends Component {
    componentDidUpdate(prevProps) {
      if (!this.props.data.user && !this.props.data.loading) {
        hashHistory.push('/')
      }
    }

    render() {
      if (this.props.data.loading) return <div>Loading..</div>
      if (!this.props.data.user) return <div>Not Auth</div>
      return <WrappedComponent {...this.props} />
    }
  }
  return graphql(CurrentUser)(hoc)
}
