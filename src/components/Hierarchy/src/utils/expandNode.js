import { appendNodes } from './appendNodes';

export function expandNode({ parentIndex, nodesToAppend, tree }) {
	let node = tree[parentIndex];
	// path of parent node to root
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
	// any nodes with a parent in the path of the original node can be skipped over 
	// since those parent nodes dont get shifted; all other nodes will get shifted downwards
	for (let i = parentIndex + childrenToAppend.length + 1; i < newTree.length; i++) {
		if (path.hasOwnProperty(newTree[i].parent)) continue;

		newTree[i].parent += childrenToAppend.length;
	}

	return newTree;
}
