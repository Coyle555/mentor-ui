import React from 'react';
import { QuickViewsComponent } from '../index';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

test('Quickview button default render', () => {
	const tree = renderer.create(<QuickViewsComponent />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Quickview button disabled render', () => {
	const tree = renderer.create(<QuickViewsComponent disabled={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Quickview button on click callback render', () => {
	function onClick() {}

	const tree = renderer.create(<QuickViewsComponent onClick={onClick} />);

	expect(tree).toMatchSnapshot();
});

test('Quickview button render with a view', () => {
	const view = { name: 'foo', icon: <i /> };

	const tree = renderer.create(<QuickViewsComponent view={view} />);

	expect(tree).toMatchSnapshot();
});

test('Quickview correct callback data on interaction', () => {
	function onClick(columns) {
		expect(columns).toStrictEqual(['foo', 'bar', 'baz']);
	}

	const view = {
		columns: ['foo', 'bar', 'baz'],
		name: 'foo'
	};

	const { container } = render(<QuickViewsComponent onClick={onClick} view={view} />);

	fireEvent.click(container.querySelector('button'));
});
