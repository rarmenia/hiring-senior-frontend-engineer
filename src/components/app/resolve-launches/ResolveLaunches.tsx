import GET_LAUNCHES, {Launches, LaunchesInput} from '../../../../apollo/queries/GET_LAUNCHES';
import ApolloResolver from '../../generics/resolvers/ApolloResolver';
import {useSelector} from 'react-redux';
import {AppState} from '../../../redux/store';

interface Props {
  queryVars: LaunchesInput,
  children: (args: { loading: boolean, data?: Launches }) => JSX.Element
}

export default function ResolveLaunches(props: Props) {

  const launchSite = useSelector((state:AppState) => state.launchSite.launchSite)

  return (
    <ApolloResolver<Launches, LaunchesInput> query={GET_LAUNCHES} vars={{...props.queryVars, site_id: launchSite}}>
      {({data, loading}) => (<>
        {props.children({data, loading})}
      </>)}
    </ApolloResolver>
  )

}
