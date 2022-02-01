import StatCard from '../generics/StatCard';
import {ArchiveIcon, ScaleIcon, UserCircleIcon} from '@heroicons/react/outline';
import {classnames} from '../../../lib/tailwind-classnames';
import {Payload} from '../../../apollo/queries/GET_PAYLOADS';
import React from 'react';
import ResolveLaunchesWithMissionPayloads, {getPayloads} from './resolve-launches/ResolveLaunchesWithMissionPayloads';
import {LaunchesWithMissions} from './resolve-launches/ResolveLaunchesWithMissions';

export default function DashboardPayloadStats(): JSX.Element {

  const payloadStats: { id: string, statCalc: (data?: Payload[]) => number | string | undefined, statText: string, icon: React.ReactNode, unit?: string }[] = [
    {
      id: 'total',
      statCalc: (data?: Payload[]) => data ? data.length : undefined,
      statText: 'Total Payloads',
      icon: <ArchiveIcon className={classnames('h-6', 'text-green-500')}/>
    },
    {
      id: 'avgMass',
      statCalc: (data?: Payload[]) => data ? (data.length > 0 ? data.reduce((accMass, currPayload) => accMass + (currPayload.payload_mass_kg ?? 0), 0) / data.length : 0).toFixed(2) : undefined,
      statText: 'Avg. Payload Mass',
      icon: <ScaleIcon className={classnames('h-6', 'text-indigo-500')}/>,
      unit: 'Kg',
    },
    {
      id: 'totalCustomers',
      statCalc: (data?: Payload[]) =>  data ? data.reduce((accCustomers, currPayload) => accCustomers + (currPayload.customers?.length ?? 0), 0) : undefined,
      statText: 'Total Payload Customers',
      icon: <UserCircleIcon className={'h-6 text-yellow-500'}/>,
    }
  ];

  return (
    <div className={classnames('w-full', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-5')}>
      <ResolveLaunchesWithMissionPayloads launchesVars={{}}>
        {({data, loading}) => (<>
          {payloadStats.map(statConfig => (
              <StatCard
                key={statConfig.id}
                loading={loading}
                statValue={statConfig.statCalc(getPayloads(data))}
                statText={statConfig.statText}
                icon={statConfig.icon} unit={statConfig.unit}/>
            ))}
        </>)}
      </ResolveLaunchesWithMissionPayloads>

    </div>
  );

}
