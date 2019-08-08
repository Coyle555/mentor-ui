import React from 'react';
import { Toolbar } from '../index';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

test('Default render of the toolbar', () => {
	const tree = renderer.create(<Toolbar />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render when collapsed', () => {
	const tree = renderer.create(<Toolbar isToolbarCollapsed={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render when collapsed and loadng', () => {
	const tree = renderer.create(<Toolbar loading={true} isToolbarCollapsed={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar renders when collapsed menu is open', () => {
	const { container, getByTestId } = render(<Toolbar isToolbarCollapsed={true} />);

	fireEvent.click(container.querySelector('button.btn-table'));
	expect(container.querySelector('button.btn-table.active')).toBeTruthy();
	expect(getByTestId('collapsedMenu')).toBeTruthy();
});

test('Toolbar render with quickviews', () => {
	const tree = renderer.create(<Toolbar quickViews={[{ tip: 'foo', icon: null, id: 'foo' }]} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render with a custom button', () => {
	const tree = renderer.create(<Toolbar customToolbarButtons={[{ icon: null, tip: 'foo' }]} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render with a single insert button', () => {
	const tree = renderer.create(<Toolbar insertable={true} singleInsertion={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render with a multiple insert button', () => {
	const tree = renderer.create(<Toolbar insertable={true} multipleInsertion={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render with a view columns button', () => {
	const tree = renderer.create(<Toolbar viewColumns={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render with a edit records button', () => {
	const tree = renderer.create(<Toolbar editable={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render with a delete records button', () => {
	const tree = renderer.create(<Toolbar deletable={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toolbar render with a export csv button', () => {
	const tree = renderer.create(<Toolbar csvURL="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Collapsed toolbar toggles on/off', () => {
	const { container, getByTestId } = render(<Toolbar isToolbarCollapsed={true} />);

	fireEvent.click(container.querySelector('button.btn-table'));
	expect(getByTestId('collapsedMenu')).toBeTruthy();

	fireEvent.click(container.querySelector('button.btn-table'));
	expect(container.querySelector('div.table-header-collapsed-menu')).toBeFalsy();
});
