import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import { createDragPreview } from './tableRowDragPreview';

export function getDragType(props) {
	return props.dragType;
}

const rowSource = {
	beginDrag(props) {
		return {
			rowId: props.rowId,
			selectedRows: props.selectedRows,
		};
	},
	endDrag(props, monitor, component) {
		if (monitor.didDrop()) {
			const draggedRowIds = Object.keys(props.selectedRows);
			const { id, ...dropResults} = monitor.getDropResult();

			props.dragCb(draggedRowIds, id, dropResults);
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview()
	};
}

// provides custom message for dragPreview
export function formatDragMessage(selectedRows = {}) {
	return Object.keys(selectedRows).map(key => {
		return selectedRows[key].name;
	});
}

// wrap a row with react-dnd to make it draggable
// cannot be a stateless component since react 16
export class DragRow extends PureComponent {

	static propTypes = {
		connectDragPreview: PropTypes.func.isRequired,
		connectDragSource: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			dragPreviewText: ''
		};
	}

	componentDidMount() {
		const dragPreviewText = formatDragMessage(this.props.selectedRows);

		this.dragPreview = createDragPreview(dragPreviewText);

		this.props.connectDragPreview(this.dragPreview);

		this.setState({ dragPreviewText });
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedRows !== nextProps.selectedRows) {
			this.setState({
				dragPreviewText: formatDragMessage(nextProps.selectedRows)
			});
		}
	}

	componentDidUpdate(prevProps) {
		// handles updates to the dragPreview image as the dynamic numRows value changes
		this.dragPreview = createDragPreview(
			this.state.dragPreviewText,
			this.dragPreview
		);
	}

	render() {
		const { connectDragSource } = this.props;
		
		return connectDragSource(this.props.children);
	}
}

export const TableRowDraggable = DragSource(getDragType, rowSource, collect)(DragRow);

