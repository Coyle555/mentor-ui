
export function collapseNode({ parentIndex, tree }) {
	let node = tree[parentIndex];
	const numDescendantsToRemove = node.descendants;
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
	// we check against the original node level since only nodes higher than the level 
	// collapsed will be shifted upwards
	// also any nodes with the same parent as the selected node will not have a parent shift
	for (let i = parentIndex + 1; i < newTree.length; i++) {
		if (path.hasOwnProperty(newTree[i].parent)) continue;

		newTree[i].parent -= numDescendantsToRemove;
	}

	console.log('collapsed', newTree);

	return newTree;
}
