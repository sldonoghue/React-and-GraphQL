import Document, { Html, Head, NextScript, Main } from 'next/document';

// Using class as Next Js does not have api for hooks
// Allows for custom HTML attributes

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        {/* <Head></Head> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
