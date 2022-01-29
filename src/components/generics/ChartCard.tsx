import Card from './Card';
import React from 'react';
import {CardSeparator} from './CardSeparator';
import {classnames} from '../../../lib/tailwind-classnames';

interface Props {
  header: string;
  hintText?: string;
  children: React.ReactNode
}

export default function ChartCard(props: Props): JSX.Element {
  return (
    <Card>
      <div className={classnames('text-xl', 'px-4', 'py-2')}>{props.header}</div>
      <CardSeparator />
      <div className={classnames('px-4', 'py-2')}>
        {props.children}
      </div>
    </Card>
  )
}
