import AppRouter from "./AppRouter";
import { SessionProvider } from "./context/context.session";
import "./App.css";
import "mantine-datatable/styles.css";
import "@mantine/core/styles.css";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import ErrorBoundary from "./components/common/error-boundary";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
function App() {
  const optionalClientId = "optionalClientId";
  const authUrl = `/.netlify/functions/auth?clientId=${optionalClientId}`;
  const client = new Ably.Realtime({
    authUrl,
  });
  return (
    <>
      <AblyProvider client={client}>
        <MantineProvider theme={DEFAULT_THEME}>
          <ErrorBoundary>
            <SessionProvider>
              <AppRouter />
            </SessionProvider>
          </ErrorBoundary>
        </MantineProvider>
      </AblyProvider>
    </>
  );
}

export default App;
