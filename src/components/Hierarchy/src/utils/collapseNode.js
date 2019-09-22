
export function collapseNode({ parentIndex, tree }) {
	let node = tree[parentIndex];
	const numDescendantsToRemove = node.descendants;

	node.expanded = false;
	node.descendants -= numDescendantsToRemove;

	// update count of descendants
	while (node.parent !== null) {
		node = tree[node.parent];
		node.descendants -= numDescendantsToRemove;
	}

	const newTree = tree.slice();
	newTree.splice(parentIndex + 1, numDescendantsToRemove);

	// update the parent index of all nodes in the list that come after the collapsed node
	for (let i = parentIndex + 1; i < newTree.length; i++) {
		tree[i].parent -= numDescendantsToRemove;
	}

	console.log(newTree);

	return newTree;
}
