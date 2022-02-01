import {Menu, Transition} from '@headlessui/react';
import {classnames} from '../../../../lib/tailwind-classnames';
import theme from '../../../config/theme';
import {CogIcon} from '@heroicons/react/outline';
import {Fragment} from 'react';
import MenuItemThemeToggle from './MenuItemThemeToggle';

export default function SettingsMenu(): JSX.Element {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          {({open}) => {
            return (
              <div
                className={classnames('p-2', 'rounded-full', {[theme.settings.button.bgInactive]: !open}, {[theme.settings.button.bgActive]: open})}>
                <CogIcon
                  className={classnames('h-5', {[theme.settings.button.iconInactive]: !open}, {[theme.settings.button.iconActive]: open})}/>
                <span className={classnames('sr-only')}>Open Settings Menu</span>
              </div>
            );
          }}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classnames('absolute', 'right-0', 'w-60', 'origin-top-right', 'rounded-md', 'shadow-lg', theme.settings.menu.bg)}>
          <Menu.Item>
            {() => (
              <MenuItemThemeToggle/>
            )}
          </Menu.Item>
          <Menu.Item>
            <div className={classnames('pt-2', 'pb-4', 'px-4')}>Logout</div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
