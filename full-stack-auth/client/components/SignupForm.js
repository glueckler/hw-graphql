import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import AuthForm from './AuthForm'
import { hashHistory } from 'react-router'

import SignupMutation from '../mutations/Signup'
import CurrentUserQuery from '../queries/CurrentUser'

export default graphql(CurrentUserQuery)(
  graphql(SignupMutation)(
    class SignupForm extends PureComponent {
      constructor(props) {
        super(props)

        this.state = {
          errors: null,
        }
      }

      componentWillUpdate(nextProps) {
        // here is the login navigation logic
        // if at first there was not a user (this.props)
        // and then there is in the next update (nextProps)
        // then a user must have just logged in
        // and we'll navigate to the dashboard
        if (!this.props.data.user && nextProps.data.user) {
          // redirect
          hashHistory.push('/dashboard')
        }
      }

      handleSignup({ username: e, password: p }) {
        this.props
          .mutate({
            variables: {
              e,
              p,
            },
            refetchQueries: [{ query: CurrentUserQuery }],
          })
          .then(() => {})
          .catch(({ graphQLErrors: gqlErrs }) => {
            if (!gqlErrs) return
            this.setState({
              errors: (
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
            <h3>Sign Up</h3>
            <AuthForm
              onSubmit={this.handleSignup.bind(this)}
              errors={this.state.errors}
            />
          </div>
        )
      }
    }
  )
)
