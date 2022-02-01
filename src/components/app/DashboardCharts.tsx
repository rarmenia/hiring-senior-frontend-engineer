import {classnames} from '../../../lib/tailwind-classnames';
import ChartCard from '../generics/ChartCard';
import React from 'react';
import NationalityChart from './charts/NationalityChart';
import ResolveLaunchesWithMissionPayloads, {getPayloads} from './resolve-launches/ResolveLaunchesWithMissionPayloads';
import {Payload} from '../../../apollo/queries/GET_PAYLOADS';
import theme from '../../config/theme';
import LoadingSpinner from '../generics/LoadingSpinner';
import TopMissionsChart from './charts/TopMissionsChart';

export function DashboardCharts(): JSX.Element {

  return (

    <div className={classnames('grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-5', 'mt-5')}>
      <ResolveLaunchesWithMissionPayloads launchesVars={{}}>
        {({data, loading}) => (<>
          <ChartCard header={'Payload Count By Nationality'}>
              <>
                {loading ? (
                  <div className={classnames(theme.text, 'flex', 'flex-row', 'items-center', 'justify-center', 'py-6')}>
                    <div className={classnames('w-20', 'h-20')}>
                      <LoadingSpinner />
                    </div>
                  </div>
                ) : (
                  <NationalityChart nationalityData={
                    (getPayloads(data) ?? []).map(payload => payload.nationality).reduce((acc, curr) => ( (curr ? ({...acc, [`${curr}`]: (acc[curr] ?? 0) + 1}) : {...acc})), {} as {[key: string]: number })
                  } />
                )}
              </>
          </ChartCard>
          <ChartCard header={'Top 5 Missions'}>
           <>
            {loading ? (
              <div className={classnames(theme.text, 'flex', 'flex-row', 'items-center', 'justify-center', 'py-6')}>
                <div className={classnames('w-20', 'h-20')}>
                  <LoadingSpinner />
                </div>
              </div>
            ) : (
              <TopMissionsChart missions={
                (getPayloads(data) ?? [])
                  .sort((a, b) => (b.payload_mass_kg ?? 0) - (a.payload_mass_kg ?? 0))
                  .filter((obj, pos, arr) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos)
                  .map(payload => ({id: payload.id, mass: payload.payload_mass_kg ?? 0}))
                  .slice(0, 5)
              }/>
            )}
          </>
          </ChartCard>
        </>)
        }
      </ResolveLaunchesWithMissionPayloads>
    </div>
  );

}
