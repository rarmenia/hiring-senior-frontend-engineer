import ResolveLaunchesWithMissions, {LaunchesWithMissions} from './ResolveLaunchesWithMissions';
import {LaunchesInput} from '../../../../apollo/queries/GET_LAUNCHES';
import GET_PAYLOADS, {Payload, Payloads} from '../../../../apollo/queries/GET_PAYLOADS';
import ApolloResolver from '../../generics/resolvers/ApolloResolver';

interface Props {
  launchesVars: LaunchesInput,
  children: (args: {data?: LaunchesWithMissions, loading: boolean}) => JSX.Element;
}

function resolveData(launches?: LaunchesWithMissions, payloads?: Payloads): LaunchesWithMissions | undefined {
  if (!(launches && payloads)) return undefined;
  if (!(launches.launches && payloads.payloads)) return undefined;
  return {
    launches: launches.launches.map(launch => ({
      ...launch,
      missions: launch.missions?.map(mission => ({
        ...mission,
        payloads: payloads.payloads.filter(payload => mission.payloads.map(_ => _?.id ?? '').includes(payload.id)) ?? []
      })) ?? []
    }))
  }
}

export function getPayloads(launches?: LaunchesWithMissions): Payload[] | undefined {
  if (!launches) return undefined;
  return launches.launches.reduce((acc: Payload[], launch) =>
      [
        ...acc,
        ...(launch.missions?.reduce((payloads: Payload[], mission) =>
            [
              ...payloads,
              ...(mission.payloads ?? [])
            ]
          ,[]) ?? [])
      ]
    ,[]);
}


export default function ResolveLaunchesWithMissionPayloads(props: Props): JSX.Element {

  return (
    <ResolveLaunchesWithMissions launchesVars={props.launchesVars}>
      {(launches) => (
        <ApolloResolver<Payloads, {}> query={GET_PAYLOADS} vars={{}}>
          {(payloads) => (
            <>
              {
                props.children({
                  loading: payloads.loading || launches.loading,
                  data: resolveData(launches.data, payloads.data)
                })
              }
            </>
          )}
        </ApolloResolver>
      )}
    </ResolveLaunchesWithMissions>
  )

}
