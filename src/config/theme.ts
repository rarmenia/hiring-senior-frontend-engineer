import {classnames} from '../../lib/tailwind-classnames';


const theme = {
  main: {
    bg: classnames('bg-gray-50', 'dark:bg-graphite'),
    text: classnames('text-black', 'dark:text-white'),
    fromGradient: classnames('from-gray-50', 'dark:from-graphite'),
    slice: classnames('border-gray-50', 'dark:border-graphite'),
  },
  cards: {
    main: {
      bg: classnames('bg-white', 'dark:bg-graphite-400'),
    },
    glance: {
      bg: classnames('bg-gray-200', 'dark:bg-graphite-700'),
      text: classnames('text-dust-500', 'dark:text-dust-500'),
    }
  },
  table: {
    textHeading: classnames('text-gray-500', 'dark:text-white'),
    textData: classnames('font-medium', 'text-gray-500', 'dark:text-dust-500'),
  },

  settings: {
    menu: {
      bg: classnames('bg-white', 'dark:bg-graphite-800'),
    },
    button: {
      iconInactive: classnames('text-blue-500', 'dark:text-white'),
      iconActive: classnames('text-white'),
      bgInactive: classnames('bg-white', 'dark:bg-graphite-50'),
      bgActive: classnames('bg-blue-500'),
    }
  },
  charts: {
    barComparison: {
      graphMain: classnames('bg-black', 'dark:bg-gray-300'),
      graphPad: classnames('bg-gray-100', 'dark:bg-graphite-200'),
      legend: classnames('text-gray-500', 'dark:text-white'),
      label: classnames('text-black', 'dark:text-dust'),
      value: classnames('text-gray-500', 'dark:text-dust'),
      tableSeparator: classnames('border-ghost', 'dark:border-graphite'),
    },
    donut: {
      legend: classnames('text-dust-500', 'dark:text-dust-50'),
      label: classnames('text-black', 'dark:text-dust-500'),
      value: classnames('text-dust-500', 'dark:text-dust-500'),
      tableSeparator: classnames('border-ghost', 'dark:border-graphite'),
      svgText: classnames('text-black', 'dark:text-white'),
    }
  },
  inputs: {
    siteSearch: {
      bg: classnames('bg-white', 'dark:bg-graphite-400'),
      text: classnames('text-blue-500', 'dark:text-white'),
    },
    missionSearch: {
      bg: classnames('bg-gray-100', 'dark:bg-graphite-500'),
      text: classnames('text-gray-400', 'dark:text-dust-500'),
    }
  }
}

export default theme;
