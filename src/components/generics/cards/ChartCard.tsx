import Card from './Card';
import React from 'react';
import {CardSeparator} from './CardSeparator';
import {classnames} from '../../../../lib/tailwind-classnames';

interface Props {
  header: string;
  hintText?: string;
  loading?: boolean;
  children: React.ReactNode;
}

export default function ChartCard(props: Props): JSX.Element {
  return (
    <Card animation={props.loading ? classnames('animate-pulse') : undefined}>
      <div className={classnames('text-xl', 'px-4', 'py-4', 'font-bold', 'leading-8')}>{props.header}</div>
      <CardSeparator/>
      <>
        {props.children}
      </>
    </Card>
  )
}
