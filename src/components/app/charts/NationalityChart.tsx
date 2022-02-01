import {Group} from '@visx/group';
import {Pie} from '@visx/shape';
import {Text} from '@visx/text';
import {classnames} from '../../../../lib/tailwind-classnames';
import tailwindColors from '../../../../lib/tailwind-default-colors';
import theme from '../../../config/theme';
import {useState} from 'react';
import DonutChart, {DonutConfig} from '../../generics/cards/DonutChart';


interface NationalityChartData {
  nationality: string;
  count: number;
  index: number;
}

interface Props {
  nationalityData: { [nationality: string]: number };
}

export default function NationalityChart(props: Props): JSX.Element {

  const [active, setActive] = useState<NationalityChartData | undefined>(undefined)

  const transformedData: NationalityChartData[] = Object.entries(props.nationalityData).map(([nationality, count], index) => ({
    nationality,
    count,
    index
  }));

  const colors = [
    tailwindColors.orange['500'],
    tailwindColors.teal['500'],
    tailwindColors.red['700'],
    tailwindColors.purple['700'],
    tailwindColors.blue['500'],
    tailwindColors.yellow['400']
  ];

  const chartConfig = new DonutConfig(200, 200, 20, 5, 0.025, 5);

  return (<>
      {(transformedData && transformedData.length > 0) ? <>
          <div className={classnames(theme.text)}>
            <DonutChart<NationalityChartData>
              donutConfig={chartConfig}
              colors={colors}
              data={transformedData}
              valueAccessor={(value) => (value?.count ?? 0)}
              indexAccessor={(value) => (value?.index ?? 0)}
              labelAccessor={(value) => (value?.nationality ?? '')}
              labelHeaderText={'Nationality'}
              valueHeaderText={'Count'}
              handleChangeActive={setActive}
              displayTable={true}
              activeInitial={active}
            />
          </div>
      </> : transformedData.length === 0 ? (<div>No Payloads</div>) : (<div>loading</div>)}
    </>
  );

}
