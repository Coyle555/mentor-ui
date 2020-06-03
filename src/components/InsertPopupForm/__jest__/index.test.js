jest.mock('../components/Portal', () => {
  return { Portal: props => <div>{props.children}</div> };
});

import React from 'react';
import InsertForm from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

const TAB_KEYSTROKE = 9;
const ESCAPE_KEYSTROKE = 27;

afterEach(cleanup);

describe('Rendering the insert form', () => {
  test('If no form fields are passed, render null', () => {
    const tree = renderer.create(<InsertForm />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Rendering with a submit button', () => {
    const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

    const tree = renderer.create(<InsertForm formFields={formFields} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Rendering with a list of fields', () => {
    const formFields = [
      { label: 'Bar', id: 'foo', type: 'string' },
      { label: 'Baz', id: 'ttt', type: 'string' }
    ];

    const tree = renderer.create(<InsertForm formFields={formFields} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Rendering a required field that has no data', () => {
    const formFields = [{ label: 'Bar', id: 'foo', required: true, type: 'string' }];

    const tree = renderer.create(<InsertForm formFields={formFields} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Rendering a required field that has data', () => {
    const formFields = [{ label: 'Bar', id: 'foo', required: true, type: 'string' }];
    const initInsertData = { foo: 'test' };

    const tree = renderer.create(
      <InsertForm formFields={formFields} initInsertData={initInsertData} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Partially filled data', () => {
  const formFields = [
    { id: 'text', label: 'Text Input' },
    { id: 'requiredText', label: 'Required Text Input', required: true },
    { id: 'multiline', label: 'Multiline Text Input', multiline: true },
    { id: 'options', label: 'Options', options: ['foo', 'bar'] },
    {
      id: 'listfilter1',
      label: 'List Filter w/ Options',
      options: ['foo', 'bar', 'baz'],
      type: 'listfilter'
    },
    {
      id: 'listfilter2',
      label: 'List Filter w/ Filter',
      type: 'listfilter',
      options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
      parse: val => typeof val === 'object' ? val.name : val
    }
  ];

  test('Saving text input', () => {
    const { baseElement, getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    fireEvent.click(getByText('2'));
    fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE, shiftKey: true });
    expect(getByTestId('field-input').value).toEqual('Test');
  });

  test('Saving input on an options list', () => {
    const { baseElement, getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.click(getByText('4'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });
    fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE, shiftKey: true });
    fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE });
    expect(getByTestId('field-input').value).toEqual('foo');
  });

  test('Saving input on a list filter', () => {
    const { baseElement, getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.click(getByText('5'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'f' } });
    fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE, shiftKey: true });
    fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE });
    expect(getByTestId('field-input').value).toEqual('f');
  });

  test('Saving input on a list filter with a custom filter', async () => {
    const { baseElement, debug, getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.click(getByText('6'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'f' } });
    await wait(() => {
      fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE, shiftKey: true });
      fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE });
      expect(getByTestId('field-input').value).toEqual('f');
    });
  });
});

describe('Turning off insert form', () => {
  test('Disabling the insert form', () => {
    const onDisable = jest.fn();
    const formFields = [{ label: 'Bar', id: 'foo', required: true, type: 'string' }];

    const { getByTestId } = render(
      <InsertForm formFields={formFields} onDisable={onDisable} />);

    fireEvent.click(getByTestId('disable-form'));
    expect(onDisable).toHaveBeenCalled();
  });

  test('Disabling the insert form by escape keystroke', () => {
    const onDisable = jest.fn();
    const formFields = [{ label: 'Bar', id: 'foo', required: true, type: 'string' }];

    const { baseElement } = render(
      <InsertForm formFields={formFields} onDisable={onDisable} />);

    fireEvent.keyDown(baseElement, { keyCode: ESCAPE_KEYSTROKE });
    expect(onDisable).toHaveBeenCalled();
  });
});

describe('Going forwards and backwards through the fields', () => {

  describe('Using buttons to traverse the form', () => {
    test('Go to the next field', () => {
      const formFields = [
        { label: 'Bar', id: 'foo', type: 'string' },
        { label: 'Baz', id: 'ttt', type: 'string' }
      ];

      const { getByText, getAllByText } = render(<InsertForm formFields={formFields} />);

      fireEvent.click(getByText('Next'));
      // stepper and field label are both Baz
      expect(getAllByText('Baz')).toHaveLength(2);
    });

    test('Go to the previous field', () => {
      const formFields = [
        { label: 'Bar', id: 'foo', type: 'string' },
        { label: 'Baz', id: 'ttt', type: 'string' }
      ];

      const { getByText, getAllByText } = render(
        <InsertForm formFields={formFields} />
      );

      fireEvent.click(getByText('Next'));
      fireEvent.click(getByText('Back'));
      expect(getAllByText('Bar')).toHaveLength(2);
    });
  });

  describe('Using keystrokes to traverse the form', () => {
    test('Insert form tab keystroke goes to next', () => {
      const formFields = [
        { label: 'Bar', id: 'foo', type: 'string' },
        { label: 'Baz', id: 'ttt', type: 'string' }
      ];

      const { baseElement, getAllByText } = render(
        <InsertForm formFields={formFields} />
      );

      fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE });
      expect(getAllByText('Baz')).toHaveLength(2);
    });

    test('Insert form shift-tab keystroke goes to previous', () => {
      const formFields = [
        { label: 'Bar', id: 'foo', type: 'string' },
        { label: 'Baz', id: 'ttt', type: 'string' }
      ];

      const { baseElement, getAllByText } = render(
        <InsertForm formFields={formFields} />
      );

      fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE });
      fireEvent.keyUp(baseElement);
      expect(getAllByText('Bar')).toHaveLength(1);
      expect(getAllByText('Baz')).toHaveLength(2);

      fireEvent.keyDown(baseElement, { keyCode: TAB_KEYSTROKE, shiftKey: true });
      expect(getAllByText('Bar')).toHaveLength(2);
      expect(getAllByText('Baz')).toHaveLength(1);
    });
  });
});

describe('Submitting an insert form using submit button', () => {
  test('Submit button renders on no errors', () => {
    const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

    const { getByText } = render(<InsertForm formFields={formFields} />);

    expect(getByText('Submit')).toBeTruthy();
  });

  test('onSubmit callback', () => {
    const onSubmit = jest.fn();
    const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

    const { getByTestId, getByText } = render(
      <InsertForm
        formFields={formFields}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'Test' });
  });

  test('onSubmit with a parsed field of objects', () => {
    const onSubmit = jest.fn();
    const formFields = [{
      label: 'Bar',
      id: 'foo',
      options: [{ name: 'foo' }],
      parse: val => val ? val.name : '',
      type: 'listfilter'
    }];

    const { getByTestId, getByText } = render(
      <InsertForm formFields={formFields} onSubmit={onSubmit} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({ foo: { name: 'foo' } });
  });

  test('onSubmit with a parsing a matched field', () => {
    const parseMatchedValue = jest.fn(val => val.id);
    const onSubmit = jest.fn();
    const formFields = [{
      label: 'Bar',
      id: 'foo',
      options: [{ id: 'foo', name: 'Foo' }],
      parse: val => val ? val.name : '',
      parseMatchedValue,
      type: 'listfilter'
    }];

    const { getByTestId, getByText } = render(
      <InsertForm formFields={formFields} onSubmit={onSubmit} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Foo' } });
    fireEvent.click(getByText('Submit'));
    expect(parseMatchedValue).toHaveBeenCalledWith({ id: 'foo', name: 'Foo' });
    expect(onSubmit).toHaveBeenCalledWith({ foo: 'foo' });
  });

  test('Resetting after a submission', async () => {
    const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];

    const { getByDisplayValue, getByTestId, getByText } = render(
      <InsertForm formFields={formFields} resetForm={true} />);

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    expect(getByTestId('field-input').value).toBe('Test');

    fireEvent.click(getByText('Submit'));
    expect(getByTestId('field-input').value).toBe('');
  });
});

describe('Initializing the form with data', () => {
  test('Insert form gets initial insertion data', () => {
    const formFields = [{ label: 'Bar', id: 'foo', type: 'string' }];
    const initInsertData = { foo: 'Test' };

    const { getByDisplayValue, getByTestId } = render(
      <InsertForm formFields={formFields} initInsertData={initInsertData} />);


    expect(getByTestId('field-input').value).toBe('Test');
  });
});

describe('Form stepper interaction', () => {
  test('Clicking on a stepper step', async () => {
    const formFields = [
      { label: 'Foo', id: 'foo', type: 'string' },
      { label: 'Bar', id: 'bar', type: 'string' },
      { label: 'Baz', id: 'baz', type: 'string' }
    ];

    const { getByText, getAllByText } = render(<InsertForm formFields={formFields} />);

    expect(getAllByText('Foo')).toHaveLength(2);
    // click the second step
    fireEvent.click(getByText('2'));

    await wait(() => {
      expect(getAllByText('Foo')).toHaveLength(1);
      expect(getAllByText('Bar')).toHaveLength(2);
    });
  });

  test('Clicking on the currently active step on the stepper', async () => {
    const formFields = [
      { label: 'Foo', id: 'foo', type: 'string' },
      { label: 'Bar', id: 'bar', type: 'string' },
      { label: 'Baz', id: 'baz', type: 'string' }
    ];

    const { getByText, getAllByText } = render(<InsertForm formFields={formFields} />);

    expect(getAllByText('Foo')).toHaveLength(2);
    expect(getAllByText('Bar')).toHaveLength(1);
    // click the second step
    fireEvent.click(getByText('1'));

    await wait(() => {
      expect(getAllByText('Foo')).toHaveLength(2);
      expect(getAllByText('Bar')).toHaveLength(1);
    });
  });
});

describe('Linking fields', () => {
  const formFields = [[
    { id: 'text', label: 'Text Input 1' },
    { id: 'dependentField', label: 'Dependent field', onLink: jest.fn() },
  ]];

  const requiredFormFields = [[
    { id: 'text', label: 'Text Input 1', required: true },
    { id: 'dependentField', label: 'Dependent field', onLink: jest.fn() },
  ]];

  test('Render regular links on mount', () => {
    const tree = renderer.create(<InsertForm formFields={formFields} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Render required links on mount', () => {
    const tree = renderer.create(<InsertForm formFields={requiredFormFields} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Original field has no value', () => {
    const { getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.click(getByText('2'));
    const el = getByTestId('field-input');
    expect(el.disabled).toEqual(true);
  });

  test('Original field has a value', () => {
    const { getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    fireEvent.click(getByText('2'));

    const el = getByTestId('field-input');
    expect(el.disabled).toEqual(false);
    expect(getByTestId('stepper-dependentField').className)
      .toEqual(expect.stringContaining('stepper-error'));
  });

  test('Linked values stay on field navigation', () => {
    const { getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    fireEvent.click(getByText('Next'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'bar' } });
    fireEvent.click(getByText('Back'));
    fireEvent.click(getByText('Next'));

    expect(getByTestId('field-input').value).toEqual('bar');
  });

  test('Linked values stay on list filter with objects', () => {
    const formFields = [[
      {
        id: 'listfilter2',
        label: 'List Filter w/ Filter',
        type: 'listfilter',
        options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
        parse: val => typeof val === 'object' ? val.name : val
      },
      { id: 'dependentField', label: 'Dependent field', onLink: jest.fn() },
    ]];
    const { getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });
    fireEvent.click(getByText('Next'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'zz' } });
    fireEvent.click(getByText('Back'));
    fireEvent.click(getByText('Next'));

    expect(getByTestId('field-input').value).toEqual('zz');
  });

  test('Original field value changes and the linked field value clears', async () => {
    const { debug, getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    fireEvent.click(getByText('Next'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'Foo' } });
    fireEvent.click(getByText('Back'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'bar' } });
    fireEvent.click(getByText('Next'));

    await wait(() => {
      const el = getByTestId('field-input');
      expect(el.value).toEqual('');
      expect(el.disabled).toEqual(false);
      expect(getByTestId('stepper-dependentField').className)
        .toEqual(expect.stringContaining('stepper-error'));
    });
  });

  test('Required linked fields and original field has a value', () => {
    const { getByTestId, getByText } = render(<InsertForm formFields={requiredFormFields} />);

    expect(getByTestId('stepper-text').className)
      .toEqual(expect.stringContaining('stepper-error'));
    expect(getByTestId('stepper-dependentField').className)
      .toEqual(expect.stringContaining('stepper-error'));
  });

  test('Required linked fields and original field and linked field has a value', () => {
    const { getByTestId, getByText } = render(<InsertForm formFields={requiredFormFields} />);

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    fireEvent.click(getByText('Next'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });
    fireEvent.click(getByText('Back'));
    expect(getByTestId('stepper-text').className)
      .toEqual(expect.not.stringContaining('stepper-error'));
    expect(getByTestId('stepper-dependentField').className)
      .toEqual(expect.not.stringContaining('stepper-error'));
  });

  test('onLink callback gets called with value when original field is filled in w/ a string', () => {
    const onLink = jest.fn();
    const formFields = [[
      { id: 'text', label: 'Text Input 1' },
      { id: 'dependentField', label: 'Dependent field', onLink },
    ]];

    const { getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test1' } });
    fireEvent.click(getByText('Next'));
    expect(onLink).toHaveBeenCalledWith('Test1');
  });

  test('onLink callback gets called with value when original field is filled in w/ an object', async () => {
    const onLink = jest.fn();
    const formFields = [[
      {
        id: 'listfilter2',
        label: 'List Filter w/ Filter',
        type: 'listfilter',
        options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
        parse: val => typeof val === 'object' ? val.name : val
      },
      { id: 'dependentField', label: 'Dependent field', onLink },
    ]];

    const { debug, getByTestId, getByText } = render(
      <InsertForm formFields={formFields} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });
    await wait(() => {
      fireEvent.click(getByText('Next'));
      expect(onLink).toHaveBeenCalledWith({ name: 'foo' });
    });
  });

  test('Submitting linked fields', () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByText } = render(
      <InsertForm formFields={formFields} onSubmit={onSubmit} />
    );

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test1' } });
    fireEvent.click(getByText('2'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test2' } });
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({
      text: 'Test1',
      dependentField: 'Test2'
    });
  });

  test('Linked fields have no errors if original and linked fields have valid values', () => {
    const { getByTestId, getByText } = render(<InsertForm formFields={formFields} />);

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    fireEvent.click(getByText('Next'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });

    expect(getByTestId('stepper-dependentField').className)
      .toEqual(expect.not.stringContaining('stepper-error'));
  });

  test('Linked field gets cleared when original field throws an error', () => {
    const formFields = [[
      {
        id: 'listfilter2',
        label: 'List Filter w/ Filter',
        type: 'listfilter',
        options: () => ([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
        parse: val => typeof val === 'object' ? val.name : val
      },
      { id: 'dependentField', label: 'Dependent field', onLink: jest.fn(() => ({})) },
    ]];

    const { getByTestId, getByText } = render(<InsertForm formFields={formFields} />);

    fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });
    fireEvent.click(getByText('Next'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'ss' } });
    fireEvent.click(getByText('Back'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'fo' } });

    expect(getByTestId('stepper-dependentField').className)
      .toEqual(expect.not.stringContaining('stepper-error'));
  });

  test('Linked field gets cleared when original field value changes', () => {
    const { getByTestId, getByText } = render(<InsertForm formFields={formFields} />);

    fireEvent.change(getByTestId('field-input'), { target: { value: 'Test' } });
    fireEvent.click(getByText('Next'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'foo' } });
    fireEvent.click(getByText('Back'));
    fireEvent.change(getByTestId('field-input'), { target: { value: 'Te' } });
    fireEvent.click(getByText('Next'));

    expect(getByTestId('field-input').value).toEqual('');
    expect(getByTestId('stepper-dependentField').className)
      .toEqual(expect.stringContaining('stepper-error'));
  });
});
