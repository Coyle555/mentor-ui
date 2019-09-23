
export function collapseNode({ parentIndex, tree }) {
	let node = tree[parentIndex];
	const numDescendantsToRemove = node.descendants;
	const origNodeLevel = node.level;

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
	// we check against the original node level since only nodes higher than the level 
	// collapsed will be shifted upwards
	// also any nodes with the same parent as the selected node will not have a parent shift
	for (let i = parentIndex + 1; i < newTree.length; i++) {
		if (newTree[i].level < tree[parentIndex].level
			|| newTree[i].parent === tree[parentIndex].parent) {

			continue;
		}

		newTree[i].parent -= numDescendantsToRemove;
	}

	return newTree;
}
