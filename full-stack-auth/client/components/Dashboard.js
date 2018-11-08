import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'

import requireAuth from './requireAuth'

export default requireAuth(
  class Dashboard extends PureComponent {
    render() {
      if (!this.props.data.user) {
        return <div>Loading...</div>
      }
      return <div>Here is the super secret user dashboard</div>
    }
  }
)
