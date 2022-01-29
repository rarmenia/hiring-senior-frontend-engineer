import '../../styles/globals.css';
import type {AppProps} from 'next/app';
import {ThemeProvider, useTheme} from 'next-themes';
import {AppToolbar} from '../components/app/AppToolbar';

function MyApp({Component, pageProps}: AppProps) {

  return (<>
    <ThemeProvider attribute="class">
      <div>
        <AppToolbar />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  </>);
}

export default MyApp;
