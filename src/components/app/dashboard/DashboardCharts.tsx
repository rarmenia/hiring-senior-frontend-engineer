import {classnames} from '../../../../lib/tailwind-classnames';
import ChartCard from '../../generics/cards/ChartCard';
import React from 'react';
import NationalityChart from '../charts/NationalityChart';
import theme from '../../../config/theme';
import LoadingSpinner from '../../generics/resolvers/LoadingSpinner';
import TopMissionsChart from '../charts/TopMissionsChart';
import ResolvePayloadsFromLaunches from '../resolve-launches/ResolvePayloadsFromLaunches';

export function DashboardCharts(): JSX.Element {

  return (

    <div className={classnames('grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-5', 'mt-5')}>
      <ResolvePayloadsFromLaunches launchesVars={{}}>
        {({data, loading}) => (<>
          <ChartCard header={'Payload Count By Nationality'} loading={loading}>
            <>
              {loading ? (
                <div
                  className={classnames(theme.main.text, 'flex', 'flex-row', 'items-center', 'justify-center', 'py-6')}>
                  <div className={classnames('w-20', 'h-20')}>
                    <LoadingSpinner/>
                  </div>
                </div>
              ) : (
                <NationalityChart nationalityData={
                  (data ?? []).map(payload => payload.nationality).reduce((acc, curr) => ((curr ? ({
                    ...acc,
                    [`${curr}`]: (acc[curr] ?? 0) + 1
                  }) : {...acc})), {} as { [key: string]: number })
                }/>
              )}
            </>
          </ChartCard>
          <ChartCard header={'Top 5 Missions'} loading={loading}>
            <div className={classnames('flex-col', 'h-full', 'items-center', 'justify-center', 'px-4', 'my-auto')}>
              {loading ? (
                <div
                  className={classnames(theme.main.text, 'flex', 'flex-row', 'items-center', 'justify-center', 'py-6')}>
                  <div className={classnames('w-20', 'h-20')}>
                    <LoadingSpinner/>
                  </div>
                </div>
              ) : (
                <div className={'h-full'}>
                  <TopMissionsChart missions={
                  (data ?? [])
                    .sort((a, b) => (b.payload_mass_kg ?? 0) - (a.payload_mass_kg ?? 0))
                    .filter((obj, pos, arr) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos)
                    .map(payload => ({id: payload.id, mass: payload.payload_mass_kg ?? 0}))
                    .slice(0, 5)
                }/>
              </div>
            )}
           </div>
          </ChartCard>
        </>)
        }
      </ResolvePayloadsFromLaunches>
    </div>
  );

}
