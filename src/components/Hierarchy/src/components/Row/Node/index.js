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
	handlerRef,
	loading,
	node,
	nodeIndex,
	nodeStyle,
	onDrop,
	onHover,
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
		item: { type: 'NODE', index: nodeIndex },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: 'NODE',
		drop(item, monitor) {
			onDrop(item.index, nodeIndex);
			//handleDrop(itemProps.id, index);
		},
		hover(item, monitor) { 
						
  			if (!ref.current) return;
  			
  			const dragIndex = item.index
  			const hoverIndex = nodeIndex
  			
  			// Don't replace items with themselves
  			if (dragIndex === hoverIndex) return;

  			// Determine rectangle on screen
  			const { top, bottom } = ref.current.getBoundingClientRect();
  			// Get vertical middle
  			const hoverMiddleY = (bottom - top) / 2;
  			// Determine mouse position
  			const clientOffset = monitor.getClientOffset();
  			// Get pixels to the top
  			const hoverClientY = clientOffset.y - top;
  
  			// Dragging downwards
  			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  				return;
  			}
  			// Dragging upwards
  			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  				return;
  			}
  
  			onHover(dragIndex, hoverIndex);
  			item.index = hoverIndex
 			/*
				If dragged item is moving left and level is > 1 then we need to:
					- decrease node level in state by 1 
					- push to children array of new parent node 
					-  If node has siblings after it we need that arrow animation
				
				If dragged item is moving upwards: 
					- If not first child then just change order
					- If first child, push to children array of previous node 
						- Change level to MAX(1, parent level - 1)
				
				If dragged item is moving downwards: 
					- If not last child then just change order
					- If last child, push to children array of following node 
						- Change level to MAX(1, parent level - 1)

				If dragged item is moving right and it has previous siblings:
					- Push to children array of previous sibling					
 			*/
		},
	});
	
	drag(drop(ref));

	const nodeClasses = classNames({
		'mui-node-content': true,
		'mui-node-selected': selected,
		'mui-node-clickable': clickable,
		'mui-node-isDragging': isDragging,
	});

	return (
		<div
			ref={ref}
			className={nodeClasses}
			onClick={() => { dispatch({ type: 'selectNode', nodeIndex })}}
			style={_style}
		>
			<Handler
				canDrag={canDrag}
				customHandle={customHandle}
				loading={loading}
				node={node}
				ref={handlerRef}
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
