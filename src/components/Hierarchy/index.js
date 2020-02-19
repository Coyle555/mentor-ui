import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Tree } from './src';


const Hierarchy = ({ withDndProvider = true, ...props }) => {

	if (!withDndProvider) {
		return <Tree {...props} />
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<Tree {...props} />
		</DndProvider>
	);
}

export default Hierarchy;