import React from 'react';
import { ActiveFiltersComponent, ActiveFilters } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

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

		await waitFor(() => {
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

		await waitFor(() => {
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

		await waitFor(() => {
			fireEvent.click(queryByText('Clear All'));
			expect(clearSearch).toHaveBeenCalled();
		});
	});
});

describe('Handle click outside -- 3rd party lib', () => {

	test('Handle click outside method', async () => {
		// Initialize component with search tokens, so filter list can be shown
		const { baseElement, container } = render(
			<ActiveFilters
				searchTokens={[{
					id: 'foo',
					label: 'Foo',
					operator: 'equals',
					value: 'value'
				}]} />
		);
		// make sure active filter list isn't already shown
		expect(container.querySelector('.active-filters-list')).not.toBeInTheDocument();
		fireEvent.click(container.querySelector('.active-filter-container'));
		await waitFor(() => {
			expect(container.querySelector('.active-filters-list')).toBeInTheDocument();
		});
		// click base element to simulate clicking outside the active filter list somewhere
		fireEvent.click(baseElement);
		await waitFor(() => {
			expect(container.querySelector('.some-element-outside')).not.toBeInTheDocument();
		});
	});
});
