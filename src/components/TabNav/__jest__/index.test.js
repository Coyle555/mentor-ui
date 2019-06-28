import React from 'react';
import {
	render,
	cleanup,
	fireEvent,
} from '@testing-library/react';

import { TabNav } from '../';

beforeEach(cleanup);

describe('TabNav component', () => {
	const tabs = [
		{
			label: 'foo',
			iconClass: 'fal home',
		},
	];

	it('Should render one tab', () => {
		const { container } = render(
			<TabNav
				tabs={tabs}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should render with className', () => {
		const className = 'polysacharides';
		const { container } = render(
			<TabNav
				className={className}
				tabs={tabs}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should have active class if given activeTab prop', () => {
		const { getByText } = render(
			<TabNav
				activeTab='foo'
				tabs={tabs}
			/>
		);

		const activeClass = JSON.stringify(
			getByText('foo').classList
		);

		expect(activeClass).toMatch(/tab-is-active/);
	});

	it('Should not have active class if not given activeTab prop', () => {
		const { getByText } = render(
			<TabNav
				tabs={tabs}
			/>
		);

		const activeClass = JSON.stringify(
			getByText('foo').classList
		);

		expect(activeClass).not.toMatch(/tab-is-active/);
	});

	it('Should invoke onClick prop when tab is clicked', () => {
		const handleClick = jest.fn((label) => label);
		const { getByText } = render(
			<TabNav
				onClick={handleClick}
				tabs={tabs}
			/>
		);

		fireEvent.click(getByText('foo'));

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick.mock.results[0].value).toEqual('foo');
	});

	it('Should render two tabs', () => {
		tabs.push({
			label: 'bar',
			iconClass: 'fal bar',
		});

		const { container } = render(
			<TabNav
				tabs={tabs}
			/>
		);

		expect(container).toMatchSnapshot();
	});
});

