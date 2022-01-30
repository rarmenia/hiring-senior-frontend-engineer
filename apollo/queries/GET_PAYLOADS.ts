import {gql} from '@apollo/client';

export interface Payloads {
  payloads: Payload[];
}

export interface Payload {
  id: string;
  customers?: string;
  nationality?: string;
  payload_mass_kg?: number;
}

const GET_PAYLOADS = gql`
    query GetPayloadStats {
        payloads {
            id
            customers,
            nationality,
            payload_mass_kg
        }
    }
`;

export default GET_PAYLOADS;
