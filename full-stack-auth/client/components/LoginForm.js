import React, { PureComponent } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'
import LoginMutation from '../mutations/Login'
import CurrentUser from '../queries/CurrentUser'

// we use the current user query so the component updates
// when that query is ran (giving us access to whether a user is logged in)
export default graphql(CurrentUser)(
  graphql(LoginMutation)(
    class LoginForm extends PureComponent {
      constructor(props) {
        super(props)

        this.state = {
          formErrors: null,
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

      handleSubmit({ username: e, password: p }) {
        this.props
          .mutate({
            variables: {
              e,
              p,
            },
            refetchQueries: [{ query: CurrentUser }],
          })
          .then(() => {})
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
)
