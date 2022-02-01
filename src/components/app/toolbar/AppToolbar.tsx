import * as configTheme from '../../../config/theme';
import {classnames} from '../../../../lib/tailwind-classnames';
import SettingsMenu from './SettingsMenu';
import SiteSelector from './SiteSelector';
import ApolloResolver from '../../generics/resolvers/ApolloResolver';
import GET_LAUNCHPADS, {Launchpads} from '../../../../apollo/queries/GET_LAUNCHPADS';


export function AppToolbar(): JSX.Element {
  return (
    <header className={classnames('flex', 'flex-col', 'sticky', 'top-0', 'z-50')}>
      <div className={classnames('flex', 'flex-row', 'items-center', 'pt-6', configTheme.default.main.bg)}>
        <div>
          <h1 className={classnames('block', 'text-2xl', 'leading-8', 'font-bold')}>SpaceX Mission Dashboard</h1>
        </div>
        <div className={classnames('flex-grow')}/>
        <div className={classnames('flex', 'flex-row', 'items-center')}>
          <div className={classnames('mt-2', 'mr-4', 'p-2', 'rounded-full')}>
            <SettingsMenu/>
          </div>
          <div className={classnames('w-44')}>
            <ApolloResolver<Launchpads, undefined> query={GET_LAUNCHPADS} vars={undefined}>
              {({data}) => (
                <SiteSelector options={[
                  {value: undefined, display: 'Launch Site'},
                  ...(data?.launchpads ?? []).map(launchpad => ({display: launchpad.name, value: launchpad.id}))
                ]}/>
              )}
            </ApolloResolver>
          </div>
        </div>
      </div>
      <div
        className={`${classnames('h-6', 'bg-gradient-to-b', configTheme.default.main.fromGradient)} min-h-[1.5rem]`}/>
    </header>
  );
}
