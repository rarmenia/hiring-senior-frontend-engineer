import {classnames} from '../../../lib/tailwind-classnames';
import TableCard from '../generics/cards/TableCard';
import ResolveLaunchesWithMissionPayloads from './resolve-launches/ResolveLaunchesWithMissionPayloads';
import theme from '../../config/theme';
import React, {ChangeEvent, useMemo, useState} from 'react';
import {LaunchesWithMissions} from './resolve-launches/ResolveLaunchesWithMissions';
import Table, {Column} from '../generics/Table';
import {CardSeparator} from '../generics/cards/CardSeparator';
import {ArrowLeftIcon, ArrowRightIcon, SearchIcon} from '@heroicons/react/outline';
import {debounce} from 'lodash';

interface TableRow {
  missionName: string,
  launchDate: string,
  launchOutcome: boolean,
  rocket: string,
  payloadMass?: number,
  launchSite: string,
  missionId: string
}

function composeTableRows(data?: LaunchesWithMissions): TableRow[] {

  const result: TableRow[] = [];

  data?.launches?.forEach(launch => {
    launch.missions?.forEach(mission => {
      mission.payloads.forEach(payload => {
        result.push(({
          missionName: launch.mission_name,
          launchDate: launch.launch_date_utc,
          launchOutcome: launch.launch_success,
          rocket: launch.rocket.rocket_name,
          payloadMass: payload.payload_mass_kg,
          launchSite: launch.launch_site.site_name,
          missionId: mission.id
        }));
      });
    });
  });

  return result.filter(row => row.payloadMass);
}

export default function DashboardTable(): JSX.Element {

  const [missionSearch, setMissionSearch] = useState<string | undefined | null>(undefined);
  const [sortInfo, setSortInfo] = useState<{ sortKey?: string, sortDir?: 'asc' | 'desc' } | undefined>(undefined);
  const [page, setPage] = useState<number>(0);

  const pageSize = 30;

  const cols: Column<TableRow>[] = [
    {
      headerText: 'Mission Name',
      dataAccessor: (row: TableRow) => row.missionName,
      sortKey: 'mission_name',
      key: 'mission'
    },
    {headerText: 'Date', dataAccessor: (row: TableRow) => row.launchDate, key: 'date'},
    {
      headerText: 'Outcome',
      dataAccessor: (row: TableRow) => row.launchOutcome ? 'Success' : 'Failure',
      dataConditionalStyling: (row: TableRow) => row.launchOutcome ? classnames('text-green-500', 'font-semibold') : classnames('text-red-500', 'font-semibold'),
      sortKey: 'launch_success',
      key: 'launchSuccess'
    },
    {headerText: 'Rocket', dataAccessor: (row: TableRow) => row.rocket, key: 'rocket'},
    {headerText: 'Payload Mass', dataAccessor: (row: TableRow) => `${row.payloadMass ?? 0} kg`, key: 'payloadMass'},
    {headerText: 'Site', dataAccessor: (row: TableRow) => row.launchSite, key: 'launchSite'},
    {headerText: 'Mission ID', dataAccessor: (row: TableRow) => row.missionId, key: 'missionID'},
  ];

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMissionSearch(event.target.value);
    setPage(0);
    setSortInfo(undefined)
  }

  const debouncedSearchInputHandler = useMemo(
    () => debounce(handleInput, 500),
    [setMissionSearch, setPage, setSortInfo]
  )


  return (
    <div className={classnames('w-full', 'mt-5', 'overflow-hidden')}>
      <TableCard header={'SpaceX LaunchData'}>
        <div className={classnames('flex', 'flex-col')}>
          <div className={classnames('p-4', 'w-full')}>
            <div
              className={classnames(theme.searchAreaBg, theme.searchAreaText, 'w-full', 'p-4', 'flex', 'flex-row', 'items-center', 'rounded-md')}>
              <div className={classnames('mt-0.5')}>
                <SearchIcon className={classnames('w-4', 'h-4', theme.searchAreaText)}/>
              </div>
              <div className={classnames('flex-grow', 'ml-2')}>
                <input
                  type={'text'}
                  placeholder={'Search by Mission Name'}
                  className={classnames(theme.searchAreaBg, theme.searchAreaText, 'w-full', 'outline-none')}
                  onChange={debouncedSearchInputHandler}
                />
              </div>
            </div>
          </div>
          <div className={classnames('w-full', 'max-w-full', 'overflow-hidden')}>
            <ResolveLaunchesWithMissionPayloads launchesVars={{
              limit: pageSize,
              offset: page * pageSize,
              sort: sortInfo?.sortKey,
              order: sortInfo?.sortDir,
              mission_name: missionSearch ?? undefined
            }}>
              {({loading, data}) => (
                <>

                  <Table loading={loading} data={composeTableRows(data)} colConfig={cols} sortInfo={sortInfo}
                         sortChange={(change) => setSortInfo(change)}/>
                  <CardSeparator/>
                  <div className={classnames('py-4', 'px-6', 'w-full', 'flex', 'flex-row-reverse', 'items-center')}>
                    {((data?.launches.length ?? 0) === pageSize) && (
                      <div className={classnames('ml-4')}>
                        <button onClick={() => setPage((curPage) => curPage + 1)}>
                          <ArrowRightIcon className={classnames(theme.text, 'h-6', 'w-6', 'mt-2')}/>
                        </button>
                      </div>
                    )}
                    {page > 0 && (
                      <>
                        <div>
                          {page + 1}
                        </div>
                        <div className={classnames('mx-2')}>
                          ...
                        </div>

                      </>
                    )}
                    <div>
                      <button
                        onClick={() => {
                          if (page !== 0) {
                            setPage(0);
                          }
                        }}
                        className={theme.text}>
                        1
                      </button>
                    </div>
                    {(page - 1) >= 0 && (
                      <div className={classnames('mr-4')}>
                        <button onClick={() => setPage((curPage) => curPage - 1)}>
                          <ArrowLeftIcon className={classnames(theme.text, 'h-6', 'w-6', 'mt-2')}/>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </ResolveLaunchesWithMissionPayloads>
          </div>
        </div>
      </TableCard>
    </div>
  );
}
