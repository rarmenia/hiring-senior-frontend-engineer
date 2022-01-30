import {DocumentNode, useQuery} from '@apollo/client';

interface Props<T, U> {
  query: DocumentNode,
  vars: U
  children: (args: {
    loading: boolean,
    data?: T
  }) => JSX.Element,
}

export default function ApolloResolver<T, U>(props: Props<T, U>): JSX.Element {
  const {loading, data} = useQuery<T, U>(props.query, {variables: props.vars})
  return (<>{props.children({loading, data})}</>)
}
