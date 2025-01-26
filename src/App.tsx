import AppRouter from "./AppRouter";
import { SessionProvider } from "./context/context.session";
import "./App.css";
import "mantine-datatable/styles.css";
import "@mantine/core/styles.css";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import ErrorBoundary from "./components/common/error-boundary";
import { AblyProvider } from "ably/react";
function App() {
  return (
    <>
      <MantineProvider theme={DEFAULT_THEME}>
        <AblyProvider>
          <ErrorBoundary>
            <SessionProvider>
              <AppRouter />
            </SessionProvider>
          </ErrorBoundary>
        </AblyProvider>
      </MantineProvider>
    </>
  );
}

export default App;
