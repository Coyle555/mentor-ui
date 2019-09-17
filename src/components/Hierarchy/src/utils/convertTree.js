
export function convertTree(tree = [], level = 0) {
	let convertedTree = [];

	if (tree.length === 0) return [];
	
	for (let node of tree) {
		let subtree = [];

		if (node.expanded) {
			subtree = convertTree(node.children, level + 1);
		}

		delete node.children;

		convertedTree = convertedTree.concat(
			{
				...node,
				level,
				descendants: node.expanded
					? node.childrenCount +
						subtree.reduce((acc, val) => (
							acc + val.childrenCount
						), 0)
					: 0
			},
			...subtree
		);
	}

	return convertedTree;
}
