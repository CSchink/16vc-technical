import AppRouter from "./AppRouter";
import { SessionProvider } from "./context/context.session";
import "./App.css";
import "mantine-datatable/styles.css";
import "@mantine/core/styles.css";
import { DEFAULT_THEME, MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <MantineProvider theme={DEFAULT_THEME}>
        <SessionProvider>
          <AppRouter />
        </SessionProvider>
      </MantineProvider>
    </>
  );
}

export default App;
