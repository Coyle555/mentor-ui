import { appendNodes } from '../appendNodes';

test('Appending no nodes', () => {
	expect(appendNodes({ nodeToAppendTo: {}, newNodes: [], parentIndex: 0 })).toEqual([]);
});

test('Appending a node with no children', () => {
	expect(appendNodes({
		nodeToAppendTo: { level: 0 },
		newNodes: [{ id: 'foo' }, { id: 'bar' }],
		parentIndex: 0
	})).toEqual([{
		id: 'foo',
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: true,
		level: 1,
		parent: 0
	}, {
		id: 'bar',
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: false,
		level: 1,
		parent: 0
	}]);
});

test('Appending a node with children', () => {
	expect(appendNodes({
		nodeToAppendTo: { level: 0 },
		newNodes: [{
			id: 'foo',
			children: [{ id: 'bar' }]
		}],
		parentIndex: 0
	})).toEqual([{
		id: 'foo',
		children: [{ id: 'bar' }],
		childrenCount: 1,
		descendants: 0,
		expanded: false,
		hasSibling: false,
		level: 1,
		parent: 0
	}]);
});
