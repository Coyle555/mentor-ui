
export function collapseNode({ parentIndex, tree }) {
	let node = tree[parentIndex];
	const numDescendantsToRemove = node.descendants || 0;
	// path of parent node to root
	const path = { [parentIndex]: true };

	node.expanded = false;
	node.descendants -= numDescendantsToRemove;

	// update count of descendants
	while (node.parent !== null) {
		path[node.parent] = true;
		node = tree[node.parent];
		node.descendants -= numDescendantsToRemove;
	}

	const newTree = tree.slice();
	newTree.splice(parentIndex + 1, numDescendantsToRemove);

	// update the parent index of all nodes in the list that come after the collapsed node
	// any nodes with a parent in the path of the original node can be skipped over 
	// since those parent nodes dont get shifted; all other nodes will get shifted upwards
	for (let i = parentIndex + 1; i < newTree.length; i++) {
		if (path.hasOwnProperty(newTree[i].parent)) continue;

		newTree[i].parent -= numDescendantsToRemove;
	}

	return newTree;
}
