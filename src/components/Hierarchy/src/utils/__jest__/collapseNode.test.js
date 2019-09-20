import { collapseNode } from '../collapseNode';

test('Collapsing a node', () => {
	const tree = [{ id: 1, expanded: true, descendants: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5}];

	expect(collapseNode({ index: 0, node: tree[0], tree })).toEqual([
		{ id: 1, expanded: false, descendants: 1 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 }
	]);
});
