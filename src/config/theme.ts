import { classnames } from "../../lib/tailwind-classnames";


const theme = {
  bgMain: classnames('bg-gray-50', 'dark:bg-graphite'),
  fromBgMainGradient: classnames('from-gray-50', 'dark:from-graphite'),
  bgContent: classnames('bg-white', 'dark:bg-graphite-400'),
  bgSettingsMenu: classnames('bg-white', 'dark:bg-graphite-800'),
  bgGlance: classnames('bg-gray-200', 'dark:bg-graphite-700'),
  bgSearch: classnames('bg-gray-100', 'bg-graphite-500'),
  borderSlice: classnames('border-gray-50', 'dark:border-graphite'),
  text: classnames('text-black', 'dark:text-white'),
  statInfoText: classnames('text-dust-500', 'dark:text-dust-500'),
  chartLegendTitle: classnames('text-dust-500', 'dark:text-dust-50'),
  chartLegendKey: classnames('text-black', 'dark:text-dust-500'),
  chartLegendValue: classnames('text-dust-500', 'dark:text-dust-500'),
  chartLegendSeparator: classnames('border-ghost', 'dark:border-graphite'),
  tableHeading: classnames('text-gray-500', 'dark:text-white'),
  tableData: classnames('font-medium', 'text-gray-500', 'dark:text-dust-500'),
  cogColorInactive: classnames('text-blue-500', 'dark:text-white'),
  cogBgInactive: classnames('bg-white', 'dark:bg-graphite-50'),
  cogColorActive: classnames('text-white'),
  cogBgActive: classnames('bg-blue-500'),
  searchAreaBg: classnames('bg-gray-100', 'dark:bg-graphite-500'),
  searchAreaText: classnames('text-gray-400', 'dark:text-dust-500'),
  siteSelectBg: classnames('bg-white', 'dark:bg-graphite-400'),
  siteSelectText: classnames('text-blue-500', 'dark:text-white'),
}

export default theme;
