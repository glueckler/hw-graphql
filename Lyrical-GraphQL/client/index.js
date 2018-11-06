import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  Router, Route, hashHistory, IndexRoute,
} from 'react-router';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';

// empty config object.. apollo makes assumptions that work for now
// like /graphql route for requests
const client = new ApolloClient({});

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="song/new" component={SongCreate} />
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root'),
);
