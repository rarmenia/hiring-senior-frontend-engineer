import ResolveLaunchesWithMissions, {LaunchesWithMissions} from './ResolveLaunchesWithMissions';
import {LaunchesInput} from '../../../../apollo/queries/GET_LAUNCHES';
import GET_PAYLOADS, {Payload, Payloads} from '../../../../apollo/queries/GET_PAYLOADS';
import ApolloResolver from '../../generics/ApolloResolver';
import {Simulate} from 'react-dom/test-utils';
import pause = Simulate.pause;

interface Props {
  launchesVars: LaunchesInput,
  children: (args: {data?: LaunchesWithMissions, loading: boolean}) => JSX.Element;
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
                  data: !(launches.data && payloads.data) ? undefined : {
                    launches: launches.data.launches?.map(launch => ({
                      ...launch,
                      missions: launch.missions?.map(mission => ({
                        ...mission,
                        payloads: payloads.data?.payloads.filter(payload => mission.payloads.map(_ => _?.id ?? '').includes(payload.id)) ?? []
                      })) ?? []
                    })) ?? []
                  }
                })
              }
            </>
          )}
        </ApolloResolver>
      )}
    </ResolveLaunchesWithMissions>
  )

}
