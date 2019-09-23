import { expandNode } from '../expandNode';

test('Expanding a node on root', () => {
	const baseTree = [{
		id: 'root',
		level: 0,
		parent: null,
		descendants: 0
	}];

	expect(expandNode({
		parentIndex: 0,
		nodesToAppend: [{ id: 'foo' }, { id: 'bar' }],
		tree: baseTree
	})).toEqual([
		{ expanded: true, id: 'root', level: 0, descendants: 2, parent: null },
		{ childrenCount: 0, expanded: false, hasSibling: true, id: 'foo', level: 1, descendants: 0, parent: 0 },
		{ childrenCount: 0, expanded: false, hasSibling: false, id: 'bar', level: 1, descendants: 0, parent: 0 },
	]);
});

test('Expanding a node on a tree with multiple branches', () => {
	const baseTree = [
		{ id: 'root', level: 0, descendants: 2, parent: null },
		{ id: 'root-child-1', level: 1, descendants: 0, parent: 0 },
		{ id: 'root-child-1', level: 1, descendants: 1, parent: 0 },
		{ id: 'child-1', level: 2, descendants: 0, parent: 2 },
	];

	expect(expandNode({
		parentIndex: 1,
		nodesToAppend: [{ id: 'foo' }, { id: 'bar' }],
		tree: baseTree
	})).toEqual([
		{ id: 'root', level: 0, descendants: 4, parent: null },
		{ id: 'root-child-1', expanded: true, level: 1, descendants: 2, parent: 0 },
		// --------------------------------------------------------
		// newly added nodes
		{ childrenCount: 0, expanded: false, id: 'foo', hasSibling: true, level: 2, descendants: 0, parent: 1 },
		{ childrenCount: 0, expanded: false, id: 'bar', hasSibling: false, level: 2, descendants: 0, parent: 1 },
		// ---------------------------------------------------------
		{ id: 'root-child-1', level: 1, descendants: 1, parent: 0 },
		{ id: 'child-1', level: 2, descendants: 0, parent: 4 },
	]);
});
