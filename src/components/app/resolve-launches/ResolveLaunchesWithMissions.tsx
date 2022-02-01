import {Launch, LaunchesInput} from '../../../../apollo/queries/GET_LAUNCHES';
import GET_MISSIONS, {Mission, Missions} from '../../../../apollo/queries/GET_MISSIONS';
import ResolveLaunches from './ResolveLaunches';
import ApolloResolver from '../../generics/resolvers/ApolloResolver';

export interface LaunchWithMissions extends Launch {
  missions?: Mission[]
}

export interface LaunchesWithMissions {
 launches: LaunchWithMissions[];
}

interface Props {

  launchesVars: LaunchesInput,
  children: (args: {data?: LaunchesWithMissions, loading: boolean}) => JSX.Element;

}

export default function ResolveLaunchesWithMissions(props: Props): JSX.Element {
  return (
    <ResolveLaunches queryVars={props.launchesVars}>
      {
        (launches) => (
          <ApolloResolver<Missions, {}> query={GET_MISSIONS} vars={{}}>
            {(missions) => (
              <>
                {
                  props.children({
                    loading: launches.loading || missions.loading,
                    data: !(launches && missions) ? undefined : ({
                      launches: launches.data?.launches.map(launch => ({
                        ...launch,
                        missions: missions.data?.missions.filter(mission => launch.mission_id.includes(mission.id)) ?? []
                      })) ?? []
                    })
                  })
                }
              </>
            )}
          </ApolloResolver>
        )
      }
    </ResolveLaunches>
  )
}
