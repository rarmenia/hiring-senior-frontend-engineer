import * as configTheme from '../../config/theme';
import {classnames} from '../../../lib/tailwind-classnames';
import {useTheme} from 'next-themes';
import {CogIcon} from '@heroicons/react/outline';
import {Menu} from '@headlessui/react';


export function AppToolbar(): JSX.Element {
  const {theme, setTheme} = useTheme();
  return (
    <header className={classnames('flex', 'flex-col', 'sticky', 'top-0', 'z-50', 'gap-4')}>
      <div className={classnames('flex', 'flex-row', 'pt-6', configTheme.default.bgMain)}>
        <div>
          <h1 className={classnames('block', 'text-2xl')}>SpaceX Mission Dashboard</h1>
        </div>
        <div className={classnames('flex-grow')}/>
        <div>
          <div className={classnames('p-2', 'rounded-full')}>
            <Menu>
              <Menu.Button>
                {({open}) => {
                  return (
                    <div className={classnames('p-2', 'rounded-full',)}>
                      <CogIcon className={classnames('h-5', configTheme.default.cogColor)}/>
                    </div>
                  );
                }}
              </Menu.Button>
              <Menu.Items>

              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      <div
        className={`${classnames('h-6', 'bg-gradient-to-b', configTheme.default.fromBgMainGradient)} min-h-[1.5rem]`}/>
    </header>
  );
}
