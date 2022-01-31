import {Group} from '@visx/group';
import {Pie} from '@visx/shape';
import {Text} from '@visx/text';
import {classnames} from '../../../../lib/tailwind-classnames';
import tailwindColors from '../../../../lib/tailwind-default-colors';
import theme from '../../../config/theme';
import {useState} from 'react';
import {toKeyAlias} from '@babel/types';

interface Props {
  nationalityData: { [nationality: string]: number };
}

class DonutChartConfig {

  constructor(
    public width: number,
    public height: number,
    public margin: number,
    public donutThickness: number,
    public padAngle: number,
    public cornerRadius: number,
  ) {
  }

  get innerWidth(): number {
    return this.width - (this.margin * 2);
  }

  get innerHeight(): number {
    return this.height - (this.margin * 2)
  }

  get radius(): number {
    return (Math.min(this.innerWidth, this.innerHeight) / 2);
  }

  get innerRadius(): number {
    return (this.radius - this.donutThickness);
  }

  get centerX(): number {
    return this.innerWidth / 2;
  }

  get centerY(): number {
    return this.innerHeight / 2;
  }
}

export default function NationalityChart(props: Props): JSX.Element {

  const [active, setActive] = useState<{nationality: string, count: number} | undefined>(undefined)

  const transformedData = Object.entries(props.nationalityData).map(([nationality, count], index) => ({
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

  const chartConfig = new DonutChartConfig(200, 200, 20, 5, 0.025, 5);

  return (
    <div className={classnames('flex', 'flex-col', 'md:flex-row', 'p-4', 'items-center', 'justify-around', 'w-full')}>
      {(transformedData && transformedData.length > 0) ? <>
          <div className={classnames(theme.text)}>
              <svg width={chartConfig.width} height={chartConfig.height}>
                  <Group top={chartConfig.centerY + chartConfig.margin} left={chartConfig.centerX + chartConfig.margin}>
                      <Pie
                          data={transformedData}
                          pieValue={(d) => d.count}
                          outerRadius={chartConfig.radius}
                          innerRadius={chartConfig.innerRadius}
                          cornerRadius={chartConfig.cornerRadius}
                          padAngle={chartConfig.padAngle}
                      >
                        {(pie) => pie.arcs.map((arc, index) => (
                          <g
                            key={arc.data.index}>
                            <path
                              d={pie.path(arc) ?? undefined}
                              fill={colors[arc.data.index % colors.length]}
                              className={classnames('transition-all', 'ease-in', 'duration-75', 'cursor-pointer')}
                              style={active?.nationality === arc.data.nationality ? {filter: `drop-shadow(0px 0px 2px ${colors[arc.data.index % colors.length]})`} : {}}
                              onClick={() => setActive((cur) => cur?.nationality === arc.data.nationality ? undefined : ({nationality: arc.data.nationality, count: arc.data.count}))}
                            />
                          </g>
                        ))}
                      </Pie>
                      {(active !== undefined) &&
                        <Text className={classnames('fill-current')} textAnchor={'middle'} fontSize={10} dy={5}>
                          {`${active?.nationality}: ${active.count}`}
                        </Text>
                      }
                  </Group>
              </svg>
          </div>
          <div className={classnames('mt-4', 'md:ml-2', 'w-full', 'md:w-2/3', 'flex', 'flex-row', 'items-center')}>
              <table className={classnames('w-full')}>
                  <thead>
                  <tr className={classnames('flex', 'flex-row', 'items-center', 'mb-4', 'text-sm', 'font-semibold', theme.chartLegendTitle)}>
                      <th className={classnames('text-left', 'w-2/3')}>Nationality</th>
                      <th className={classnames('text-left')}>Count</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    transformedData.sort((a, b) => b.count - a.count).map((dataRow, currIndex) => (
                      <tr key={dataRow.index}
                          onClick={() => setActive((cur) => cur?.nationality === dataRow.nationality ? undefined : ({nationality: dataRow.nationality, count: dataRow.count}))}
                          className={classnames('py-1.5', 'flex', 'flex-row', 'items-center', 'text-sm', 'font-medium', {'border-b-2': currIndex + 1 < transformedData.length}, theme.chartLegendSeparator, 'cursor-pointer')}>
                        <td className={classnames('w-2/3', 'inline-flex', 'items-center', theme.chartLegendKey)}>
                          <div className={classnames('block', 'rounded-full', 'mt-0.5')} style={{
                            backgroundColor: colors[dataRow.index % colors.length],
                            height: '6px',
                            width: '6px'
                          }}/>
                          <div className={classnames('ml-2',)}>{dataRow.nationality}</div>
                        </td>
                        <td className={classnames(theme.chartLegendValue)}>{dataRow.count}</td>
                      </tr>
                    ))
                  }
                  </tbody>
              </table>
          </div>
      </> : transformedData.length === 0 ? (<div>No Payloads</div>) : (<div>loading</div>)}
    </div>
  );

}
