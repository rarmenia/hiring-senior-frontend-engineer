import {classnames, TTailwindString} from '../../../../lib/tailwind-classnames';
import theme from '../../../config/theme';
import LoadingSpinner from '../resolvers/LoadingSpinner';
import {ArrowDownIcon, ArrowUpIcon} from '@heroicons/react/outline';

export interface Column<T> {

  key: string;
  headerText: string;
  dataAccessor: (row: T) => any;
  dataConditionalStyling?: (row: T) => TTailwindString,
  sortKey?: string;

}

interface Props<T> {
  loading: boolean;
  colConfig: Column<T>[];
  data?: T[];
  sortInfo?: { sortKey?: string; sortDir?: 'asc' | 'desc' };
  sortChange: (sortInfo?: { sortKey?: string; sortDir: 'asc' | 'desc' }) => void;
}

export default function Table<T>(props: Props<T>): JSX.Element {

  const handleSortInteraction = (sortKey?: string) => {
    if (!sortKey) return;
    const sortDir: 'asc' | 'desc' = (sortKey !== props?.sortInfo?.sortKey) ? 'desc' : (props?.sortInfo?.sortDir === 'desc' ? 'asc' : 'desc');
    props.sortChange({sortKey, sortDir});
    return;
  };

  return (<>
    {
      (props.loading && (!props.data || (props.data?.length <= 0))) ? (
        <div className={classnames(theme.text, 'flex', 'flex-row', 'items-center', 'justify-center', 'py-6')}>
          <div className={classnames('w-20', 'h-20')}>
            <LoadingSpinner />
          </div>
        </div>
      ) : (<>
        {(props.data && props.data.length > 0) ? (
          <table className={classnames('table-fixed', 'w-full', 'overflow-scroll')} style={{minWidth: 800}}>
            <thead className={classnames('text-left')}>
            <tr
              className={classnames('text-sm', 'leading-5', 'font-semibold', theme.tableHeading, theme.borderSlice, 'border-b-4')}>
              {props.colConfig.map(col => (
                <th
                  key={col.key}
                  className={classnames('px-4', 'py-2')}
                >
                  {!col.sortKey ? (<span>{col.headerText}</span>) : (
                    <button
                      className={classnames('text-sm', 'leading-5', 'font-semibold', 'inline-flex', 'items-center', theme.tableHeading)}
                      onClick={() => handleSortInteraction(col.sortKey)}>
                      <span className={classnames('text-sm', 'font-semibold')}>{col.headerText}</span>
                      <span className={classnames('ml-2', 'mt-1')}>
                        {(props.sortInfo?.sortKey === col.sortKey && props.sortInfo.sortDir === 'asc') ? (
                          <ArrowUpIcon className={classnames('h-3', 'w-3', theme.tableHeading)}/>
                        ) : (
                          <ArrowDownIcon className={classnames('h-3', 'w-3', theme.tableHeading)}/>
                        )}
                      </span>
                    </button>
                  )}
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {props.data.map((dataRow, index, arr) => (
              <tr
                key={index}
                className={classnames('text-sm')}
              >
                {
                  props.colConfig.map((col) => (
                    <td
                      key={col.key}
                      className={classnames('px-4', 'py-4', theme.borderSlice, {'border-b-4': index + 1 < arr.length}, {[theme.tableData]: !col.dataConditionalStyling}) + ` ${col.dataConditionalStyling ? col.dataConditionalStyling(dataRow): ''}`}
                    >
                      {col.dataAccessor(dataRow)}
                    </td>
                  ))
                }
              </tr>
            ))}
            </tbody>
          </table>
        ) : (
          <div className={classnames('w-full', 'flex', 'flex-row', 'items-center', 'justify-center', 'py-5')}>
            <div className={classnames(theme.text)}>* No Results Found*</div>
          </div>
        )}
      </>)
    }
  </>);
}
