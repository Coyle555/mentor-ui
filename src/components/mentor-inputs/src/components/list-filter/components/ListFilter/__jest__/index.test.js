import React from 'react';
import { ListFilter } from '../index';
import KeyEvent from '../keyEvents';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

describe('Renders of list filters', () => {
	test('Default render of list filter', () => {
		const tree = renderer.create(<ListFilter />);

		expect(tree.toJSON()).toMatchSnapshot();
		expect(tree.getInstance().instanceRef.lastMatchedVal).toBe('');
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

	test('List of options', async () => {
		const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('List of options with an initial value', async () => { 
		const tree = renderer.create(<ListFilter autoFocus={true} options={options} value="b" />);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('Mount list of options with a custom filter', async () => {
		const filter = jest.fn((value) => Promise.resolve([value]));

		const tree = renderer.create(
			<ListFilter filter={filter} options={options} value="foo" />
		);

		expect(filter).toHaveBeenCalledWith('foo');
	});

	test('Required with no value', async () => {
		const tree = renderer.create(
			<ListFilter autoFocus={true} options={options} required={true} />
		);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('Required with partial value', async () => {
		const tree = renderer.create(
			<ListFilter autoFocus={true} options={options} required={true} value="b" />
		);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
		});
	});

	test('Required with valid value', async () => {
		const tree = renderer.create(
			<ListFilter autoFocus={true} options={options} required={true} value="bar" />
		);

		await wait(() => {
			expect(tree.toJSON()).toMatchSnapshot();
			expect(tree.getInstance().instanceRef.lastMatchedVal).toBe('bar');
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

describe('List filter receiving new props', () => {
	const options = ['foo', 'bar', 'baz'];
	const newOptions = ['new', 'options', 'list'];

	describe('Passing in new value', () => {
		test('New value passed in', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
			tree.update(<ListFilter value="b" />);

			await wait(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('New list of options with a value', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
			tree.update(<ListFilter options={newOptions} value="op" />);

			await wait(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('New valid value passed in', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
			tree.update(<ListFilter value="bar" />);

			await wait(() => {
				expect(tree.getInstance().instanceRef.lastMatchedVal).toBe('bar');
			});
		});

		test('Required with a new invalid value passed in', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} required={true} />
			);
			tree.update(<ListFilter value="b" />);

			await wait(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('Custom filter with a new value and options list', async () => {
			const filter = jest.fn((value) => Promise.resolve([value]));
			const tree = renderer.create(<ListFilter filter={filter} options={options} />);
			tree.update(<ListFilter filter={filter} options={newOptions} value="list" />);

			await wait(() => {
				expect(filter).toHaveBeenCalledWith('list');
			});
		});
	});

	describe('Passing in new options', () => {
		test('New list of options', async () => {
			const tree = renderer.create(<ListFilter autoFocus={true} options={options} />);
			tree.update(<ListFilter options={newOptions} />);

			await wait(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});

		test('Valid value with new options passed in', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} value="list" />
			);
			tree.update(<ListFilter options={newOptions} value="list" />);

			await wait(() => {
				expect(tree.getInstance().instanceRef.lastMatchedVal).toBe('list');
			});
		});

		test('New options passed in that invalidate the current value', async () => {
			const tree = renderer.create(
				<ListFilter autoFocus={true} options={options} value="foo" />
			);
			tree.update(<ListFilter options={newOptions} value="foo" />);

			await wait(() => {
				expect(tree.toJSON()).toMatchSnapshot();
			});
		});
	});
});

describe('Focusing on the list filter', () => {
	const options = ['foo', 'bar', 'baz'];

	test('List filter focus', async () => {
		const { getByRole, getByText } = render(<ListFilter options={options} role="test" />);

		fireEvent.focus(getByRole('test'));

		await wait(() => {
			expect(getByText('foo')).toBeTruthy();
			expect(getByText('bar')).toBeTruthy();
			expect(getByText('baz')).toBeTruthy();
		});
	});

	test('List filter focus with a custom filter', async () => {
		const filter = jest.fn(value => Promise.resolve([value]));
		const { getByRole } = render(
			<ListFilter filter={filter} options={options} role="test" value="foo" />
		);

		fireEvent.focus(getByRole('test'));
		expect(filter).toHaveBeenCalledWith('foo');
	});
});

describe('List filter onChange event', () => {
	const options = ['foo', 'bar', 'baz'];

	describe('On change event as user types', () => {
		test('User types partial match', async () => {
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
			
			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			expect(onChange).toHaveBeenCalledWith(true, 'b', 'inputName');

			await wait(() => {
				expect(queryByText('foo')).toBeNull();
				expect(queryByText('bar')).toBeTruthy();
				expect(queryByText('baz')).toBeTruthy();
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

			await wait(() => {
				expect(queryByText('bar')).toBeTruthy();
			});
		});

		test('On change event with a custom filter', async () => {
			const filter = jest.fn(value => Promise.resolve([value]));

			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					filter={filter}
					name="inputName"
					options={options}
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
			expect(onChange).toHaveBeenCalledWith(false, 'bar', 'inputName');
		});
	});

	describe('Matching on empty', () => {
		test('Match on empty with onMatch handler', async () => {
			const onMatch = jest.fn();
			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					matchOnEmpty={true}
					name="inputName"
					onMatch={onMatch}
					options={options}
					role="test"
					value="foo"
				/>
			);
			
			fireEvent.change(getByRole('test'), { target: { value: '' } });
			expect(onMatch).toHaveBeenCalledWith('', 'inputName');
		});

		test('Match on empty with required, onChange handler, and onMatch handler', async () => {
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					matchOnEmpty={true}
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

		test('Match on empty with when previous match was empty', async () => {
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole, queryByText } = render(
				<ListFilter
					autoFocus={true}
					matchOnEmpty={true}
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
					filter={filter}
					name="inputName"
					onChange={onChange}
					role="test"
				/>
			);
			
			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			expect(filter).toHaveBeenCalledWith('b');

			await wait(() => {
				expect(onChange).toHaveBeenCalledWith(false, 'b', 'inputName');
			});
		});

		test('On change event with a custom filter and invalid value', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onChange = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					filter={filter}
					name="inputName"
					onChange={onChange}
					role="test"
				/>
			);
			
			fireEvent.change(getByRole('test'), { target: { value: 'b' } });

			await wait(() => {
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
					filter={filter}
					name="inputName"
					onMatch={onMatch}
					role="test"
				/>
			);
			
			fireEvent.change(getByRole('test'), { target: { value: 'bar' } });
			await wait(() => {
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
					filter={filter}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					role="test"
				/>
			);
			
			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			await wait(() => {
				expect(onChange).toHaveBeenCalledWith(true, 'b', 'inputName');
			});
		});

		test('Last matched value gets matched again', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					filter={filter}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					role="test"
					value="foo"
				/>
			);
			
			fireEvent.change(getByRole('test'), { target: { value: 'b' } });
			fireEvent.change(getByRole('test'), { target: { value: 'foo' } });
			await wait(() => {
				expect(onChange).toHaveBeenCalledWith(false, 'foo', 'inputName');
			});
		});
	});

	describe('Matching on empty event with a custom filter', () => {
		test('On match event with a custom filter and match on empty', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					filter={filter}
					matchOnEmpty={true}
					name="inputName"
					onMatch={onMatch}
					role="test"
					value="bar"
				/>
			);
			
			fireEvent.change(getByRole('test'), { target: { value: '' } });
			await wait(() => {
				expect(onMatch).toHaveBeenCalledWith('', 'inputName');
			});
		});

		test('Last matched value was empty', async () => {
			const filter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
			const onChange = jest.fn();
			const onMatch = jest.fn();

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					filter={filter}
					name="inputName"
					onChange={onChange}
					onMatch={onMatch}
					role="test"
				/>
			);
			
			fireEvent.change(getByRole('test'), { target: { value: 'ba' } });
			fireEvent.change(getByRole('test'), { target: { value: '' } });
			await wait(() => {
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
			await wait(() => {
				expect(onMatch).toHaveBeenCalledWith('foo', 'inputName');
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
			await wait(() => {
				expect(onMatch).toHaveBeenCalledWith('foo', 'inputName');
			});
		});

		test('Auto complete with a custom filter', async () => {
			const filter = jest.fn(value => Promise.resolve([value]));

			const { getByRole } = render(
				<ListFilter
					autoFocus={true}
					filter={filter}
					options={options}
					role="test"
				/>
			);
			
			fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ENTER });
			expect(filter).toHaveBeenCalledWith('foo');
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
			await wait(() => {
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
			await wait(() => {
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
			
			await wait(async () => {
				expect(queryByText('foo')).toBeTruthy();

				fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_ESCAPE });
				await wait(() => {
					expect(queryByText('foo')).toBeNull();
				});
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
			
			await wait(async () => {
				expect(queryByText('foo')).toBeTruthy();

				fireEvent.keyDown(getByRole('test'), { keyCode: KeyEvent.DOM_VK_TAB });
				await wait(() => {
					expect(queryByText('foo')).toBeNull();
				});
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
			await wait(() => {
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
			await wait(() => {
				expect(onMatch).toHaveBeenCalledWith('baz', 'inputName');
			});
		});

		test('Clicking a list item with a custom filter', async () => {
			const filter = jest.fn();
			const { queryByText } = render(
				<ListFilter
					autoFocus={true}
					filter={filter}
					name="inputName"
					options={options}
				/>
			);
			
			fireEvent.click(queryByText('baz'));
			expect(filter).toHaveBeenCalledWith('baz');
		});
	});
});
