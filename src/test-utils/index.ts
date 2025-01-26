import userEvent from '@testing-library/user-event';

// Custom setup required for project testing with Mantine, Jest
export * from '@testing-library/react';
export { render } from './custom-render';
export { userEvent };