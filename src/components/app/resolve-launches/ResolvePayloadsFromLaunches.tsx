import {LaunchesInput} from '../../../../apollo/queries/GET_LAUNCHES';
import {LaunchesWithMissions} from './ResolveLaunchesWithMissions';
import {Payload} from '../../../../apollo/queries/GET_PAYLOADS';
import ResolveLaunchesWithMissionPayloads from './ResolveLaunchesWithMissionPayloads';

interface Props {
  launchesVars: LaunchesInput,
  children: (args: { data?: Payload[], loading: boolean }) => JSX.Element;
}

export default function ResolvePayloadsFromLaunches(props: Props): JSX.Element {

  const getPayloads = (launches?: LaunchesWithMissions): Payload[] | undefined => {
    if (!launches) return undefined;
    return launches.launches.reduce((acc: Payload[], launch) =>
        [
          ...acc,
          ...(launch.missions?.reduce((payloads: Payload[], mission) =>
              [
                ...payloads,
                ...(mission.payloads ?? [])
              ]
            , []) ?? [])
        ]
      , []);
  };

  return (
    <ResolveLaunchesWithMissionPayloads launchesVars={props.launchesVars}>
      {({data, loading}) => <>
        {props.children({
          loading,
          data: getPayloads(data)
        })}
      </>}
    </ResolveLaunchesWithMissionPayloads>
  );
}
