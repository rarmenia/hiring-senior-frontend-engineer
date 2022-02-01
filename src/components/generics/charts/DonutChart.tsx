import {Group} from '@visx/group';
import {Pie} from '@visx/shape';
import {classnames} from '../../../../lib/tailwind-classnames';
import {Text} from '@visx/text';
import {useState} from 'react';
import theme from '../../../config/theme';

export class DonutConfig {
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
    return this.height - (this.margin * 2);
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

interface Props<T> {
  donutConfig: DonutConfig;
  colors: string[];
  data: T[];
  valueAccessor: (value?: T) => number;
  indexAccessor: (value?: T) => number | undefined;
  labelAccessor: (value?: T) => string;
  hideTable?: boolean;
  hideChart?: boolean;
  hideCenterText?: boolean;
  labelHeaderText: string;
  valueHeaderText: string;
  activeInitial?: T;
  handleChangeActive?: (active: T) => void;
}

export default function DonutChartWithTable<T>(props: Props<T>): JSX.Element {

  const [active, setActive] = useState<T | undefined>(props.activeInitial);

  const setActiveHandler = (incoming: T) => {
    setActive((cur) => props.indexAccessor(cur) === props.indexAccessor(incoming) ? undefined : incoming);
  };


  return (
    <div className={classnames('flex', 'flex-col', 'md:flex-row', 'p-4', 'items-center', 'justify-around', 'w-full')}>
      {!props.hideChart && (
        <div className={classnames(theme.text)}>
          <svg width={props.donutConfig.width} height={props.donutConfig.height}>
            <Group top={props.donutConfig.centerY + props.donutConfig.margin}
                   left={props.donutConfig.centerX + props.donutConfig.margin}>
              <Pie
                data={props.data}
                pieValue={props.valueAccessor}
                outerRadius={props.donutConfig.radius}
                innerRadius={props.donutConfig.innerRadius}
                cornerRadius={props.donutConfig.cornerRadius}
                padAngle={props.donutConfig.padAngle}
              >
                {(pie) => pie.arcs.map((arc) => (
                  <g
                    key={props.indexAccessor(arc.data)}>
                    <path
                      d={pie.path(arc) ?? undefined}
                      fill={props.colors[(props.indexAccessor(arc.data) ?? 0) % props.colors.length]}
                      className={classnames('transition-all', 'ease-in', 'duration-75', 'cursor-pointer')}
                      style={props.indexAccessor(active) === props.indexAccessor(arc.data) ? {filter: `drop-shadow(0px 0px 2px ${props.colors[(props.indexAccessor(arc.data) ?? 0) % props.colors.length]})`} : {}}
                      onClick={() => setActiveHandler(arc.data)}
                    />
                  </g>
                ))}
              </Pie>
              {(active !== undefined && !props.hideCenterText) &&
                  <Text className={classnames('fill-current')} textAnchor={'middle'} fontSize={10} dy={5}>
                    {`${props.labelAccessor(active)}: ${props.valueAccessor(active)}`}
                  </Text>
              }
            </Group>
          </svg>
        </div>
      )}
      {!props.hideTable && (
        <div className={classnames('mt-4', 'md:ml-2', 'w-full', 'md:w-2/3', 'flex', 'flex-row', 'items-center')}>
          <table className={classnames('w-full')}>
            <thead>
            <tr
              className={classnames('flex', 'flex-row', 'items-center', 'mb-4', 'text-sm', 'font-semibold', theme.chartLegendTitle)}>
              <th className={classnames('text-left', 'w-2/3')}>{props.labelHeaderText}</th>
              <th className={classnames('text-left')}>{props.valueHeaderText}</th>
            </tr>
            </thead>
            <tbody>
            {props.data.sort((a, b) => props.valueAccessor(b) - props.valueAccessor(a)).map((dataRow, currIndex) => (
              <tr key={props.indexAccessor(dataRow)}
                  onClick={() => setActiveHandler(dataRow)}
                  className={classnames('py-1.5', 'flex', 'flex-row', 'items-center', 'text-sm', 'font-medium', {'border-b-2': currIndex + 1 < props.data.length}, theme.chartLegendSeparator, 'cursor-pointer')}>
                <td className={classnames('w-2/3', 'inline-flex', 'items-center', theme.chartLegendKey)}>
                  <div className={classnames('block', 'rounded-full', 'mt-0.5')} style={{
                    backgroundColor: props.colors[(props.indexAccessor(dataRow) ?? 0) % props.colors.length],
                    height: '6px',
                    width: '6px'
                  }}/>
                  <div className={classnames('ml-2',)}>{props.labelAccessor(dataRow)}</div>
                </td>
                <td className={classnames(theme.chartLegendValue)}>{props.valueAccessor(dataRow)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

}
