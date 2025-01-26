import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider, DEFAULT_THEME } from '@mantine/core';

// Custom render required for Mantine + Jest combo
export function render(ui: React.ReactNode) {
  return testingLibraryRender(<div>{ui}</div>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={DEFAULT_THEME}>{children}</MantineProvider>
    ),
  });
}