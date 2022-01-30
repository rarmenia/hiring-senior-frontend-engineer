import '../../styles/globals.css';
import type {AppProps} from 'next/app';
import {ThemeProvider, useTheme} from 'next-themes';
import {AppToolbar} from '../components/app/AppToolbar';
import {ApolloProvider} from '@apollo/client';
import client from '../../apollo';

function MyApp({Component, pageProps}: AppProps) {

  return (<>
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class">
        <div>
          <AppToolbar/>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  </>);
}

export default MyApp;
