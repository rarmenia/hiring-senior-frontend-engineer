import {classnames} from '../../../lib/tailwind-classnames';
import TableCard from '../generics/TableCard';
import ResolveLaunchesWithMissionPayloads from './resolve-launches/ResolveLaunchesWithMissionPayloads';
import theme from '../../config/theme';
import {useState} from 'react';
import {LaunchesWithMissions} from './resolve-launches/ResolveLaunchesWithMissions';

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

  return result.filter(row => row.payloadMass)
}

export default function DashboardTable(): JSX.Element {

  const [missionSearch, setMissionSearch] = useState<string | undefined | null>(undefined);
  const [sortCol, setSortCol] = useState<string | undefined>('mission_name');
  const [order, setOrder] = useState<string | undefined>('asc');
  const [page, setPage] = useState<number>(0);

  const pageSize = 30;

  const cols: { heading: string, data: (row: TableRow) => any, sort?: string }[] = [
    {heading: 'Mission Name', data: (row: TableRow) => row.missionName, sort: 'mission_name'},
    {heading: 'Date', data: (row: TableRow) => row.launchDate,},
    {heading: 'Outcome', data: (row: TableRow) => row.launchOutcome ? 'Success' : 'Failure', sort: 'launch_success'},
    {heading: 'Rocket', data: (row: TableRow) => row.rocket,},
    {heading: 'Payload Mass', data: (row: TableRow) => `${row.payloadMass ?? 0} kg`,},
    {heading: 'Site', data: (row: TableRow) => row.launchSite,},
    {heading: 'Mission ID', data: (row: TableRow) => row.missionId,},
  ];

  return (
    <div className={classnames('w-full', 'mt-5', 'overflow-hidden')}>
      <TableCard header={'SpaceX LaunchData'}>
        <div className={classnames('flex', 'flex-col')}>
          <div>search</div>
          <div className={classnames('w-full', 'max-w-full', 'overflow-hidden')}>
            <table className={classnames('table-fixed', 'w-full', 'overflow-scroll' )}>
              <thead className={classnames('text-left')}>
              <tr className={classnames('text-sm', 'leading-5', 'font-semibold', theme.tableHeading, theme.borderSlice, 'border-b-4')}>
                {cols.map(col => (
                  <th key={col.heading} className={classnames('px-4', 'py-2')}>{col.heading}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              <ResolveLaunchesWithMissionPayloads launchesVars={{
                limit: pageSize,
                offset: page * pageSize,
                sort: sortCol,
                order,
                mission_name: missionSearch ?? undefined
              }}>
                {({loading, data}) => (<>
                  {composeTableRows(data).map((dataRow, index, arr) => (
                    <tr
                      key={index}
                      className={classnames('text-sm', 'py-4')}
                    >
                      {cols.map(col => (
                        <td
                          className={classnames('px-4', 'py-4', theme.borderSlice, {'border-b-4': index + 1 < arr.length})}
                          key={col.heading}>
                          {col.data(dataRow)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>)}
              </ResolveLaunchesWithMissionPayloads>
              </tbody>
            </table>
          </div>
        </div>
      </TableCard>
    </div>
  );
}
