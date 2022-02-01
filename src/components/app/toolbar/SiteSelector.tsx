import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../redux/store';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, ChevronDownIcon, OfficeBuildingIcon} from '@heroicons/react/outline';
import {setLaunchSite} from '../../../redux/launch-site/actions';
import {Fragment} from 'react';
import {classnames} from '../../../../lib/tailwind-classnames';
import theme from '../../../config/theme';

export interface SiteOption {
  display: string;
  value?: string;
}

interface Props {
  options: SiteOption[];
}

export default function SiteSelector(props: Props): JSX.Element {

 const launchSite = useSelector((state:AppState) => state.launchSite.launchSite);
 const dispatch = useDispatch();

 const handleChange = (value: string | undefined) => {
  dispatch(setLaunchSite({launchSite: value}))
 }

 return (
   <Listbox value={launchSite} onChange={handleChange}>
    <div className="relative mt-1">
     <Listbox.Button className={classnames('relative', 'w-full', 'py-3', 'pl-4', 'pr-12', 'text-left', 'rounded-lg', 'shadow-sm', 'text-sm', 'focus:outline-none', theme.siteSelectBg, theme.siteSelectText)}>
      <span className="flex truncate">
       <OfficeBuildingIcon className={classnames('w-4', 'h-4', 'mt-0.5', 'mr-2', theme.siteSelectText)} />
       {props.options.find(_ => _.value === launchSite)?.display ?? ''}
      </span>
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
     </Listbox.Button>
     <Transition
       as={Fragment}
       leave="transition ease-in duration-100"
       leaveFrom="opacity-100"
       leaveTo="opacity-0"
     >
      <Listbox.Options className={classnames('absolute', 'w-full', 'py-1', 'mt-1', 'overflow-auto', 'text-base', 'rounded-md', 'max-h-60', 'focus:outline-none', 'text-sm', theme.siteSelectBg, theme.text)}>
       {props.options.map((option, optionIndex) => (
         <Listbox.Option
           key={optionIndex}
           className={classnames(theme.text, 'cursor-pointer', 'select-none', 'relative', 'py-2', 'pl-10', 'pr-4', 'text-sm')}
           value={option.value}
         >
           {({selected}) => (
             <>
                      <span
                        className={classnames({'text-blue-500': selected}, {'font-medium': selected}, {'font-normal': !selected}, 'block', 'truncate')}
                      >
                        {option.value ? option.display : 'No Site'}
                      </span>
               {selected ? (
                 <span
                   className={classnames('absolute', 'inset-y-0', 'left-0', 'flex', 'items-center', 'pl-3')}
                 >
                          <CheckIcon
                            className={classnames('w-5', 'h-5', {'text-blue-500': selected}, {[theme.text]: !selected})}
                            aria-hidden="true"/>
                        </span>
               ) : null}
             </>
          )}
         </Listbox.Option>
       ))}
      </Listbox.Options>
     </Transition>
    </div>
   </Listbox>
 );
}
