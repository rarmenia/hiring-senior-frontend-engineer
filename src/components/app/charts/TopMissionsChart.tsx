import {ComparisonBarChart} from '../../generics/charts/ComparisonBarChart';
import {classnames} from '../../../../lib/tailwind-classnames';
import theme from '../../../config/theme';

interface Props {
  missions: {
    id: string;
    mass: number;
  }[];
}

export default function TopMissionsChart(props: Props): JSX.Element {

  const topCompare = (props?.missions[0]?.mass ?? 0) * 1.1;

  return (
    <>
      {(props.missions && props.missions.length > 0) ? (
        <div className={'h-full'}>
          <ComparisonBarChart
            comparisonData={
              props.missions.map((mission, index) => ({
                key: index,
                value: mission.mass,
                percent: (mission.mass / topCompare) * 100,
                label: mission.id
              }))
            }
            labelHeader={'Mission'}
            valueHeader={'Payload Mass'}
            unit={'kg'}
          />
        </div>
      ) : (
        <div className={classnames('w-full', 'py-4', 'flex', 'flex-row', 'items-center', 'justify-center')}>
          <div className={theme.main.text}>* No Missions *</div>
        </div>
      )}
    </>
  );

}
