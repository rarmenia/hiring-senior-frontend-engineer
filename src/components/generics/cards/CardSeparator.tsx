import {classnames, TPadding, TTailwindString} from '../../../../lib/tailwind-classnames';
import theme from '../../../config/theme';

interface Props {
  color?: TTailwindString;
  padding?: TPadding;
}

export function CardSeparator(props: Props): JSX.Element {
  const colorClasses = props.color ?? theme.borderSlice
  return (<hr className={classnames(props.padding, colorClasses, 'w-full', 'min-w-full', 'border-b-4', 'border-t-0', 'bg-transparent')}/>)
}
