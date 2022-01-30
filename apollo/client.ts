import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const typeDefs = gql`
    type Query {
        payloads: [Payload]!
    }
    type Payload {
        id: ID,
        customers: [String],
        nationality: String,
        payload_mass_kg: Float
    }
`

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
  typeDefs,
})

export default client;
