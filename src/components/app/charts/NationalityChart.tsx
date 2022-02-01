import {classnames} from '../../../../lib/tailwind-classnames';
import tailwindColors from '../../../../lib/tailwind-default-colors';
import theme from '../../../config/theme';
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


  const transformedData: NationalityChartData[] = Object.entries(props.nationalityData).map(([nationality, count], index) => ({
    nationality,
    count,
    index
  }));

  console.log(transformedData);

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
            indexAccessor={(value) => (value?.index)}
            labelAccessor={(value) => (value?.nationality ?? '')}
            labelHeaderText={'Nationality'}
            valueHeaderText={'Count'}
          />
        </div>
      </> : transformedData.length === 0 ? (<div>No Payloads</div>) : (<div>loading</div>)}
    </>
  );

}
