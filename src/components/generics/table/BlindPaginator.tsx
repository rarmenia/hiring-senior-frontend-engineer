import {classnames} from '../../../../lib/tailwind-classnames';
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/outline';
import theme from '../../../config/theme';
import React from 'react';

interface Props {
  currentPage: number;
  expectedResultCount: number;
  actualResultCount: number;
  onPageChange: (nextPageIndex: number) => void;
}

export function BlindPaginator(props: Props): JSX.Element {
  return (<>
    {(props.actualResultCount === props.expectedResultCount) && (
      <div className={classnames('ml-4')}>
        <button
          aria-label={'Go to next table page.'}
          onClick={() => props.onPageChange(props.currentPage + 1)}>
          <ArrowRightIcon className={classnames(theme.main.text, 'h-6', 'w-6', 'mt-2')}/>
        </button>
      </div>
    )}
    {props.currentPage > 0 && (
      <>
        <div>
          {props.currentPage + 1}
        </div>
        <div className={classnames('mx-2')}>
          ...
        </div>

      </>
    )}
    <div>
      <button
        aria-label={'Go to table page 1.'}
        onClick={() => {
          if (props.currentPage !== 0) {
            props.onPageChange(0);
          }
        }}
        className={theme.main.text}>
        1
      </button>
    </div>
    {(props.currentPage - 1) >= 0 && (
      <div className={classnames('mr-4')}>
        <button
          aria-label={'Go to previous table page.'}
          onClick={() => props.onPageChange(props.currentPage - 1)}>
          <ArrowLeftIcon className={classnames(theme.main.text, 'h-6', 'w-6', 'mt-2')}/>
        </button>
      </div>
    )}
  </>);
}
