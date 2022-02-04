import {classnames, TTailwindString} from '../../../../lib/tailwind-classnames';
import theme from '../../../config/theme';
import React from 'react';

interface Props {
  bg?: TTailwindString;
  animation?: TTailwindString;
  radius?: TTailwindString;
  children: React.ReactNode;
}

export default function Card(props: Props): JSX.Element {
  const bgClasses: TTailwindString = props.bg ?? theme.cards.main.bg;
  const radiusClasses: TTailwindString = props.radius ?? classnames('rounded-xl');

  return (
    <div className={classnames('flex', 'flex-col', 'h-full', 'w-full', bgClasses, radiusClasses, 'shadow-sm', props.animation)}>
      {props.children}
    </div>
  )

}

