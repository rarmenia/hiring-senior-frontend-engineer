import {Head, Html, Main, NextScript} from 'next/document';
import {classnames} from '../../lib/tailwind-classnames';
import theme from '../config/theme';

// noinspection JSUnusedGlobalSymbols
export default function Document() {
  // noinspection HtmlRequiredTitleElement
  return (
    <Html lang={'en-US'}>
      <Head/>
      <body className={classnames(theme.main.bg, theme.main.text, 'px-6')}>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  );
}
