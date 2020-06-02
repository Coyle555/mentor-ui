import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from '../index';

afterEach(cleanup)

export const TEST_BTN_PREFIX = 'APMButton';

describe('Button Component', () => {
  test('is an html button', async () => {
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

  test('allows misc button options', () => {
    const { getByText } = render(<Button name="test">Named Button</Button>);
    expect(getByText('Named Button')).toHaveAttribute('name', 'test')
  })

  test('allows forward refs', async () => {
    const testRef = React.createRef();
    const { findByRole } = render(<Button ref={testRef}>Ref Button</Button>);
    const button = await findByRole('button');
    expect(testRef.current).toContainElement(button);
  })

  test('allows additional classnames', () => {
    const { getByText } = render(<Button className="test-class">Foo</Button>);
    expect(getByText('Foo')).toHaveClass(`test-class`)
  })


  // UI Snapshot tests
  test('default button case', () => {
    const tree = renderer.create(<Button>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('default button light case', () => {
    const tree = renderer.create(<Button isLight>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('primary button', () => {
    const tree = renderer.create(<Button theme="primary">Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('primary button light case', () => {
    const tree = renderer.create(<Button theme="primary" isLight>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('success button', () => {
    const tree = renderer.create(<Button theme="success">Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('success button light case', () => {
    const tree = renderer.create(<Button theme="success" isLight>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('danger button', () => {
    const tree = renderer.create(<Button theme="danger">Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('danger button light case', () => {
    const tree = renderer.create(<Button theme="danger" isLight>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('block button', () => {
    const tree = renderer.create(<Button theme="danger" block>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('outline button', () => {
    const tree = renderer.create(<Button isOutline>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('mini button', () => {
    const tree = renderer.create(<Button isMini>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('medium button', () => {
    const tree = renderer.create(<Button medium>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('left end cap button', () => {
    const tree = renderer.create(<Button isLeftEndCap>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('right end cap button', () => {
    const tree = renderer.create(<Button isRightEndCap>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('capless button', () => {
    const tree = renderer.create(<Button isCapless>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('disabled button', () => {
    const tree = renderer.create(<Button disabled>Foo</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})