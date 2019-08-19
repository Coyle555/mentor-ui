import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

// handle a drop on the row
const rowTarget = {
	drop(props, monitor) {
		return { id: props.rowId };
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		canDrop: monitor.canDrop(),
		isOver: monitor.isOver({ shallow: true })
	};
}

function getDropType(props) {
	return props.dropType;
}

export class DroppableRow extends PureComponent {

	render() {
		const {
			colSpan,
			connectDropTarget,
			desc,
			isOver,
			canDrop,
			name
		} = this.props;

		if (canDrop && isOver) {
			return connectDropTarget(
				<tr>
					<td
						className="table-cell-droppable font-bold bg-primary"
						colSpan={colSpan}
					>
						{`${name} - ${desc}`}
					</td>
				</tr>
			);
		}

		return connectDropTarget(this.props.children);
	}
}

export const TableRowDroppable = DropTarget(getDropType, rowTarget, collect)(DroppableRow);
