import { AppProps } from "next/app";
import { Provider } from "next-auth/client";

import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
