import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient(
  {
    uri: 'https://promoted-hawk-47.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret': '0jp1wFdiMXoNuRozBN8FnQnODKWnwkIOIJmYYLQv884KrZZqFuq9IjL7l1vmBEKx'
    },
    cache: new InMemoryCache()
  }
);

ReactDOM.render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

