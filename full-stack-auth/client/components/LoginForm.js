import React, { PureComponent } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import LoginMutation from '../mutations/Login'
import CurrentUser from '../queries/CurrentUser'

export default graphql(LoginMutation)(
  class LoginForm extends PureComponent {
    handleSubmit({ username: e, password: p }) {
      this.props.mutate({
        variables: {
          e,
          p,
        },
        refetchQueries: [{ query: CurrentUser }]
      })
    }
    render() {
      return (
        <div>
          <AuthForm onSubmit={this.handleSubmit.bind(this)} />
        </div>
      )
    }
  }
)
