import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider, DEFAULT_THEME } from '@mantine/core';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={DEFAULT_THEME}>{children}</MantineProvider>
    ),
  });
}