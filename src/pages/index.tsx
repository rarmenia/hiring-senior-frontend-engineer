import type {NextPage} from 'next';
import React from 'react';
import {classnames} from '../../lib/tailwind-classnames';
import {DashboardCharts} from '../components/app/dashboard/DashboardCharts';
import DashboardPayloadStats from '../components/app/dashboard/DashboardPayloadStats';
import DashboardTable from '../components/app/dashboard/DashboardTable';


const Home: NextPage = () => {


  return (
    <div className={classnames('my-4')}>
      <DashboardPayloadStats/>
      <DashboardCharts/>
      <DashboardTable/>
    </div>
  )
}

export default Home
