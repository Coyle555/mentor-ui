
// Convert nodes to the proper format before appending it to a node
// @nodeToAppendTo: the node object to append the nodes to
// @newNodes: list of new nodes to append to a node
// @parentIndex: index of the node to append to
export function appendNodes({ nodeToAppendTo, newNodes = [], parentIndex }) {
	const nodesToAppend = [];

	for (let node of newNodes) {
		nodesToAppend.push({
			childrenCount: Array.isArray(node.children) ? node.children.length : 0,
			...node,
			descendants: 0,
			expanded: false,
			// last node in tree has no siblings coming after it
			hasSibling: newNodes[newNodes.length - 1] !== node,
			level: nodeToAppendTo.level + 1,
			// index position of the parent in the list
			parent: parentIndex
		});
	}

	return nodesToAppend;
}
