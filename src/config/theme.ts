import { classnames } from "../../lib/tailwind-classnames";


const theme = {
  bgMain: classnames('bg-gray-50', 'dark:bg-graphite'),
  fromBgMainGradient: classnames('from-gray-50', 'dark:from-graphite'),
  bgContent: classnames('bg-white', 'dark:bg-graphite-400'),
  bgGlance: classnames('bg-gray-200', 'dark:bg-graphite-700'),
  bgSearch: classnames('bg-gray-100', 'bg-graphite-500'),
  borderSlice: classnames('border-gray-50', 'dark:border-graphite'),
  text: classnames('text-black', 'dark:text-white'),
  chartLegendTitle: classnames('text-dust-500', 'dark:text-dust-500'),
  chartLegendKey: classnames('text-black', 'dark:text-dust-500'),
  charLegendValue: classnames('text-dust-500', 'dark:text-dust-500'),
  cogColor: classnames('text-blue-500', 'dark:text-white'),
  cogBgInactive: classnames('bg-white', 'dark:bg-graphite-50')
}

export default theme;