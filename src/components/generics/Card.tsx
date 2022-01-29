import {TBackgroundColor, TBorderRadius, TTailwindString} from '../../../lib/tailwind-classnames';
import theme from '../../config/theme';
import {classnames} from 'tailwindcss-classnames';
import React from 'react';

interface Props {
  bg?: TTailwindString;
  radius?: TTailwindString;
  children: React.ReactNode;
}

export default function Card(props: Props): JSX.Element {
  const bgClasses: TTailwindString = props.bg ?? theme.bgContent;
  const radiusClasses: TTailwindString = props.radius ?? classnames('rounded-xl');

  return (
    <div className={classnames('flex', 'flex-col', 'h-full', 'w-full', bgClasses, radiusClasses, 'shadow-sm')}>
      {props.children}
    </div>
  )

}

