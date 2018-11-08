import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'

import App from './components/App'

// add some configuration options for how graphql makes requests
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    // allows us to send the cookies!!
    credentials: 'same-origin',
  }
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
        <Route path="/" component={App}></Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
