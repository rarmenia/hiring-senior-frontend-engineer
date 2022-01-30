import StatCard from '../generics/StatCard';
import {ArchiveIcon, ScaleIcon, UserCircleIcon} from '@heroicons/react/outline';
import {classnames} from '../../../lib/tailwind-classnames';
import {Payload} from '../../../apollo/queries/GET_PAYLOADS';
import React from 'react';

interface Props {
  loading: boolean;
  data: Payload[] | undefined
}

export default function DashboardPayloadStats(props: Props): JSX.Element {

  const payloadStats: { id: string, statCalc: (data: Payload[]) => number | string, statText: string, icon: React.ReactNode, unit?: string }[] = [
    {
      id: 'total',
      statCalc: (data: Payload[]) => data.length,
      statText: 'Total Payloads',
      icon: <ArchiveIcon className={classnames('h-6', 'text-green-500')}/>
    },
    {
      id: 'avgMass',
      statCalc: (data: Payload[]) => (data.length > 0 ? data.reduce((accMass, currPayload) => accMass + (currPayload.payload_mass_kg ?? 0), 0) / data.length : 0).toFixed(2),
      statText: 'Avg. Payload Mass',
      icon: <ScaleIcon className={classnames('h-6', 'text-indigo-500')}/>,
      unit: 'Kg',
    },
    {
      id: 'totalCustomers',
      statCalc: (data: Payload[]) => data.reduce((accCustomers, currPayload) => accCustomers + (currPayload.customers?.length ?? 0), 0),
      statText: 'Total Payload Customers',
      icon: <UserCircleIcon className={'h-6 text-yellow-500'}/>,
    }
  ];

  return (
    <div className={classnames('w-full', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-5')}>
      {props.data && payloadStats.map(statConfig => (
        <StatCard
          key={statConfig.id}
          statValue={statConfig.statCalc(props.data ?? [])}
          statText={statConfig.statText}
          icon={statConfig.icon} unit={statConfig.unit}/>
      ))}
    </div>
  );

}
