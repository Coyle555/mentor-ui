import { findNode } from './findNode';

export function expandNode({ index, node, originalTree, tree }) {
	const originalNode = findNode(originalTree[0], node);

	if (!originalNode) return tree;

	const newTree = tree.slice();
	newTree.splice(index + 1, 0, ...originalNode.children);

	return newTree;
}
