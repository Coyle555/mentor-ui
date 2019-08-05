import React from 'react';
import { ListFilter } from '../index';
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
