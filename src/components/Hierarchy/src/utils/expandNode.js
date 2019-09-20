import { findNode } from './findNode';
import { convertTree } from './convertTree';

export function expandNode({ index, node, originalTree, tree }) {
	let originalNode = findNode(originalTree[0], node);

	if (!originalNode) return tree;

	originalNode = convertTree(

	const newTree = tree.slice();
	newTree.splice(index + 1, 0, ...originalNode.children);

	return newTree;
}
