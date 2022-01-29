import Card from './Card';
import theme from '../../config/theme';
import React from 'react';
import {ChevronRightIcon} from '@heroicons/react/solid';
import {classnames} from '../../../lib/tailwind-classnames';

interface Props {
  icon: React.ReactNode;
  statValue: number;
  unit?: string;
  statText: string;
}

export default function StatCard(props: Props): JSX.Element {
  return (
    <Card bg={theme.bgGlance}>
      <div className={classnames('w-full', 'flex', 'flex-row', 'items-center', 'gap-2.5', 'p-4')}>
        <div className={classnames('self-start')}>{props.icon}</div>
        <div className={classnames('flex', 'flex-col')}>
          <div>{props.statValue}{props.unit ? ` ${props.unit}` : ''}</div>
          <div>{props.statText}</div>
        </div>
        <div className={classnames('flex-grow')} />
        <div>
          <ChevronRightIcon className={classnames('h-4', theme.text)}/>
        </div>
      </div>
    </Card>
  );
}
