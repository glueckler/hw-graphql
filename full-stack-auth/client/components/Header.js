import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import CurrentUser from '../queries/CurrentUser'
import Logout from '../mutations/Logout'

class Header extends PureComponent {
  handleLogout() {
    this.props.mutate({
      refetchQueries: [{ query: CurrentUser }],
    })
  }

  renderButtons() {
    const { loading, user } = this.props.data
    if (loading) {
      return <div />
    }
    if (user) {
      return (
        <li>
          <a onClick={this.handleLogout.bind(this)}>Logout</a>
        </li>
      )
    }
    return (
      <div>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
      </div>
    )
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/">Home</Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    )
  }
}

export default graphql(Logout)(graphql(CurrentUser)(Header))
