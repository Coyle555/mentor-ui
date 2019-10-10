import React, { useState } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { useDrop, DndProvider } from 'react-dnd';

import { Table } from '../index';

const DraggableArea = (props) => {
	const [bgColor, setBgColor] = useState('lightgrey');
	const [collectedProps, drop] = useDrop({
		accept: 'TABLE_ROW_DRAG',
		drop: (item, monitor) => {
			setBgColor('lightgrey');
			console.log('row dropped', item);
		},
		hover: (item, monitor) => {
			setBgColor('yellow');
		}
	});

	return (
		<div
			ref={drop}
			style={{
				background: bgColor,
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
					draggable={true}
					pageSize={10}
					recordCount={10}
				/>
			</div>
		</DndProvider>
	);
};

