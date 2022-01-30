import * as configTheme from '../../config/theme';
import {classnames} from '../../../lib/tailwind-classnames';
import SettingsMenu from './SettingsMenu';


export function AppToolbar(): JSX.Element {
  return (
    <header className={classnames('flex', 'flex-col', 'sticky', 'top-0', 'z-50')}>
      <div className={classnames('flex', 'flex-row', 'items-center', 'pt-6', configTheme.default.bgMain)}>
        <div>
          <h1 className={classnames('block', 'text-2xl', 'leading-8', 'font-bold')}>SpaceX Mission Dashboard</h1>
        </div>
        <div className={classnames('flex-grow')}/>
        <div className={classnames('flex', 'flex-row', 'items-center')}>
          <div className={classnames('mt-2', 'mr-4', 'p-2', 'rounded-full')}>
            <SettingsMenu/>
          </div>
          <div className={''}>*launch site filter*</div>
        </div>
      </div>
      <div
        className={`${classnames('h-6', 'bg-gradient-to-b', configTheme.default.fromBgMainGradient)} min-h-[1.5rem]`}/>
    </header>
  );
}
