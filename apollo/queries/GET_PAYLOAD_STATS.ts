import {gql} from '@apollo/client';

export interface PayloadsStats {
  payloads: PayloadStats[];
}

export interface PayloadStats {
  id: string;
  customers: string;
  nationality: string;
  payload_mass_kg: number;
}

const GET_PAYLOAD_STATS = gql`
    query GetPayloadStats {
        payloads {
            id
            customers,
            nationality,
            payload_mass_kg
        }
    }
`;

export default GET_PAYLOAD_STATS;
