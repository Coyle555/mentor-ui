import { appendNodes } from './appendNodes';

export function expandNode({ index, node, nodesToAppend, tree }) {
	const childrenToAppend = appendNodes({
		newNodes: nodesToAppend,
		nodeToAppendTo: node,
		parentIndex: index,
	});

	node.expanded = true;
	const newTree = tree.slice();
	newTree.splice(index + 1, 0, ...childrenToAppend);

	return newTree;
}
