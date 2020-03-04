importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.js');

// eventually going to switch the worker to use lodash so the code can be cleaner

function convertTree(tree = [], level = 0, parentIndex = null) {
	tree = convert(tree, level, parentIndex, '');
	
	tree.forEach(node => {
		delete node.children;
	});

	return tree;
};

function convert(tree, level, parentIndex, path = '') {
	let convertedTree = [];

	if (tree.length === 0) return [];

	// total parent descendants so the actual position of the parent in the tree
	// list can be calculated accurately
	let totalParentDescendants = 0;
	let order = -1;

	for (let node of tree) {
		if (node) {
			
			const childrenCount = Array.isArray(node.children) ? node.children.length : 0;

			const newNode = {
				childrenCount,
				...node,
				// last node in tree has no siblings coming after it
				hasSibling: tree[tree.length - 1] !== node,
				// index of node relative to parent
				order: ++order,
				parentPath: path,
				path: level > 0 ? `${path}.children[${order}]` : path,
				level,
				// index position of the parent in the list
				parent: parentIndex,
			};

			let subtree = [];

			// process the children as its own tree
			if (node.expanded) {
				subtree = convert(
					node.children,
					level + 1,
					// add one for the parent node of the subtree as you 
					// move down a level
					parentIndex !== null
						? parentIndex + totalParentDescendants + 1
						: 0,
					// path enumeration for simpler traversal
						level > 1 ? `${path}.children[${order}]` : `children[${order}]`
				);
			}

			// calculate all descendants of the current node
			newNode.descendants = node.expanded
				? childrenCount + subtree.reduce((acc, val) => acc + val.children.length, 0)
				: 0;

			// need to add one to account for the node just processed as a 
			// descendant of the parent
			totalParentDescendants += newNode.descendants + 1;
			convertedTree = convertedTree.concat(newNode, ...subtree);
		}
	}

	return convertedTree;
}


// handles the hovering logic while dragging a node in a separate thread
self.onmessage = function(event) {
	
 	const {
 		draggedNode,
 		hoveredNode,
 		droppedOnNewParent,
 	} = event.data;
 	
 	const tree = _.cloneDeep(event.data.tree);
 	
 	console.log({ dragging: draggedNode.id, hovering: hoveredNode.id, draggedParent: _.get(tree, draggedNode.parentPath) });
  	// if we're dropping on top of a node instead of above,
  	// then the insertNodeParent needs to go one level deeper.
  	// store in a variable to account for possible position change
 	
 	// find node in tree and remove from current position
 	const nodeToInsert = _.cloneDeep(_.get(tree, draggedNode.path));
 	const draggedParent = _.get(tree, draggedNode.parentPath, tree);

 	if (!nodeToInsert) {
 		console.log({ nodeToInsert, draggedNode, hoveredNode });
 	}

 	// insert the node
 	if (droppedOnNewParent) {

 		const newParent = _.get(tree, hoveredNode.path, tree)
 		
 		newParent.children.push(nodeToInsert);

 	} else {

		const insertParent = _.get(tree, hoveredNode.parentPath);

		insertParent.children.splice(hoveredNode.order, 0, nodeToInsert);

		console.log('insert', _.cloneDeep(_.get(tree, hoveredNode.parentPath)));

 	}
 	// remove the placeholder
//  	
// 
//  	console.log({ draggedParent, draggedNode, x: _.get(tree, draggedNode.parentPath) })

 	if (draggedParent.children[draggedNode.order].id === draggedNode.id) {
 		draggedParent.children.splice(draggedNode.order, 1);
 	
 	} else {
 		console.log('not the index', draggedNode, hoveredNode);
 		draggedParent.children.splice(draggedNode.order + 1, 1);
 	}


 	//console.log('fin', tree, nodeToInsert);


  	postMessage([ tree, convertTree([tree]) ]);

};