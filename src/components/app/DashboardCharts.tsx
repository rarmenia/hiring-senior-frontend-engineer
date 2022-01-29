import {classnames} from '../../../lib/tailwind-classnames';
import ChartCard from '../generics/ChartCard';
import React from 'react';

export function DashboardCharts(): JSX.Element {

  return (

    <div className={classnames('grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-5', 'mt-5')}>
      <ChartCard header={'Payload Count By Nationality'}>
        <div>placeholder</div>
      </ChartCard>
      <ChartCard header={'Top 5 Missions'}>
        <div>placeholder</div>
      </ChartCard>
    </div>
  );

}
