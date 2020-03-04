import React from 'react';
import { DndProvider, DndContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Tree } from './src';


const Hierarchy = ({ withDndProvider = true, ...props }) => {

	if (!withDndProvider) {
		return (
			<DndContext.Consumer>
				{
					({ dragDropManager }) => 
						dragDropManager !== undefined 
							? <Tree {...props} dragDropManager={dragDropManager} />
							: null
				}
			</DndContext.Consumer>
		)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<Tree {...props} />
		</DndProvider>
	);
}

export default Hierarchy;