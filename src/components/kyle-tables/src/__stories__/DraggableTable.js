import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { useDrop, DndProvider } from 'react-dnd';
import { action } from 'storybook-utils';

import { Table } from '../index';

const DRAG_TYPE = 'TABLE_DRAG';

const DraggableArea = (props) => {
	const [collectedProps, drop] = useDrop({
		accept: DRAG_TYPE,
		drop: (item, monitor) => {
			console.log('item dropped', item);
		}
	});

	return (
		<div
			ref={drop}
			style={{
				background: 'lightgrey',
				height: window.innerHeight + 'px',
				width: '50%',
				fontSize: '2rem',
				float: 'left',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			Drop Rows Here
		</div>
	);
};

export const DraggableTable = ({ columns, data }) => {

	return (
		<DndProvider backend={HTML5Backend}>
			<DraggableArea />
			<div style={{
				height: window.innerHeight + 'px',
				width: '50%',
				float: 'right'
			}}>
				<Table 
					columns={columns}
					currentPage={1}
					data={data}
					draggable={{
						preview: row => row.string,
						dragType: DRAG_TYPE,
					}}
					pageSize={10}
					recordCount={10}
				/>
			</div>
		</DndProvider>
	);
};

