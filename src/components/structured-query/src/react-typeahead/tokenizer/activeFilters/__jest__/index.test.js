import React from 'react';
import { ActiveFiltersClass } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from 'react-testing-library';

afterEach(cleanup);

describe('Rendering active filters', () => {
	test('No search tokens', () => {
		const tree = renderer.create(<ActiveFiltersClass />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Some search tokens passed in', () => {
		const tree = renderer.create(
			<ActiveFiltersClass searchTokens={[{ id: 'foo', category: 'Foo' }]} />
		).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Opening active filters with search tokens', async () => {
		const { container, queryByText } = render(
			<ActiveFiltersClass searchTokens={[{
				id: 'foo',
				category: 'Foo',
				value: 'value'
			}]} />);

		fireEvent.click(container.querySelector('span.input-group-addon'));

		await wait(() => {
			expect(queryByText('value')).toBeTruthy();
			expect(queryByText('Clear All')).toBeTruthy();
		});
	});

	test('Opening disabled active filters with search tokens', async () => {
		const { container, queryByText } = render(
			<ActiveFiltersClass
				disabled={true}
				searchTokens={[{
					id: 'foo',
					category: 'Foo',
					value: 'value'
				}]}
			/>);

		fireEvent.click(container.querySelector('span.input-group-addon'));

		await wait(() => {
			expect(queryByText('value')).toBeTruthy();
			expect(queryByText('Clear All')).toBeFalsy();
		});
	});
});

describe('Handle click outside -- 3rd party lib', () => {

	test('Handle click outside method', () => {
		const instance = renderer.create(<ActiveFiltersClass />).getInstance();

		instance.state.filtersActive = true;
		instance.handleClickOutside();
		expect(instance.state.filtersActive).toBe(false);
	});
});
