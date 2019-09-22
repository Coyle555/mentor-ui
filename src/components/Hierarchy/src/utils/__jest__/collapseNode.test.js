import { collapseNode } from '../collapseNode';

test('Collapsing a node', () => {
	const tree = [
		{ id: 1, expanded: true, descendants: 4, parent: null },
		{ id: 2, expanded: true, descendants: 3, parent: 0 },
		{ id: 3, expanded: false, descendants: 0, parent: 1 },
		{ id: 4, expanded: false, descendants: 0, parent: 1 },
		{ id: 5, expanded: false, descendants: 0, parent: 1 }
	];

	expect(collapseNode({ parentIndex: 1, tree })).toEqual([
		{ id: 1, expanded: true, descendants: 1, parent: null },
		{ id: 2, expanded: false, descendants: 0, parent: 0 }
	]);
});

test('Collapsing a node on a tree with multiple branches', () => {
	const baseTree = [
		{ id: 'root', level: 0, descendants: 5, parent: null },
		{ id: 'root-child-1', level: 1, descendants: 2, parent: 0 },
		{ id: 'foo', hasSibling: true, level: 2, parent: 1 },
		{ id: 'bar', hasSibling: false, level: 2, parent: 1 },
		{ id: 'root-child-1', level: 1, descendants: 1, parent: 0 },
		{ id: 'child-1', level: 2, descendants: 0, parent: 4 },
	];

	expect(collapseNode({ parentIndex: 1, tree: baseTree })).toEqual([
		{ id: 'root', level: 0, descendants: 3, parent: null },
		{ id: 'root-child-1', expanded: false, level: 1, descendants: 0, parent: 0 },
		{ id: 'root-child-1', level: 1, descendants: 1, parent: 0 },
		{ id: 'child-1', level: 2, descendants: 0, parent: 2 },
	]);
});
