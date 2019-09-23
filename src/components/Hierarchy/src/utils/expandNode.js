import { appendNodes } from './appendNodes';

export function expandNode({ parentIndex, nodesToAppend, tree }) {
	let node = tree[parentIndex];
	const path = { [parentIndex]: true };

	const childrenToAppend = appendNodes({
		newNodes: nodesToAppend,
		nodeToAppendTo: node,
		parentIndex,
	});

	node.expanded = true;
	node.descendants += childrenToAppend.length;

	while (node.parent !== null) {
		path[node.parent] = true;
		node = tree[node.parent];
		node.descendants += childrenToAppend.length;
	}

	const newTree = tree.slice();
	newTree.splice(parentIndex + 1, 0, ...childrenToAppend);

	// update the parent index of all nodes in the list that come after the expanded node
	// we check against the original node level since only nodes higher than the level 
	// collapsed will be shifted downwards
	// also any nodes with the same parent as the selected node will not have a parent shift
	for (let i = parentIndex + childrenToAppend.length + 1; i < newTree.length; i++) {
		if (path.hasOwnProperty(newTree[i].parent)) continue;

		newTree[i].parent += childrenToAppend.length;
	}

	console.log('expanded', newTree);

	return newTree;
}
