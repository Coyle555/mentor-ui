
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

		const childrenCount = Array.isArray(node.children) ? node.children.length : 0;

		const newNode = {
			childrenCount,
			...node,
			// last node in tree has no siblings coming after it
			hasSibling: tree[tree.length - 1] !== node,
			// index of node relative to parent
			order: ++order,
			path: path,
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
				level 
					? path.length ? path + '.' + order : '' + order
					: ''
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

	return convertedTree;
}


// handles the hovering logic while dragging a node in a separate thread
self.onmessage = function(event) {

 	const {
 		draggedNode,
 		hoveredNode,
 		tree,
 		droppedOnNewParent,
 	} = event.data;
 	

  	// get new parent to insert at
 		let insertNodeParent;

 		if (hoveredNode.level === 0 || hoveredNode.level === 1) {
 			insertNodeParent = tree;
 		} else {
 			insertNodeParent = tree.children;
 		}

  	
  	const hoveredNodePath = hoveredNode.path
  		? String(hoveredNode.path).split('.')
  		: [];

  	hoveredNodePath.forEach((index, i) => {
  		
  		insertNodeParent = insertNodeParent[+index]

  		if (i !== hoveredNodePath.length - 1) {
  			insertNodeParent = insertNodeParent.children;
  		} 

  	});
 
  	// if we're dropping on top of a node instead of above,
  	// then the insertNodeParent needs to go one level deeper.
  	// store in a variable to account for possible position change
 	let newParent = insertNodeParent.children[hoveredNode.order]

  
 	// find node in tree and remove from current position
 	const draggedNodePath = draggedNode.path ? 
 		String(draggedNode.path).split('.')
 		: [];
 	
 	let removalNodeParent = tree.children

 	let nodeToInsert;
 	
 	if (draggedNode.level === 1) {

 		nodeToInsert = tree.children[draggedNode.order];
 		tree.children = tree.children.filter(v => v.id !== nodeToInsert.id);
 		// console.log('level is 1',{ nodeToInsert, draggedNode })
 	} else {
	 	
	 	draggedNodePath.forEach((index, i) => {

	 		removalNodeParent = removalNodeParent[+index]

	 		if (i !== draggedNodePath.length - 1) {
	 			removalNodeParent = removalNodeParent.children;
	 
	 		} else {

	 			nodeToInsert = removalNodeParent.children[draggedNode.order];

	 			//console.log(removalNodeParent.children.slice(), draggedNodePath, draggedNode);
	 			removalNodeParent.children.splice(draggedNode.order, 1);
	 			
	 		}
	 	}) 		
 	}

  	if (droppedOnNewParent) {
  		if (hoveredNode.level === 0) {
  			
  			tree.children.push(nodeToInsert);
  			console.log('insert at root', nodeToInsert, tree, hoveredNode, draggedNode);
  		} else if (newParent.id === nodeToInsert.id) {
  			console.log('cant drop on self...', newParent, nodeToInsert, draggedNode, hoveredNode);
  			return;
  		} else {
  			newParent.children.push(nodeToInsert);
  		}
  		
  	
  	} else {
  		
  		if (!insertNodeParent.children[hoveredNode.order]) {
 				
 				if (insertNodeParent.id === removalNodeParent.id) {
 					/*
						edge case - if dragged node is hovering over the last child of its current parent
						then the index to insert at will no longer exist because the 'children' arrays length
						shrunk by 1 when the old node was removed
 					*/
 					
 					insertNodeParent.children.push(nodeToInsert); 
 				
 				} else {

 					console.log('couldnt find index to insert at', hoveredNode.order);
					console.log({ draggedNode, hoveredNode });
					console.log({ insertNodeParent, removalNodeParent });
					return;
 				}
 				
 						
  			
  		
  		} else {
  			insertNodeParent.children.splice(hoveredNode.order, 0, nodeToInsert);
  		}	
  	}
 
  	postMessage([ tree, convertTree([tree]) ]);

};