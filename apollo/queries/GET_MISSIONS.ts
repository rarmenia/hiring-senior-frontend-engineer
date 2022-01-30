import {Payload} from './GET_PAYLOADS';
import {gql} from '@apollo/client';

export interface Missions {
  missions: Mission[]
}

export interface Mission {
  id: string;
  name: string;
  payloads: Payload[]
}

const GET_MISSIONS = gql`
  query GetMissions {
      missions {
          id
          name
          payloads {
              id
          }
      }
  }
`;

export default GET_MISSIONS;
