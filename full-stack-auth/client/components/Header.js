import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import CurrentUser from '../queries/CurrentUser'

class Header extends PureComponent {
  render() {
    console.log(this.props.data)
    return (
      <div>
        I'm the Header
      </div>
    )
  }
}

export default graphql(CurrentUser)(Header)
