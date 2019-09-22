import { appendNodes } from './appendNodes';

export function expandNode({ parentIndex, nodesToAppend, tree }) {
	let node = tree[parentIndex];

	const childrenToAppend = appendNodes({
		newNodes: nodesToAppend,
		nodeToAppendTo: node,
		parentIndex,
	});

	node.expanded = true;
	node.descendants += childrenToAppend.length;

	while (node.parent !== null) {
		node = tree[node.parent];
		node.descendants += childrenToAppend.length;
	}

	const newTree = tree.slice();
	newTree.splice(parentIndex + 1, 0, ...childrenToAppend);

	return newTree;
}
