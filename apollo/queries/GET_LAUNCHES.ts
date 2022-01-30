import {gql} from '@apollo/client';

export interface LaunchesInput {
  site_id?: string;
  mission_name?: string;
  sort?: string;
  order?: string;
  limit?: number;
  offset?: number;
}

export interface Launches {

  launches: Launch[]

}

export interface Launch {
  id: string;
  launch_site: LaunchSite;
  mission_id: string[];
  launch_success: boolean;
  launch_date_utc: string;
  rocket: Rocket;
}

export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string
}

export interface Rocket {
  rocket_name: string;
}

const GET_LAUNCHES = gql`
  query GetLaunches($site_id: String, $mission_name: String, $sort: String, $order: String, $limit: Int, $offset: Int) {
      launches(find: {site_id: $site_id, mission_name: $mission_name}, sort: $sort, order: $order, limit: $limit, offset: $offset) {
          id
          launch_site {
              site_id
              site_name
              site_name_long
          },
          mission_id
          launch_success,
          launch_date_utc,
          rocket {
              rocket_name
          }
      }
  }
`

export default GET_LAUNCHES;
