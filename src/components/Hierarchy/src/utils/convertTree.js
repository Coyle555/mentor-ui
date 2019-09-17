
export function convertTree(tree = [], level = 0, parent = null) {
	let convertedTree = [];

	if (tree.length === 0) return [];
	
	for (let node of tree) {
		const newNode = {
			...node,
			hasSibling: tree[tree.length - 1] !== node,
			level,
			parent
		};
		let subtree = [];

		if (node.expanded) {
			subtree = convertTree(node.children, level + 1, newNode);
		}

		newNode.descendants = node.expanded
			? node.childrenCount +
				subtree.reduce((acc, val) => (
					acc + val.childrenCount
				), 0)
			: 0;

		convertedTree = convertedTree.concat(newNode, ...subtree);
	}

	return convertedTree;
}
