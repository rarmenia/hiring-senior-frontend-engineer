import {classnames} from '../../../../lib/tailwind-classnames';
import {Switch} from '@headlessui/react';
import {useTheme} from 'next-themes';

export default function MenuItemThemeToggle(): JSX.Element {
  const {theme, setTheme} = useTheme();


  return (
    <div className={classnames('w-full', 'flex', 'flex-row', 'items-center', 'content-between', 'pt-4', 'pb-2', 'px-4', 'border-gray-200', 'dark:border-graphite', 'border-b-2')}>
      <div>Light/Dark Theme</div>
      <div className={classnames('flex-grow')}/>
      <Switch
        checked={theme === 'dark'}
        onChange={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}
        className={classnames('relative', 'inline-flex', 'items-center', 'h-6', 'rounded-full', 'w-11', {'bg-blue-600': theme==='dark'}, {'bg-gray-200': theme!=='dark'})}
      >
        <span className="sr-only">Switch Theme</span>
        <span
          className={`transform ${classnames('inline-block', 'w-4', 'h-4', 'bg-white', 'rounded-full', 'transition-transform', {'translate-x-6': theme==='dark'}, {'translate-x-1': theme!=='dark'})}`}
        />
      </Switch>
    </div>
  );
}
