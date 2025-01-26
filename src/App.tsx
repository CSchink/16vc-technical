import AppRouter from "./AppRouter";
import { SessionProvider } from "./context/context.session";
import "./App.css";
import "mantine-datatable/styles.css";
import "@mantine/core/styles.css";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import ErrorBoundary from "./components/common/error-boundary";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { CHANNELS } from "./api/schemas/ws.schemas";
function App() {
  const optionalClientId = "optionalClientId";
  const authUrl = `/.netlify/functions/auth?clientId=${optionalClientId}`;
  const client = new Ably.Realtime({
    authUrl,
  });
  return (
    <>
      <MantineProvider theme={DEFAULT_THEME}>
        <AblyProvider client={client}>
          <ChannelProvider channelName={CHANNELS.tasks}>
            <ErrorBoundary>
              <SessionProvider>
                <AppRouter />
              </SessionProvider>
            </ErrorBoundary>
          </ChannelProvider>
        </AblyProvider>
      </MantineProvider>
    </>
  );
}

export default App;
