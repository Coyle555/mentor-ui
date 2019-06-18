import React from 'react';
import { QuickView } from '../quickView';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup);

test('Quickview button default render', () => {
	const tree = renderer.create(<QuickView />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Quickview button disabled render', () => {
	const tree = renderer.create(<QuickView disabled={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Quickview button on click callback render', () => {
	function onClick() {}

	const tree = renderer.create(<QuickView onClick={onClick} />);

	expect(tree).toMatchSnapshot();
});

test('Quickview button render with a view', () => {
	const view = { tip: 'foo', icon: <i /> };

	const tree = renderer.create(<QuickView view={view} />);

	expect(tree).toMatchSnapshot();
});

test('Quickview correct callback data on interaction', () => {
	function onClick(columns) {
		expect(columns).toStrictEqual(['foo', 'bar', 'baz']);
	}

	const view = {
		columns: ['foo', 'bar', 'baz'],
		icon: <i />,
		tip: 'foo'
	};

	const { container } = render(<QuickView onClick={onClick} view={view} />);

	fireEvent.click(container.querySelector('button'));
});
