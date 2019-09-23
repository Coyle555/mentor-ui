import React from 'react';
import renderer from 'react-test-renderer';
import { Scaffold } from '../index';

test('Scaffold of a node at root', () => {
	const tree = [{ hasSibling: false }];
	const render = renderer.create(<Scaffold level={0} nodeIndex={0} tree={tree} />).toJSON();

	expect(render).toMatchSnapshot();
});

test('Scaffold of a node with a parent', () => {
	const tree = [{ hasSibling: false }, { hasSibling: false, parent: 0 }];
	const render = renderer.create(<Scaffold level={1} nodeIndex={1} tree={tree} />).toJSON();

	expect(render).toMatchSnapshot();
});

test('Scaffold of a node with a parent and child', () => {
	const tree = [{ hasSibling: false }, { hasSibling: false, parent: 0 }, { hasSibling: false, parent: 1 }];
	const render = renderer.create(<Scaffold level={1} nodeIndex={1} tree={tree} />).toJSON();

	expect(render).toMatchSnapshot();
});

test('Scaffold of a node with a parent and sibling', () => {
	const tree = [{ hasSibling: false }, { hasSibling: true, parent: 0 }, { hasSibling: false, parent: 0 }];
	const render = renderer.create(<Scaffold level={1} nodeIndex={1} tree={tree} />).toJSON();

	expect(render).toMatchSnapshot();
});
