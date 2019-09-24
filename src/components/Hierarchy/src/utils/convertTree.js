
export function convertTree(tree = [], level = 0, parentIndex = null) {
	let convertedTree = [];

	if (tree.length === 0) return [];

	// total parent descendants so the actual position of the parent in the tree
	// list can be calculated accurately
	let totalParentDescendants = 0;
	
	for (let node of tree) {
		const childrenCount = Array.isArray(node.children)
			? node.children.length
			: 0;

		const newNode = {
			childrenCount,
			...node,
			// last node in tree has no siblings coming after it
			hasSibling: tree[tree.length - 1] !== node,
			level,
			// index position of the parent in the list
			parent: parentIndex
		};

		delete newNode.children;

		let subtree = [];

		// process the children as its own tree
		if (node.expanded) {
			subtree = convertTree(
				node.children,
				level + 1,
				// add one for the parent node of the subtree as you 
				// move down a level
				parentIndex !== null
					? parentIndex + totalParentDescendants + 1
					: 0
			);
		}

		// calculate all descendants of the current node
		newNode.descendants = node.expanded
			? childrenCount + subtree.reduce((acc, val) => acc + val.childrenCount, 0)
			: 0;

		// need to add one to account for the node just processed as a 
		// descendant of the parent
		totalParentDescendants += newNode.descendants + 1;
		convertedTree = convertedTree.concat(newNode, ...subtree);
	}

	return convertedTree;
}
