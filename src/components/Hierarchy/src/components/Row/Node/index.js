import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tether from 'react-tether';
import { useDrag, useDrop } from 'react-dnd';

import { Handler } from '../Handler';

export const Node = ({
	buttonMenuIndex,
	canDrag,
	clickable,
	customButtons,
	customHandle,
	dispatch,
	draggedId,
	handlerRef,
	loading,
	node,
	nodeIndex,
	nodeStyle,
	onDrop,
	onHover,
	selectNode,
	selected,
	subtitle,
	title,
	
}) => {
	if (typeof customButtons === 'function') {
		customButtons = customButtons(node);
	}

	const openButtonMenu = useCallback(evt => {
		evt.stopPropagation();

		dispatch({ type: 'openButtonMenu', nodeIndex });
	}, []);

	const _style = useMemo(() => {
		if (typeof nodeStyle ==='function') {
			return nodeStyle(node);
		}

		return nodeStyle;
	}, [nodeStyle]);

	const ref = useRef(null);

	const [{ isDragging }, drag, preview ] = useDrag({
		item: { 
			type: 'NODE', 
			descendants: node.descendants,
			originalIndex: nodeIndex,
			index: nodeIndex, 
			id: node.id 
		},
		begin() {
			console.log('beginning dragging on node with id ', node.id);
			dispatch({ type: 'startDrag', draggedId: node.id });
		},
		end() {
			console.log('ending drag');
			dispatch({ type: 'endDrag' });
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [{ isOver }, drop] = useDrop({
		accept: 'NODE',
		canDrop(draggedItem, monitor) {
		 	return nodeIndex < draggedItem.index 
		 		|| nodeIndex > draggedItem.index + draggedItem.descendants;
			// cant drop on descendants
		},
		collect: monitor => ({
			isOver: monitor.isOver() && monitor.canDrop()
		}),		
		drop(item, monitor) {

			const droppedOnNode = ref.current.classList.contains('mui-node-isOver')
				&& node.id !== item.id;

			onDrop(item.index, nodeIndex, droppedOnNode);
		},
		hover(item, monitor) { 
			
  		if (!ref.current) return;
  		
  		const dragIndex = item.index;
  		const hoverIndex = nodeIndex

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) return;

			if (!monitor.canDrop()) return;

			// Determine rectangle on screen
			const { top, bottom } = ref.current.getBoundingClientRect();
			const hoverMiddleY = (bottom - top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			onHover(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	
	

	const nodeClasses = classNames({
		'mui-node-content': true,
		'mui-node-selected': !isDragging && selected,
		'mui-node-clickable': clickable,
		'mui-node-isDragging': isDragging,
		'mui-node-isOver': isOver,
	});

	return (
		<div
			ref={preview(drop(ref))}
			className={nodeClasses}
			onClick={() => selectNode(selected ? -1 : nodeIndex)}
			style={_style}
		>
		{
			!isDragging &&
			<React.Fragment>
				<Handler
					canDrag={canDrag}
					customHandle={customHandle}
					loading={loading}
					node={node}
					ref={drag}
				/>		
				<span>
					<div className="node-text-title">
						{title}
					</div>
					<div className="node-text-subtitle">
						{ typeof subtitle === 'function'
							? subtitle(node)
							: subtitle
						}
					</div>
				</span>
				{ Array.isArray(customButtons)
					&& customButtons.length > 0
					&& <Tether
						attachment="top left"
						targetAttachment="top right"
						constraints={[{ to: 'scrollParent' }]}
						renderTarget={ref => (
							<button
								className="node-buttons"
								onClick={openButtonMenu}
								ref={ref}
								type="button"
							>
								<i className="fal fa-ellipsis-v fa-3x" />
							</button>
						)}
						renderElement={ref => 
							buttonMenuIndex === nodeIndex
								&& 
								<div
									className="mui-hierarchy-buttons-container"
									ref={ref}
								>
									{ customButtons.map((btn, i) => (
										<div key={'btn' + nodeIndex + node.id + i}>
											{btn}
										</div>
									))}
								</div>
						}
					/>
				}
			</React.Fragment>
		}
		</div>
	);
};

Node.propTypes = {
	clickable: PropTypes.bool,
	customButtons: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.func
	]),
	node: PropTypes.object,
	nodeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	selected: PropTypes.bool,
	subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	title: PropTypes.string
};

Node.defaultProps = {
	customButtons: [],
	selected: false,
	subtitle: '',
	title: ''
};
