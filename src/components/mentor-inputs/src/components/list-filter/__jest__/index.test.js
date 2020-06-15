import React from 'react';
import { ListFilter } from '../index';
import KeyEvent from '../keyEvents';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, waitFor, wait } from '@testing-library/react';

afterEach(cleanup);

describe('Renders of list filters', () => {
	test('Default render of list filter', () => {
		const tree = renderer.create(<ListFilter />);

		expect(tree.toJSON()).toMatchSnapshot();
		expect(tree.getInstance().rawOptions).toEqual([]);
	});

	test('Render with a custom css class', () => {
		const tree = renderer.create(<ListFilter className="foo" />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Render with a custom list container css class', () => {
		const tree = renderer.create(
			<ListFilter autoFocus={true} listClasses={{ container: 'container' }} />
		).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Render with a custom list container style', () => {
		const tree = renderer.create(
			<ListFilter autoFocus={true} listStyle={{ container: { width: 10 } }} />
		).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('Mounting a list filter', () => {
	const options = ['foo', 'bar', 'baz'];

	describe('Mounting a non required input', () => {
		test('List of options', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);

			await waitFor(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('List of options with an initial value', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} value="b" />);

			await waitFor(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('Mount list of options with a custom filter', async () => {
			const filter = jest.fn((value) => Promise.resolve([value]));

			const tree = renderer.create(
				<ListFilter options={filter} value="foo" />
			);

			await waitFor(() => {
				expect(filter).toHaveBeenCalledWith('foo');
				expect(tree.getInstance().rawOptions).toEqual(['foo']);
			});
		});

		test('Options with a parse function', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const tree = renderer.create(
				<ListFilter
					options={[{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]}
					parse={parse}
				/>
			);

			expect(parse).toHaveBeenCalledWith({ name: 'foo' });
			expect(parse).toHaveBeenCalledWith({ name: 'bar' });
			expect(parse).toHaveBeenCalledWith({ name: 'baz' });
		});

		test('Options with a parse function and initial value', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const tree = renderer.create(
				<ListFilter
					options={[{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]}
					parse={parse}
					value={{ name: 'bar' }}
				/>
			);
			expect(parse).toHaveBeenCalledWith({ name: 'bar' });
		});

		test('Option function with a parse function', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const options = jest.fn(() => Promise.resolve(
				[{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]
			));
			const tree = renderer.create(
				<ListFilter options={options} parse={parse} />
			);

			await waitFor(() => {
				expect(parse).toHaveBeenCalled();
				expect(options).toHaveBeenCalled();
			});
		});

		test('Option function with a parse function and value', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const options = jest.fn(val =>
				val === 'bar'
					? [{ name: 'bar' }]
					: [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]
			);

			const tree = renderer.create(
				<ListFilter
					autoFocus={true}
					options={options}
					parse={parse}
					value={{ name: 'bar' }}
				/>
			);

			await waitFor(() => {
				expect(parse).toHaveBeenCalled();
				expect(options).toHaveBeenCalled();
			});
			// this expect is after waitFor because it allows all
			//  promises to resolve before running 
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	describe('Mounting with a required input', () => {
		test('Required with no value', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} required={true} />
			);

			await waitFor(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('Required with partial value', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} required={true} value="b" />
			);

			await waitFor(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('Required with valid value', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} required={true} value="bar" />
			);

			await waitFor(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('Required with custom validation', async () => {
			const validation = jest.fn();
			const tree = renderer.create(
				<ListFilter
					autoFocus={true}
					name="test"
					options={options}
					required={true}
					validation={validation}
					value="bar"
				/>
			);

			expect(validation).toHaveBeenCalledWith('bar', 'test', ['bar']);
		});
	});
});

describe('List filter receiving new props', () => {
	const options = ['foo', 'bar', 'baz'];
	const newOptions = ['new', 'options', 'list'];

	describe('Passing in new value', () => {
		test('New value passed in', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
			tree.update(<ListFilter value="b" />);

			expect(tree.toJSON()).toMatchSnapshot();
		});

		test('New list of options with a value', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
			tree.update(<ListFilter options={newOptions} value="op" />);
			expect(tree.toJSON()).toMatchSnapshot();
		});

		test('New valid value passed in', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
			tree.update(<ListFilter value="bar" />);
			expect(tree.toJSON()).toMatchSnapshot();
		});

		test('Required with a new invalid value passed in', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} required={true} />
			);
			tree.update(<ListFilter value="b" />);

			expect(tree.toJSON()).toMatchSnapshot();
		});

		test('Custom filter with a new value and options list', async () => {
			const filter = jest.fn((value) => Promise.resolve([value]));
			const tree = renderer.create(<ListFilter options={filter} />);
			tree.update(<ListFilter options={filter} value="list" />);

			expect(filter).toHaveBeenCalledWith('list');
		});

		test('New list of options and new value with a parse function', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const tree = renderer.create(
				<ListFilter
					options={[{ name: 'foo' }]}
					parse={parse}
					value={{ name: 'foo' }}
				/>
			);
			tree.update(
				<ListFilter
					options={[{ name: 'bar' }, { name: 'baz' }]}
					value={{ name: 'bar' }}
				/>
			);

			// called after foo on construction and mount
			expect(parse).toHaveBeenCalledWith({ name: 'bar' });
			expect(parse).toHaveBeenCalledWith({ name: 'bar' });
			expect(parse).toHaveBeenCalledWith({ name: 'baz' });
		});
	});

	describe('Passing in new options', () => {
		test('New list of options', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
			tree.update(<ListFilter options={newOptions} />);

			await waitFor(() => {
				expect(tree.toJSON()).toMatchSnapshot();
				expect(tree.getInstance().rawOptions).toEqual(['new', 'options', 'list']);
			});
		});

		test('New list of options with a parse function', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const tree = renderer.create(<ListFilter options={[{ name: 'foo' }]} parse={parse} />);
			tree.update(<ListFilter options={[{ name: 'bar' }, { name: 'baz' }]} />);

			// just checking that bar & baz are parsed at some point with the new list because
			//   parse is used several times, so it's hard to accurately pinpoint which call
			//   bar & baz fall on
			expect(parse).toHaveBeenCalledWith({ name: 'bar' });
			expect(parse).toHaveBeenCalledWith({ name: 'baz' });
		});

		test('Valid value with new options passed in', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} value="list" />
			);
			tree.update(<ListFilter options={newOptions} value="list" />);

			await waitFor(() => {
				expect(tree.getInstance().rawOptions).toEqual(['new', 'options', 'list']);
			});
		});

		test('New options passed in that invalidate the current value', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} value="foo" />
			);
			tree.update(<ListFilter options={newOptions} value="foo" />);

			expect(tree.toJSON()).toMatchSnapshot();
		});
	});
});

describe('Focusing on the list filter', () => {
	const options = ['foo', 'bar', 'baz'];

	test('List filter focus', async () => {
		const { getByRole, getByText } = render(<ListFilter options={options} role="test" />);

		fireEvent.focus(getByRole('test'));

		await waitFor(() => {
			expect(getByText('foo')).toBeTruthy();
			expect(getByText('bar')).toBeTruthy();
			expect(getByText('baz')).toBeTruthy();
		});
	});

	test('List filter focus with an onFocus event handler', async () => {
		const onFocus = jest.fn();
		const { getByRole } = render(
			<ListFilter onFocus={onFocus} options={options} role="test" />
		);

		fireEvent.focus(getByRole('test'));
		expect(onFocus).toHaveBeenCalled();
	});
});

describe('List filter onChange event', () => {
	const options = ['foo', 'bar', 'baz'];

	describe('On change event as user types', () => {
		test('User types partial match', async () => {
			const onChange = jest.fn();
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const { debug, getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onChange={onChange}
					options={[{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]}
					parse={parse}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			expect(onChange).toHaveBeenCalledWith(true, 'b', 'inputName');

			await waitFor(() => {
				expect(queryByText('foo')).toBeNull();
				expect(queryByText('bar')).toBeTruthy();
				expect(queryByText('baz')).toBeTruthy();
				expect(parse).toHaveBeenCalledWith({ name: 'foo' });
				expect(parse).toHaveBeenCalledWith({ name: 'bar' });
				expect(parse).toHaveBeenCalledWith({ name: 'baz' });
			});
		});

		test('User types complete match with onChange handler', async () => {
			const onChange = jest.fn();
			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onChange={onChange}
					options={options}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'bar' } });
			expect(onChange).toHaveBeenCalledWith(false, 'bar', 'inputName');

			await waitFor(() => {
				expect(queryByText('bar')).toBeTruthy();
			});
		});

		test('On change event with a custom filter', async () => {
			const filter = jest.fn(value => Promise.resolve([value]));

			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			expect(filter).toHaveBeenCalledWith('b');
		});
	});

	describe('User types a match', () => {
		test('User types complete match with onMatch handler', async () => {
			const onMatch = jest.fn();
			const { container, getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'bar' } });
			expect(onMatch).toHaveBeenCalledWith('bar', 'inputName');
		});

		test('User types complete match and parses matched value', async () => {
			const options = [
				{ id: 'foo', name: 'Foo' },
				{ id: 'bar', name: 'Bar' },
				{ id: 'baz', name: 'Baz' }
			];

			const parseMatchedValue = jest.fn(val => val.id);
			const { container, getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={() => { }}
					options={options}
					parse={val => typeof val === 'object' ? val.name : val}
					parseMatchedValue={parseMatchedValue}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'Bar' } });
			expect(parseMatchedValue).toHaveBeenCalledWith({ id: 'bar', name: 'Bar' });
		});

		test('User types complete match with onMatch handler and parse function', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const onMatch = jest.fn();
			const { container, getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={[{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]}
					parse={parse}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'bar' } });
			expect(onMatch).toHaveBeenCalledWith({ name: 'bar' }, 'inputName');
		});

		test('User types complete match with onMatch handler, custom filter, and parse function', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const filter = jest.fn(val => val === 'bar'
				? [{ name: 'bar' }]
				: [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]
			);
			const onMatch = jest.fn();
			const { container, getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onMatch={onMatch}
					parse={parse}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'bar' } });
			expect(filter).toHaveBeenCalledTimes(2);

			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith({ name: 'bar' }, 'inputName');
			});
		});

		test('User types match that was a previous match', async () => {
			const onChange = jest.fn();
			const onMatch = jest.fn();
			const { container, getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					options={options}
					role="test"
					value="bar"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			fireEvent.change(getByRole('test'), { target: { value: 'bar' } });
			expect(onChange).toHaveBeenCalledWith(true, 'b', 'inputName');
			expect(onMatch).toHaveBeenCalledWith('bar', 'inputName');
		});
	});

	describe('Matching on empty', () => {
		test('Matching on empty with onMatch handler', async () => {
			const onMatch = jest.fn();
			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
					role="test"
					value="foo"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: '' } });
			expect(onMatch).not.toHaveBeenCalled();
		});

		test('Matching on empty with required, onChange handler, and onMatch handler', async () => {
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					options={options}
					required={true}
					role="test"
					value="foo"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: '' } });
			expect(onChange).toHaveBeenCalledWith(true, '', 'inputName');
		});

		test('Matching on empty when previous match was empty', async () => {
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					options={options}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			fireEvent.change(getByRole('test'), { target: { value: '' } });
			expect(onChange).toHaveBeenCalledWith(false, '', 'inputName');
		});
	});
});

describe('Custom filtering on a list filter', () => {

	describe('Change events with a custom filter', () => {
		test('On change event with a custom filter and valid value', async () => {
			const filter = jest.fn(value => Promise.resolve([value]));
			const onChange = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onChange={onChange}
					role="test"
				/>
			);
      /*
      * The following is a hacky solution to get this test to pass
      * reason: onChange isn't called until loadFilterOptions because of the branch
      * case found in this.onChange from using a custom filter. It isn't
      * allowed until initialLoadComplete is set to true. However; initialLoadComplete
      * isn't true until after the first call of loadFilterOptions. Therefore, I fired
      * a change event with an empty string to getInitialLoadComplete set to true, and
      * again to assert the test. After the first event fire, the first waitFor is used just to 
      * give time for all the promises to resolve
      * */
			fireEvent.change(getByRole('test'), { target: { value: '' } });
			await waitFor(() => {
				expect(onChange).not.toHaveBeenCalled();
			});
			// End hacky solution

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			expect(filter).toHaveBeenCalledWith('b');

			await waitFor(() => {
				expect(onChange).toHaveBeenCalledWith(false, 'b', 'inputName');
			});
		});

		test('On change event with a custom filter and invalid value', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onChange = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onChange={onChange}
					role="test"
				/>
			);
      /*
      * The following is a hacky solution to get this test to pass
      * reason: onChange isn't called until loadFilterOptions because of the branch
      * case found in this.onChange from using a custom filter. It isn't
      * allowed until initialLoadComplete is set to true. However; initialLoadComplete
      * isn't true until after the first call of loadFilterOptions. Therefore, I fired
      * a change event with an empty string to getInitialLoadComplete set to true, and
      * again to assert the test. After the first event fire, the first waitFor is used just to 
      * give time for all the promises to resolve
      * */
			fireEvent.change(getByRole('test'), { target: { value: '' } });
			await waitFor(() => {
				expect(onChange).not.toHaveBeenCalled();
			});
			// End hacky solution

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			await waitFor(() => {
				expect(onChange).toHaveBeenCalledWith(true, 'b', 'inputName');
			});
		});
	});

	describe('Match events with a custom filter', () => {
		test('On match event with a custom filter', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onMatch={onMatch}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'bar' } });
			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith('bar', 'inputName');
			});
		});

		test('On match event with a custom filter and invalid value', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			await waitFor(() => {
				expect(onMatch).not.toHaveBeenCalled();
			});
		});

		test('Last matched value gets matched again', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					role="test"
					value="foo"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			fireEvent.change(getByRole('test'), { target: { value: 'foo' } });
			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith('foo', 'inputName');
			});
		});
	});

	describe('Matching on empty event with a custom filter', () => {
		test('On match event with a custom filter and matching on empty', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onMatch = jest.fn();

			const { getByRole, getByText } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onMatch={onMatch}
					role="test"
					value="bar"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: '' } });
			await waitFor(() => {
				expect(onMatch).not.toHaveBeenCalled();

			});
		});

		test('Last matched value was empty', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'ba' } });
			fireEvent.change(getByRole('test'), { target: { value: '' } });
			await waitFor(() => {
				expect(onChange).toHaveBeenCalledWith(false, '', 'inputName');
			});
		});
	});
});

describe('List filter onKeyDown event', () => {
	const options = ['foo', 'bar', 'baz'];

	describe('Auto complete key down event', () => {
		test('Auto complete with enter', async () => {
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
					role="test"
				/>
			);

			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ENTER });
			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith('foo', 'inputName');
			});
		});

		test('Auto complete with enter and parsing function', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					options={[{ name: 'foo' }, { name: 'bar' }]}
					parse={parse}
					role="test"
				/>
			);

			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ENTER });
			await waitFor(() => {
				expect(parse).toHaveBeenCalledWith({ name: 'foo' });
				expect(parse).toHaveBeenCalledWith({ name: 'bar' });
			});
		});

		test('Auto complete with return', async () => {
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
					role="test"
				/>
			);

			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_RETURN });
			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith('foo', 'inputName');
			});
		});

		test('Auto complete with a custom filter', async () => {
			const filter = jest.fn(value => {
				return Promise.resolve(options)
			});

			const { getByRole, getByText } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					role="test"
				/>
			);
			// wait for the autocomplete filter menu to appear.
			//   the mocked promise needs to resolve on initial filter
			await waitFor(() => getByText('foo'));
			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ENTER });
			await waitFor(() => {
				expect(filter).toHaveBeenCalledWith('foo');
			});
		});
	});

	describe('Navigation key down event', () => {
		test('Auto complete with a selected option via going down navigation', async () => {
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
					role="test"
				/>
			);

			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_DOWN });
			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_DOWN });
			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_UP });
			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ENTER });
			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith('foo', 'inputName');
			});
		});

		test('Auto complete with a selected option via going up navigation', async () => {
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
					role="test"
				/>
			);

			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_UP });
			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ENTER });
			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith('baz', 'inputName');
			});
		});
	});

	describe('Closing the options menu keydown event', () => {
		test('Closing options menu with escape', async () => {
			const { queryByText, getByRole } = render(
				<ListFilter
					autoFocus={true}
					options={options}
					role="test"
				/>
			);
			expect(queryByText('foo')).toBeTruthy();

			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ESCAPE });

			await waitFor(() => {
				expect(queryByText('foo')).toBeNull();
			});
		});

		test('Closing options menu with tab', async () => {
			const { queryByText, getByRole } = render(
				<ListFilter
					autoFocus={true}
					options={options}
					role="test"
				/>
			);

			expect(queryByText('foo')).toBeTruthy();

			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_TAB });
			await waitFor(() => {
				expect(queryByText('foo')).toBeNull();
			});
		});
	});
});

describe('Handling list item events', () => {
	const options = ['foo', 'bar', 'baz'];

	describe('Mouse over event', () => {
		test('Mouse over list item', async () => {
			const onMatch = jest.fn();
			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
					role="test"
				/>
			);

			fireEvent.mouseOver(queryByText('baz'));
			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ENTER });
			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith('baz', 'inputName');
			});
		});
	});

	describe('Click event', () => {
		test('Clicking a list item', async () => {
			const onMatch = jest.fn();
			const { queryByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
				/>
			);

			fireEvent.click(queryByText('baz'));
			await waitFor(() => {
				expect(onMatch).toHaveBeenCalledWith('baz', 'inputName');
			});
		});

		test('Clicking a list item with parse', async () => {
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const onMatch = jest.fn();
			const { getByText } = render(
				<ListFilter
					autoFocus={true}
					name="inputName"
					onMatch={onMatch}
					options={[{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]}
					parse={parse}
				/>
			);

			await waitFor(() => getByText('baz'))
			fireEvent.click(getByText('baz'));
			await waitFor(() => {
				expect(parse).toHaveBeenCalledWith({ name: 'foo' });
				expect(parse).toHaveBeenCalledWith({ name: 'bar' });
				expect(parse).toHaveBeenCalledWith({ name: 'baz' });
				expect(onMatch).toHaveBeenCalledWith({ name: 'baz' }, 'inputName');
			});
		});

		test('Clicking a list item with a custom filter', async () => {
			const filter = jest.fn(val => options);
			const { debug, getByText } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
				/>
			);
			await waitFor(() => getByText('baz'))
			fireEvent.click(getByText('baz'));
			await waitFor(() => {
				expect(filter).toHaveBeenCalledWith('');
				expect(filter).toHaveBeenCalledWith('baz');
			});
		});

		test('Clicking a list item with custom filter and parse', async () => {
			const onMatch = jest.fn();
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const filter = jest.fn(() => Promise.resolve([
				{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }
			]));
			const { getByText } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					name="inputName"
					onMatch={onMatch}
					parse={parse}
				/>
			);

			await waitFor(() => getByText('baz'))
			fireEvent.click(getByText('baz'));
			await waitFor(() => {
				expect(parse).toHaveBeenCalledWith({ name: 'foo' });
				expect(parse).toHaveBeenCalledWith({ name: 'bar' });
				expect(parse).toHaveBeenCalledWith({ name: 'baz' });
				expect(onMatch).toHaveBeenCalledWith({ name: 'baz' }, 'inputName');
			});
		});
	});
});

describe('Filtering with a parse function', () => {
	describe('Default filtering', () => {
		test('Parse function with the default fuzzy filter', () => {
			const parse = jest.fn(val => val);
			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					parse={parse}
					options={['foo', 'bar', 'baz']}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			expect(parse).toHaveBeenCalledWith('foo');
			expect(parse).toHaveBeenCalledWith('bar');
			expect(parse).toHaveBeenCalledWith('baz');
		});
	});

	describe('Custom filtering', () => {
		test('Parse function with a custom filter', async () => {
			const filter = jest.fn(val => Promise.resolve([
				{ id: 'foo', name: 'Foo' },
				{ id: 'bar', name: 'Bar' },
				{ id: 'baz', name: 'Baz' }
			]));
			const parse = jest.fn(val => typeof val === 'object' ? val.name : val);
			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					options={filter}
					parse={parse}
					role="test"
				/>
			);

			fireEvent.change(getByRole('test'), { target: { value: 'f' } });

			await waitFor(() => {
				expect(parse).toHaveBeenCalledWith({ id: 'foo', name: 'Foo' });
				expect(parse).toHaveBeenCalledWith({ id: 'bar', name: 'Bar' });
				expect(parse).toHaveBeenCalledWith({ id: 'baz', name: 'Baz' });

				expect(queryByText('Foo')).toBeTruthy();
				expect(queryByText('Bar')).toBeTruthy();
				expect(queryByText('Baz')).toBeTruthy();
			});
		});
	});
});

describe('Clearing input', () => {
	test('Clear input icon click', async () => {
		const { getByRole, getByTestId, queryByText } = render(
			<ListFilter
				autoFocus={true}
				options={['foo', 'bar', 'baz']}
				role="test"
			/>
		);

		fireEvent.change(getByRole('test'), { target: { value: 'foo' } });
		await waitFor(async () => {
			expect(queryByText('foo')).toBeTruthy();
			expect(queryByText('bar')).toBeNull();
			expect(queryByText('baz')).toBeNull();
		});

		fireEvent.click(getByTestId('clear-input'));

		await waitFor(() => {
			expect(queryByText('foo')).toBeTruthy();
			expect(queryByText('bar')).toBeTruthy();
			expect(queryByText('baz')).toBeTruthy();
		});
	});
});
