import type { NextPage } from 'next'
import React from 'react';
import {classnames} from '../../lib/tailwind-classnames';
import {DashboardCharts} from '../components/app/DashboardCharts';
import DashboardPayloadStats from '../components/app/DashboardPayloadStats';
import ResolvePayloadsFromLaunches from '../components/app/resolve-launches/ResolveLaunchesWithMissionPayloads';
import {Payload} from '../../apollo/queries/GET_PAYLOADS';



const Home: NextPage = () => {



  return (
    <div className={classnames('mt-4')}>
      <ResolvePayloadsFromLaunches launchesVars={{}}>
        {({data, loading}) => (
          <DashboardPayloadStats loading={loading} data={data?.launches.reduce((acc: Payload[], launch) =>
            [
              ...acc,
              ...(launch.missions?.reduce((payloads: Payload[], mission) =>
                [
                  ...payloads,
                  ...(mission.payloads ?? [])
                ]
                ,[]) ?? [])
            ]
            ,[]) ?? []} />
        )}
      </ResolvePayloadsFromLaunches>
      <DashboardCharts />
    </div>
  )
}

export default Home
