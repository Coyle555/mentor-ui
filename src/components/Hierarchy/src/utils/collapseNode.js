
export function collapseNode({ index, node, tree }) {
	const newTree = tree.slice();
	newTree.splice(index + 1, node.descendants);
	node.expanded = false;

	return newTree;
}
