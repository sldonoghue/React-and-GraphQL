/* eslint-disable react/jsx-props-no-spreading */
import Page from '../components/Page';

export default function myApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
