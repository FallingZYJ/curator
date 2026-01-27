import type { AppProps } from "next/app";
import { ErrorBoundary } from "../components/ErrorBoundary";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <Component {...pageProps} />
  </ErrorBoundary>
);

export default App;
