import '../../styles/globals.css';
import type {AppProps} from 'next/app';
import {ThemeProvider} from 'next-themes';
import {AppToolbar} from '../components/app/toolbar/AppToolbar';
import {ApolloProvider} from '@apollo/client';
import client from '../../apollo';
import {wrapper} from '../redux/store';

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

// noinspection JSUnusedGlobalSymbols
export default wrapper.withRedux(MyApp);
