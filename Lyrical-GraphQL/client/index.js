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
import SongDetail from './components/SongDetail';

// empty config object.. apollo makes assumptions that work for now
// like /graphql route for requests
const client = new ApolloClient({
  // identifying each graphql object allows apollo to update react when a specific record is updated
  // apollo makes no assumption about how to keep track of records therefor we tell it to use id
  // make sure you request the right data back from the mutation (if title is necessary it must be requested)
  dataIdFromObject: o => o.id,
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="songs/new" component={SongCreate} />
        <Route path="songs/:id" component={SongDetail} />
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root'),
);
