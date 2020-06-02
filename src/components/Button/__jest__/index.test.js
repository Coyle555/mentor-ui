import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Button } from '../index';

afterEach(cleanup)

export const TEST_BTN_PREFIX = 'APMButton';

describe('Button Component', () => {
  test('is a button', async () => {
    const { findByRole } = render(<Button>Test Button</Button>);
    const button = await findByRole('button')
    expect(button).toBeDefined();
  })

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

  test(`should always have class ${TEST_BTN_PREFIX}`, () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toHaveClass(TEST_BTN_PREFIX);
  })

  test('button defaults to the default theme', () => {
    const { getByText } = render(<Button>Default Button</Button>);
    expect(getByText('Default Button')).toHaveClass(`${TEST_BTN_PREFIX}-default`)
  })

  test('button default theme works properly in light case', () => {
    const { getByText } = render(<Button isLight>Default Button</Button>);
    expect(getByText('Default Button')).toHaveClass(`${TEST_BTN_PREFIX}-default-light`)
  })

  test('button primary theme works properly', () => {
    const { getByText } = render(<Button theme="primary">Primary Button</Button>);
    expect(getByText('Primary Button')).toHaveClass(`${TEST_BTN_PREFIX}-primary`)
  })

  test('button primary theme works properly in light case', () => {
    const { getByText } = render(<Button theme="primary" isLight>Primary Button</Button>);
    expect(getByText('Primary Button')).toHaveClass(`${TEST_BTN_PREFIX}-primary-light`)
  })

  test('button success theme works properly', () => {
    const { getByText } = render(<Button theme="success">Success Button</Button>);
    expect(getByText('Success Button')).toHaveClass(`${TEST_BTN_PREFIX}-success`)
  })

  test('button success theme works properly in light case', () => {
    const { getByText } = render(<Button theme="success" isLight>Success Button</Button>);
    expect(getByText('Success Button')).toHaveClass(`${TEST_BTN_PREFIX}-success-light`)
  })

  test('button danger theme works properly', () => {
    const { getByText } = render(<Button theme="danger">danger Button</Button>);
    expect(getByText('danger Button')).toHaveClass(`${TEST_BTN_PREFIX}-danger`)
  })

  test('button danger theme works properly in light case', () => {
    const { getByText } = render(<Button theme="danger" isLight>danger Button</Button>);
    expect(getByText('danger Button')).toHaveClass(`${TEST_BTN_PREFIX}-danger-light`)
  })

  test('button block option works properly', () => {
    const { getByText } = render(<Button block>block Button</Button>);
    expect(getByText('block Button')).toHaveClass(`${TEST_BTN_PREFIX}-block`)
  })

  test('button outline option works properly', () => {
    const { getByText } = render(<Button isOutline>outline Button</Button>);
    expect(getByText('outline Button')).toHaveClass(`${TEST_BTN_PREFIX}-outline`)
  })

  test('button mini option works properly', () => {
    const { getByText } = render(<Button isMini>mini Button</Button>);
    expect(getByText('mini Button')).toHaveClass(`${TEST_BTN_PREFIX}-is-mini`)
  })

  test('button medium option works properly', () => {
    const { getByText } = render(<Button medium>medium Button</Button>);
    expect(getByText('medium Button')).toHaveClass(`${TEST_BTN_PREFIX}-is-medium`)
  })

  test('button left end cap option works properly', () => {
    const { getByText } = render(<Button isLeftEndCap>left end cap Button</Button>);
    expect(getByText('left end cap Button')).toHaveClass(`${TEST_BTN_PREFIX}-end-cap-left`)
  })

  test('button right end cap option works properly', () => {
    const { getByText } = render(<Button isRightEndCap>right end cap Button</Button>);
    expect(getByText('right end cap Button')).toHaveClass(`${TEST_BTN_PREFIX}-end-cap-right`)
  })

  test('button capless option works properly', () => {
    const { getByText } = render(<Button isCapless>capless Button</Button>);
    expect(getByText('capless Button')).toHaveClass(`${TEST_BTN_PREFIX}-is-capless`)
  })

  test('allows additional classnames', () => {
    const { getByText } = render(<Button className="test-class">Classy Button</Button>);
    expect(getByText('Classy Button')).toHaveClass(`test-class`)
  })

  test('allows disabled option', () => {
    const { getByText } = render(<Button disabled>Disabled Button</Button>);
    expect(getByText('Disabled Button')).toBeDisabled()
  })

  test('allows misc button options', () => {
    const { getByText } = render(<Button name="test">Named Button</Button>);
    expect(getByText('Named Button')).toHaveAttribute('name', 'test')
  })

  test('allows forward refs', () => {
    const testRef = React.createRef();
    render(<Button ref={testRef}>Ref Button</Button>);
    expect(testRef.current).toHaveClass(`${TEST_BTN_PREFIX}`);
  })
})