import React, { PureComponent } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import LoginMutation from '../mutations/Login'
import CurrentUser from '../queries/CurrentUser'

export default graphql(LoginMutation)(
  class LoginForm extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        formErrors: null,
      }
    }

    handleSubmit({ username: e, password: p }) {
      this.props
        .mutate({
          variables: {
            e,
            p,
          },
          refetchQueries: [{ query: CurrentUser }],
        })
        .catch(({ graphQLErrors: gqlErrs }) => {
          if (!gqlErrs) return
          this.setState({
            formErrors: (
              <ul>
                {gqlErrs.map(e => (
                  <li key={e.message}>{e.message}</li>
                ))}
              </ul>
            ),
          })
        })
    }
    render() {
      return (
        <div>
          <AuthForm
            onSubmit={this.handleSubmit.bind(this)}
            errors={this.state.formErrors}
          />
        </div>
      )
    }
  }
)
