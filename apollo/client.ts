import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const typeDefs = gql`
    
    type Query {
        launchpads: [LaunchPad]
        launches(find: LaunchesFind, sort: String, order: String, limit: Int, offset: Int): [Launch]
        missions: [Mission]
        payloads: [Payload]
    }
    
    input LaunchesFind {
        site_id: String
        mission_name: String
    }
    
    type LaunchPad {
        id: ID!
        name: String
    }
    
    type Launch {
        id: ID!
        launch_site: LaunchSite
        mission_id: [String]
        mission_name: String
        launch_success: Boolean
        launch_date_utc: String
        rocket: Rocket
    }
    type LaunchSite {
        site_id: String!
        site_name: String!
        site_name_long: String!
    }
    type Rocket {
        rocket_name: String
    }
    type Mission {
        id: ID!
        name: String
        payloads: [Payload]
    }
    type Payload {
        id: ID!
        customers: [String]
        nationality: String
        payload_mass_kg: Float
    }
`

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
  typeDefs,
})

export default client;
