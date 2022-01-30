module.exports = {
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'graphite': {
                    DEFAULT: '#333333',
                    '50': '#555555',
                    '100': '#525252',
                    '200': '#4A4A4A',
                    '300': '#424242',
                    '400': '#3B3B3B',
                    '500': '#333333',
                    '600': '#303030',
                    '700': '#2B2B2B',
                    '800': '#242424',
                    '900': '#141414'
                },
                'dust': {
                    DEFAULT: '#999999',
                    '50': '#F5F5F5',
                    '100': '#EBEBEB',
                    '200': '#D6D6D6',
                    '300': '#C2C2C2',
                    '400': '#ADADAD',
                    '500': '#999999',
                    '600': '#7D7D7D',
                    '700': '#616161',
                    '800': '#454545',
                    '900': '#292929'
                },
                'ghost': '#f6f8fa'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
