import React from 'react';
import { render } from '@testing-library/react';
import TaskView from "../../../src/components/tasks/task-view"

test('renders button with correct label', () => {
  const { getByText } = render(<TaskView />);
  const buttonElement = getByText('Click me');
  expect(buttonElement).toBeFalsy();
});