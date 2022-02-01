import {ComparisonBarChart} from '../../generics/charts/ComparisonBarChart';

interface Props {
  missions: {
    id: string;
    mass: number;
  }[];
}

export default function TopMissionsChart(props: Props): JSX.Element {

  const topCompare = (props?.missions[0]?.mass ?? 0) * 1.1;

  return (
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
  );

}
