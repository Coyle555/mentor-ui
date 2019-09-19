
export function convertTree(tree = [], level = 0, parent = null) {
	let convertedTree = [];

	if (tree.length === 0) return [];
	
	for (let node of tree) {
		const children = node.children;
		delete node.children;

		const newNode = {
			...node,
			// last node in tree has no siblings coming after it
			hasSibling: tree[tree.length - 1] !== node,
			level,
			parent
		};

		let subtree = [];

		if (node.expanded) {
			subtree = convertTree(children, level + 1, newNode);
		}

		convertedTree = convertedTree.concat(newNode, ...subtree);
	}

	return convertedTree;
}
