import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import ServerSideTable from './components/ServerSideTable'
import { query } from "./query";
import { headers } from "./headers";


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const link = from([
  errorLink,
  new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  }),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ServerSideTable
          gqlquery={query['doctor']}
          headers={headers['doctor']}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
