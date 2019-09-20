
export function findNode(node, nodeToFind) {
	if (node.id === nodeToFind.id) {
		return node;
	}
	
	if (Array.isArray(node.children) && node.children.length > 0) {
		for (let child of node.children) {
			const nextNode = findNode(child, nodeToFind);

			// successful match
			if (!!nextNode) return nextNode;
		}
	}

	return null;
}
