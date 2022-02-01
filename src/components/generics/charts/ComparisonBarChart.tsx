import { classnames } from "tailwindcss-classnames";
import theme from '../../../config/theme';
import React from 'react';

interface Props {


  comparisonData: {
    key: number;
    percent: number;
    label: string;
    value: number;
  }[];

  labelHeader: string;
  valueHeader: string;

  unit?: string;

}

function BarGroup(props: {percent: number}) {
  return (
    <div className={classnames('flex', 'flex-row', 'w-full')}>
      <div className={classnames('mr-1', 'h-1.5', 'rounded-full', theme.charts.barComparison.graphMain)} style={{width: `${props.percent}%`}} />
      <div className={classnames('flex-grow', 'h-1.5', 'rounded-full', theme.charts.barComparison.graphPad)} />
    </div>
  )
}

export function ComparisonBarChart(props: Props): JSX.Element {

  console.log(props)

  return (
    <div className={classnames('w-full', 'h-full', 'flex', 'flex-col', 'py-4', 'justify-around')}>
      <div className={classnames('flex', 'flex-row', 'w-full', 'items-center', 'pb-2', 'uppercase', 'text-xs', 'leading-5', 'font-semibold', theme.charts.barComparison.legend)}>
        <div className={classnames('w-5/12', 'text-left')}>
          {props.labelHeader}
        </div>
        <div className={classnames('w-7/12', 'text-left')}>
          {props.valueHeader}
        </div>
      </div>
      {
        props.comparisonData.map((data, index, arr) => (
          <div className={classnames('py-2', 'flex', 'flex-row', 'items-center', theme.charts.barComparison.tableSeparator, {'border-b-2': index + 1 < arr.length})} key={data.key}>
            <div className={classnames('w-5/12', 'text-left', 'text-sm', 'leading-5', 'font-semibold', theme.charts.barComparison.label)}>
              {data.label}
            </div>
            <div className={classnames('flex', 'flex-row', 'w-7/12', 'items-center')}>
              <div className={classnames('w-4/12', 'text-sm', 'leading-5', 'font-medium', theme.charts.barComparison.value)}>
                <div>{data.value ?? '???'}{props.unit ? ` ${props.unit}` : ''}</div>
              </div>
              <div className={classnames('flex-grow')}>
                <BarGroup percent={data.percent} />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );

}
