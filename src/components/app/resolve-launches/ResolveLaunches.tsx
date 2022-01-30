import GET_LAUNCHES, {Launch, Launches, LaunchesInput} from '../../../../apollo/queries/GET_LAUNCHES';
import ApolloResolver from '../../generics/ApolloResolver';

interface Props {
  queryVars: LaunchesInput,
  children: (args: {loading: boolean, data?: Launches}) => JSX.Element
}

export default function ResolveLaunches(props: Props) {

  return (
    <ApolloResolver<Launches, LaunchesInput> query={GET_LAUNCHES} vars={props.queryVars}>
      {({data, loading}) => (<>
        {props.children({data, loading})}
      </>)}
    </ApolloResolver>
  )

}
