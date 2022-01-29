import StatCard from '../generics/StatCard';
import {ArchiveIcon, ScaleIcon, UserCircleIcon} from '@heroicons/react/outline';
import {classnames} from '../../../lib/tailwind-classnames';

export default function DashboardStats(): JSX.Element {

  return (
    <div className={classnames('w-full', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-5')}>
      <StatCard
        icon={<ArchiveIcon className={classnames('h-6', 'text-green-500')} />}
        statValue={310} statText={'Total Payloads'} />
      <StatCard
        icon={<ScaleIcon className={classnames('h-6', 'text-indigo-500')}/>}
        statValue={2120} unit={'Kg'}
        statText={'Avg. Payload Mass'} />
      <StatCard
        icon={<UserCircleIcon className={'h-6 text-yellow-500'}/>}
        statValue={43}
        statText={'Total Payload Customers'} />
    </div>
  )

}
