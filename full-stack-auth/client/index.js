import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'

// add some configuration options for how graphql makes requests
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    // allows us to send the cookies!!
    credentials: 'same-origin',
  },
})

const client = new ApolloClient({
  dataIdFromObject(o) {
    return o.id
  },
  networkInterface,
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={Dashboard} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
