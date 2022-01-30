import {gql} from '@apollo/client';

export interface Launchpads {
  launchpads: Launchpad[];
}

export interface Launchpad {
  id: string;
  name: string;
}

const GET_LAUNCHPADS = gql`
    query GetLaunchpads {
        launchpads {
            id
            name
        }
    }
`

export default GET_LAUNCHPADS;
