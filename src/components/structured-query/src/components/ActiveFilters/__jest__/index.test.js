import React from 'react';
import { ActiveFiltersComponent } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

describe('Rendering active filters', () => {
	test('No search tokens', () => {
		const tree = renderer.create(<ActiveFiltersComponent />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Opening active filters with search tokens', async () => {
		const { container, queryByText } = render(
			<ActiveFiltersComponent searchTokens={[{
				id: 'foo',
				label: 'Foo',
				operator: 'equals',
				value: 'value'
			}]} />);

		fireEvent.click(container.querySelector('span.left-addon.active-filter-container'));

		await wait(() => {
			expect(queryByText('value')).toBeTruthy();
			expect(queryByText('Clear All')).toBeTruthy();
		});
	});
});

describe('Clearing search', () => {
	test('Clear out a single search token', async () => {
		const onRemove = jest.fn();
		const { container, queryByText } = render(
			<ActiveFiltersComponent
				onRemove={onRemove}
				searchTokens={[{
					id: 'foo',
					label: 'Foo',
					operator: 'equals',
					value: 'value'
				}]}
			/>);

		fireEvent.click(container.querySelector('span.left-addon.active-filter-container'));

		await wait(() => {
			fireEvent.click(queryByText('Clear'));
			expect(onRemove).toHaveBeenCalled();
		});
	});

	test('Clear out all filters on click', async () => {
		const clearSearch = jest.fn();
		const { container, queryByText } = render(
			<ActiveFiltersComponent
				clearSearch={clearSearch}
				searchTokens={[{
					id: 'foo',
					label: 'Foo',
					operator: 'equals',
					value: 'value'
				}]}
			/>);

		fireEvent.click(container.querySelector('span.left-addon.active-filter-container'));

		await wait(() => {
			fireEvent.click(queryByText('Clear All'));
			expect(clearSearch).toHaveBeenCalled();
		});
	});
});

describe('Handle click outside -- 3rd party lib', () => {

	test('Handle click outside method', () => {
		const instance = renderer.create(<ActiveFiltersComponent />).getInstance();

		instance.state.filtersActive = true;
		instance.handleClickOutside();
		expect(instance.state.filtersActive).toBe(false);
	});
});
