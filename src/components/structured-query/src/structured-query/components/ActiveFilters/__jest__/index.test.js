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

	test('Some search tokens passed in', () => {
		const tree = renderer.create(
			<ActiveFiltersComponent searchTokens={[{ id: 'foo', label: 'Foo' }]} />
		).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Opening active filters with search tokens', async () => {
		const { container, queryByText } = render(
			<ActiveFiltersComponent searchTokens={[{
				id: 'foo',
				label: 'Foo',
				value: 'value'
			}]} />);

		fireEvent.click(container.querySelector('span.left-addon.active-filter-container'));

		await wait(() => {
			expect(queryByText('value')).toBeTruthy();
			expect(queryByText('Clear All')).toBeTruthy();
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
