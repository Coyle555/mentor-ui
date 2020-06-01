import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Button } from '../index';

afterEach(cleanup)

describe('Button Component', () => {
  test('button displays proper text', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeDefined();
  })

  test('button allows being clicked', () => {
    const testClick = jest.fn();
    const { getByText } = render(
      <Button onClick={testClick}>Test Click</Button>
    );
    fireEvent.click(getByText('Test Click'));
    expect(testClick.mock.calls.length).toBe(1);
  })
})