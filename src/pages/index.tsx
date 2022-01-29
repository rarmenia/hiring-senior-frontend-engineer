import type { NextPage } from 'next'
import React from 'react';
import {classnames} from '../../lib/tailwind-classnames';
import {DashboardCharts} from '../components/app/DashboardCharts';
import DashboardStats from '../components/app/DashboardStats';



const Home: NextPage = () => {



  return (
    <div>
      <DashboardStats />
      <DashboardCharts />
    </div>
  )
}

export default Home
