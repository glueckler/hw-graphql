import React, { PureComponent } from 'react'

export default class AuthForm extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    })
  }

  handlePassChange(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.props.onSubmit) return
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="email"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <input
          placeholder="password"
          type="password"
          value={this.state.password}
          onChange={this.handlePassChange}
        />
        <input type="submit" />
      </form>
    )
  }
}
