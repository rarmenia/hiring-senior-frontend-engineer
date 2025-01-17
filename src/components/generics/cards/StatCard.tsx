import Card from './Card';
import theme from '../../../config/theme';
import React from 'react';
import {ChevronRightIcon} from '@heroicons/react/solid';
import {classnames} from '../../../../lib/tailwind-classnames';

interface Props {
  icon: React.ReactNode;
  loading: boolean;
  statValue?: number | string;
  unit?: string;
  statText: string;
}

export default function StatCard(props: Props): JSX.Element {
  return (
    <Card bg={theme.cards.glance.bg} animation={props.loading ? classnames('animate-pulse') : undefined}>
      <div
        className={classnames('w-full', 'flex', 'flex-row', 'items-center', 'gap-3', 'p-4', 'text-xl', 'font-bold', 'leading-7')}>
        <div className={classnames('self-start', 'mt-0.5')}>{props.icon}</div>
        <div className={classnames('flex', 'flex-col', 'gap-0.5')}>
          <div>{props.statValue ?? '???'}{props.unit ? ` ${props.unit}` : ''}</div>
          <div
            className={classnames('whitespace-nowrap', 'text-sm', 'leading-5', 'font-medium', theme.cards.glance.text)}>{props.statText}</div>
        </div>
        <div className={classnames('flex-grow')}/>
        <div>
          <ChevronRightIcon className={classnames('h-4', theme.main.text)}/>
        </div>
      </div>
    </Card>
  );
}
