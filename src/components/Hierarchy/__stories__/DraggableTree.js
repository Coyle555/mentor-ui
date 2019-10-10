import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Tree from '../index';

export const DraggableTree = (props) => {

	return (
		<DndProvider backend={HTML5Backend}>
			<div style={{ height: window.innerHeight + 'px' }}>
				<Tree
					canDrag={true}
					isVirtualized={false}
					tree={props.tree}
				/>
			</div>
		</DndProvider>
	);
};
