jest.mock('react-datepicker', () => {
	return (props) => <div>Datepicker: {JSON.stringify(props)}</div>;
});

import React from 'react';
import { TypeaheadComponent } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

const keyCodes = {
	BACKSPACE: 8,
	TAB: 9,
	RETURN: 13,
	ENTER: 14,
	ESCAPE: 27,
	UP: 38,
	DOWN: 40
};

describe('Rendering states of typeahead', () => {

	test('Default render', () => {
		const tree = renderer.create(<TypeaheadComponent />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Custom class render', () => {
		const tree = renderer.create(<TypeaheadComponent customClasses={{ input: 'foo' }} />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Label render', () => {
		const tree = renderer.create(<TypeaheadComponent label="foo" />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Operator label render', () => {
		const tree = renderer.create(<TypeaheadComponent operator="bar" />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('Typeahead with a list of options', () => {
	
	test('List of string options', async () => {
		const { container } = await render(<TypeaheadComponent options={['foo', 'bar', 'baz']} />);

		fireEvent.click(container.querySelector('input'));
		expect(container).toMatchSnapshot();
	});

	test('Initialized raw options', async () => {
		const tree = renderer.create(<TypeaheadComponent options={['foo', 'bar', 'baz']} />);

		expect(tree.getInstance().rawOptions).toEqual(['foo', 'bar', 'baz']);
	});

	test('Initialized raw options function with parse', async () => {
		const parse = jest.fn(val => val.name);
		const options = jest.fn(() => Promise.resolve([{ name: 'foo' }, { name: 'bar' }]));
		const tree = renderer.create(<TypeaheadComponent options={options} parse={parse} />);

		await wait(() => {
			expect(parse).toHaveBeenNthCalledWith(1, { name: 'foo' });
			expect(parse).toHaveBeenNthCalledWith(2, { name: 'bar' });
			expect(tree.getInstance().rawOptions).toEqual([{ name: 'foo' }, { name: 'bar' }]);
		});
	});

	test('List of options with a parse func', async () => {
		const parse = jest.fn(val => val.name);
		const { container } = await render(
			<TypeaheadComponent
				options={[
					{ name: 'foo' },
					{ name: 'bar' },
					{ name: 'baz' }
				]}
				parse={parse}
			/>
		);

		fireEvent.click(container.querySelector('input'));
		expect(parse).toHaveBeenNthCalledWith(1, { name: 'foo' });
		expect(parse).toHaveBeenNthCalledWith(2, { name: 'bar' });
		expect(parse).toHaveBeenNthCalledWith(3, { name: 'baz' });
	});

	test('Options that are generated from a function', async () => {
		const options = jest.fn(() => (['1', '2', '3']));
		const { container } = await render(<TypeaheadComponent options={options} />);

		fireEvent.click(container.querySelector('input'));
		expect(options).toHaveBeenCalledWith('');
		expect(container).toMatchSnapshot();
	});

	test('Options that are generated from a function and a parse func', async () => {
		const parse = jest.fn(val => val.name);
		const options = jest.fn(() => ([{ name: '1' }, { name: '2' }, { name: '3' }]));
		const { container } = await render(<TypeaheadComponent options={options} parse={parse} />);

		fireEvent.click(container.querySelector('input'));
		expect(options).toHaveBeenCalledWith('');
		expect(parse).toHaveBeenNthCalledWith(1, { name: '1' });
		expect(parse).toHaveBeenNthCalledWith(2, { name: '2' });
		expect(parse).toHaveBeenNthCalledWith(3, { name: '3' });
	});

	test('New list of options passed down', async () => {
		const {
			container,
			getByText,
			queryByText,
			rerender
		} = await render(<TypeaheadComponent options={['a', 'b', 'c']} />);

		fireEvent.click(container.querySelector('input'));
		expect(getByText('a')).toBeTruthy();

		await rerender(<TypeaheadComponent options={['d', 'e', 'f']} />);
		fireEvent.click(container.querySelector('input'));
		expect(queryByText('a')).toBeFalsy();
		expect(getByText('d')).toBeTruthy();
	});

	test('Empty list of options', async () => {
		const { container } = await render(<TypeaheadComponent options={[]} />);

		fireEvent.click(container.querySelector('input'));
		expect(container).toMatchSnapshot();
	});

	test('Datepicker instead of a list of options', async () => {
		const { container } = await render(<TypeaheadComponent datatype="datetime" />);

		fireEvent.click(container.querySelector('input'));
		expect(container).toMatchSnapshot();
	});
});

describe('Sending new options to the typeahead', () => {
	test('New list of options with a parse func', async () => {
		const parse = jest.fn(val => val.name);
		const { container, rerender } = await render(
			<TypeaheadComponent options={[]} parse={parse} />
		);

		await rerender(
			<TypeaheadComponent
				options={[{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]}
				parse={parse}
			/>
		);

		fireEvent.click(container.querySelector('input'));
		expect(parse).toHaveBeenNthCalledWith(1, { name: 'foo' });
		expect(parse).toHaveBeenNthCalledWith(2, { name: 'bar' });
		expect(parse).toHaveBeenNthCalledWith(3, { name: 'baz' });
	});

	test('New list of options that are generated from a function and a parse func', async () => {
		const parse = jest.fn(val => val.name);
		const options = jest.fn(() => ([{ name: '1' }]));
		const { container, debug, rerender } = await render(
			<TypeaheadComponent options={options} parse={parse} />
		);

		await rerender(
			<TypeaheadComponent
				options={[{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]}
				parse={parse}
			/>
		);

		fireEvent.click(container.querySelector('input'));
		expect(options).toHaveBeenCalledWith('');
		expect(parse).toHaveBeenNthCalledWith(2, { name: 'foo' });
		expect(parse).toHaveBeenNthCalledWith(3, { name: 'bar' });
		expect(parse).toHaveBeenNthCalledWith(4, { name: 'baz' });
	});

	test('New raw options', async () => {
		const parse = val => val.name;
		const options = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];
		const newOptions = [{ name: '1' }, { name: '2' }, { name: '3' }];
		const tree = renderer.create(<TypeaheadComponent options={options} parse={parse} />);
		tree.update(<TypeaheadComponent options={newOptions} parse={parse} />);

		await wait(() => {
			expect(tree.getInstance().rawOptions).toEqual([
				{ name: '1' },
				{ name: '2' },
				{ name: '3' }
			]);
		});
	});

	test('New raw options with generated options', async () => {
		const parse = val => val.name;
		const newOptions = jest.fn(() => ([{ name: '1' }]));
		const options = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];
		const tree = renderer.create(<TypeaheadComponent options={options} parse={parse} />);
		tree.update(<TypeaheadComponent options={newOptions} parse={parse} />);

		await wait(() => {
			expect(tree.getInstance().rawOptions).toEqual([{ name: '1' }]);
		});
	});
});

describe('Updating the list of options as a user types', () => {

	test('Filtering a list of string options', async () => {
		const { container, queryByText } = render(<TypeaheadComponent options={['foo', 'bar', 'baz']} />);

		fireEvent.click(container.querySelector('input'));
		fireEvent.change(container.querySelector('input'), { target: { value: 'b' } });

		await wait(() => {
			expect(queryByText('foo')).toBeFalsy();
			expect(container.querySelector('ul').children.length).toBe(2);
			expect(container).toMatchSnapshot();
		});
	});

	test('Filtering a list of string options with a parse', async () => {
		const parse = jest.fn(val => val === 'a' ? 'alpha' : val)
		const { container, queryByText } = render(
			<TypeaheadComponent options={['foo', 'bar', 'baz']} parse={parse} />
		);

		fireEvent.click(container.querySelector('input'));
		fireEvent.change(container.querySelector('input'), { target: { value: 'a' } });

		await wait(() => {
			expect(parse).toHaveBeenNthCalledWith(4, 'foo');
			expect(parse).toHaveBeenNthCalledWith(5, 'bar');
			expect(parse).toHaveBeenNthCalledWith(6, 'baz');
		});
	});

	test('Filtering a list of options with a function', async () => {
		const options = jest.fn((val) => val === 'b' ? ['banana'] : ['apple']);

		const { container, queryByText } = render(<TypeaheadComponent options={options} />);

		fireEvent.click(container.querySelector('input'));
		fireEvent.change(container.querySelector('input'), { target: { value: 'b' } });

		await wait(() => {
			expect(queryByText('apple')).toBeFalsy();
			expect(queryByText('banana')).toBeTruthy();
			expect(container.querySelector('ul').children.length).toBe(1);
			expect(container).toMatchSnapshot();
		});
	});

	test('Filtering a list of options with a function and a parse', async () => {
		const parse = jest.fn(val => val.name);
		const options = jest.fn(val => val === 'b' ? ['banana'] : ['apple']);
		const { container, queryByText } = render(
			<TypeaheadComponent options={options} parse={parse} />);

		fireEvent.click(container.querySelector('input'));
		fireEvent.change(container.querySelector('input'), { target: { value: 'b' } });

		await wait(() => {
			expect(parse).toHaveBeenNthCalledWith(1, 'apple');
			expect(parse).toHaveBeenNthCalledWith(2, 'banana');
		});
	});
});

describe('Handling key events', () => {
	
	describe('Closing the menu with escape', () => {
		test('Escape keystroke', async () => {
			const { container } = render(<TypeaheadComponent options={['foo', 'bar', 'baz']} />);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				expect(container.querySelector('ul').children.length).toBe(3);
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.ESCAPE });

				await wait(() => {
					expect(container.querySelector('div.typeahead').children.length).toBe(1);
				});
			});
		});
	});

	describe('Navigating up and down the menu', () => {
		test('Going down keystroke', async () => {
			const { container } = render(<TypeaheadComponent options={['foo', 'bar', 'baz']} />);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.DOWN });

				await wait(() => {
					expect(container).toMatchSnapshot();
				});
			});
		});

		test('Going up keystroke', async () => {
			const { container } = render(<TypeaheadComponent options={['foo', 'bar', 'baz']} />);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.UP });

				await wait(() => {
					expect(container).toMatchSnapshot();
				});
			});
		});

		test('Going up/down keystroke with no options', async () => {
			const { container } = render(<TypeaheadComponent options={[]} />);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.UP });

				await wait(() => {
					expect(container).toMatchSnapshot();
				});
			});
		});
	});

	describe('Matching an option in the list', () => {
		test('Enter keystroke on default option', async () => {
			const addTokenForValue = jest.fn();
			const { container } = render(
				<TypeaheadComponent
					addTokenForValue={addTokenForValue}
					options={['foo', 'bar', 'baz']}
				/>
			);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.ENTER });

				await wait(() => {
					expect(addTokenForValue).toHaveBeenCalledWith('foo');
				});
			});
		});

		test('Enter keystroke on option function with a parse', async () => {
			const options = jest.fn(() => Promise.resolve([
				{ name: 'foo' },
				{ name: 'bar' },
				{ name: 'baz' }
			]));
			const parse = jest.fn(val => val.name);
			const addTokenForValue = jest.fn();
			const { container } = render(
				<TypeaheadComponent
					addTokenForValue={addTokenForValue}
					options={options}
					parse={parse}
				/>
			);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.ENTER });

				await wait(() => {
					expect(parse).toHaveBeenNthCalledWith(1, { name: 'foo' });
					expect(parse).toHaveBeenNthCalledWith(2, { name: 'bar' });
					expect(parse).toHaveBeenNthCalledWith(3, { name: 'baz' });
					expect(parse).toHaveBeenNthCalledWith(4, { name: 'foo' });
					expect(addTokenForValue).toHaveBeenCalledWith({ name: 'foo' });
				});
			});
		});

		test('Enter keystroke on a selected option', async () => {
			const addTokenForValue = jest.fn();
			const { container } = render(
				<TypeaheadComponent
					addTokenForValue={addTokenForValue}
					options={['foo', 'bar', 'baz']}
				/>
			);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.DOWN });
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.DOWN });
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.ENTER });

				await wait(() => {
					expect(addTokenForValue).toHaveBeenCalledWith('bar');
				});
			});
		});

		test('Enter keystroke with no options', async () => {
			const addTokenForValue = jest.fn();
			const { container } = render(
				<TypeaheadComponent
					addTokenForValue={addTokenForValue}
					options={[]}
				/>
			);

			fireEvent.change(container.querySelector('input'), { target: { value: 'test' } });

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.ENTER });

				await wait(() => {
					expect(addTokenForValue).toHaveBeenCalledWith('test');
				});
			});
		});

		test('Return keystroke on default option', async () => {
			const addTokenForValue = jest.fn();
			const { container } = render(
				<TypeaheadComponent
					addTokenForValue={addTokenForValue}
					options={['foo', 'bar', 'baz']}
				/>
			);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.RETURN });

				await wait(() => {
					expect(addTokenForValue).toHaveBeenCalledWith('foo');
				});
			});
		});

		test('Enter keystroke on a selected option', async () => {
			const addTokenForValue = jest.fn();
			const { container } = render(
				<TypeaheadComponent
					addTokenForValue={addTokenForValue}
					options={['foo', 'bar', 'baz']}
				/>
			);

			fireEvent.click(container.querySelector('input'));

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.DOWN });
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.DOWN });
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.RETURN });

				await wait(() => {
					expect(addTokenForValue).toHaveBeenCalledWith('bar');
				});
			});
		});

		test('Return keystroke with no options', async () => {
			const addTokenForValue = jest.fn();
			const { container } = render(
				<TypeaheadComponent
					addTokenForValue={addTokenForValue}
					options={[]}
				/>
			);

			fireEvent.change(container.querySelector('input'), { target: { value: 'test' } });

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.RETURN });

				await wait(() => {
					expect(addTokenForValue).toHaveBeenCalledWith('test');
				});
			});
		});

		test('Converting data type of a date w/ enter keystroke', async () => {
			const date = '1995-12-17T05:00:00.000Z';
			const addTokenForValue = jest.fn();
			const { container } = render(
				<TypeaheadComponent
					addTokenForValue={addTokenForValue}
					datatype="datetime"
					options={[]}
				/>
			);

			fireEvent.change(container.querySelector('input'), { target: { value: date } });

			await wait(async () => {
				fireEvent.keyDown(container.querySelector('input'), { keyCode: keyCodes.ENTER });

				await wait(() => {
					expect(addTokenForValue)
						.toHaveBeenCalledWith(new Date(date)
						.toISOString());
				});
			});
		});
	});

	// this one breaks if i try to use react testing library for the keydown
	test('Keystroke that is not handled by an event handler', async () => {
		const onKeyDown = jest.fn();
		const instance = renderer.create(
			<TypeaheadComponent
				onKeyDown={onKeyDown}
				options={['foo', 'bar', 'baz']}
			/>
		).getInstance();

		instance.state.value = 'b';
		instance._onKeyDown({ keyCode: 98 });
		expect(onKeyDown).toHaveBeenCalledWith({ keyCode: 98 }, 'b');
	});
});

describe('Date handling functionality', () => {

	test('Handle date picker close', () => {
		const instance = renderer.create(<TypeaheadComponent />).getInstance();

		instance.state.focused = true;
		instance.handleDatepickerClose({ stopPropagation: jest.fn() });
		expect(instance.state.focused).toBe(false);
	});

	test('Clear date picker input', () => {
		const instance = renderer.create(<TypeaheadComponent />).getInstance();

		instance.state.value = 'test';
		instance.clearDatepickerInput();
		expect(instance.state.value).toBe('');
	});

	test('Save date picker input', () => {
		const addTokenForValue = jest.fn();
		const instance = renderer.create(
			<TypeaheadComponent addTokenForValue={addTokenForValue} />
		).getInstance();

		instance.state.value = 'test';
		instance.saveDatepickerValue();

		expect(instance.state.value).toBe('');
		expect(addTokenForValue).toHaveBeenCalledWith('test');
	});
});

describe('On click outside -- 3rd party lib method', () => {

	test('Handle clicking outside input', () => {
		const instance = renderer.create(<TypeaheadComponent />).getInstance();

		instance.state.focused = true;
		instance.state.selectedOptionIndex = 5;
		instance.handleClickOutside();

		expect(instance.state.focused).toBe(false);
		expect(instance.state.selectedOptionIndex).toBe(-1);
	});
});
