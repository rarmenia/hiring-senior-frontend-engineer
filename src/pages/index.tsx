import type { NextPage } from 'next'
import React from 'react';
import {classnames} from '../../lib/tailwind-classnames';
import {DashboardCharts} from '../components/app/DashboardCharts';
import DashboardPayloadStats from '../components/app/DashboardPayloadStats';



const Home: NextPage = () => {



  return (
    <div className={classnames('mt-4')}>
      <DashboardPayloadStats />
      <DashboardCharts />
    </div>
  )
}

export default Home
