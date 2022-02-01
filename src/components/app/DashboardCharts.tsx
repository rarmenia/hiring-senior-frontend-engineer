import {classnames} from '../../../lib/tailwind-classnames';
import ChartCard from '../generics/ChartCard';
import React from 'react';
import NationalityChart from './charts/nationality-chart';
import ResolveLaunchesWithMissionPayloads from './resolve-launches/ResolveLaunchesWithMissionPayloads';
import {Payload} from '../../../apollo/queries/GET_PAYLOADS';
import theme from '../../config/theme';
import LoadingSpinner from '../generics/LoadingSpinner';

export function DashboardCharts(): JSX.Element {

  return (

    <div className={classnames('grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-5', 'mt-5')}>
      <ChartCard header={'Payload Count By Nationality'}>
        <ResolveLaunchesWithMissionPayloads launchesVars={{}} >
          {({data, loading}) => (
            <>
              {loading ? (
                <div className={classnames(theme.text, 'flex', 'flex-row', 'items-center', 'justify-center', 'py-6')}>
                  <div className={classnames('w-20', 'h-20')}>
                    <LoadingSpinner />
                  </div>
                </div>
              ) : (
                <NationalityChart nationalityData={
                  (data?.launches.reduce((acc: Payload[], launch) =>
                      [
                        ...acc,
                        ...(launch.missions?.reduce((payloads: Payload[], mission) =>
                            [
                              ...payloads,
                              ...(mission.payloads ?? [])
                            ]
                          ,[]) ?? [])
                      ]
                    ,[]) ?? []).map(payload => payload.nationality).reduce((acc, curr) => ( (curr ? ({...acc, [`${curr}`]: (acc[curr] ?? 0) + 1}) : {...acc})), {} as {[key: string]: number })
                } />
              )}
            </>
          )}
        </ResolveLaunchesWithMissionPayloads>
      </ChartCard>
      <ChartCard header={'Top 5 Missions'}>
        <div>placeholder</div>
      </ChartCard>
    </div>
  );

}
