import AppRouter from "./AppRouter";
import { SessionProvider } from "./context/context.session";
import "./App.css";
import "mantine-datatable/styles.css";
import "@mantine/core/styles.css";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";
import ErrorBoundary from "./components/common/error-boundary";

function App() {
  return (
    <>
      <MantineProvider theme={DEFAULT_THEME}>
        <ErrorBoundary>
          <SessionProvider>
            <AppRouter />
          </SessionProvider>
        </ErrorBoundary>
      </MantineProvider>
    </>
  );
}

export default App;
