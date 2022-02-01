import type {NextPage} from 'next';
import React from 'react';
import {classnames} from '../../lib/tailwind-classnames';
import {DashboardCharts} from '../components/app/dashboard/DashboardCharts';
import DashboardPayloadStats from '../components/app/dashboard/DashboardPayloadStats';
import DashboardTable from '../components/app/dashboard/DashboardTable';
import Head from 'next/head';


const Home: NextPage = () => {


  return (
    <>
      <Head>
        <title>SpaceX Mission Dashboard</title>
      </Head>
      <div className={classnames('my-4')}>
        <DashboardPayloadStats/>
        <DashboardCharts/>
        <DashboardTable/>
      </div>
    </>
  )
}

export default Home
