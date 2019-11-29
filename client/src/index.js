import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import App from "./App"

import "./index.css"


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql/'
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>, document.getElementById('root')
  );


