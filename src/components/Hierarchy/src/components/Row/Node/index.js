import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tether from 'react-tether';

export const Node = ({
	buttonMenuIndex,
	clickable,
	customButtons,
	dispatch,
	node,
	nodeIndex,
	selected,
	subtitle,
	title
}) => {
	if (typeof customButtons === 'function') {
		customButtons = customButtons(node);
	}

	const openButtonMenu = useCallback(evt => {
		evt.stopPropagation();

		dispatch({ type: 'openButtonMenu', nodeIndex });
	});

	const nodeClasses = classNames({
		'mui-node-content': true,
		'mui-node-selected': selected,
		'mui-node-clickable': clickable
	});

	return (
		<div
			className={nodeClasses}
			onClick={() => { dispatch({ type: 'selectNode', nodeIndex })}}
		>
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
			{ customButtons.length > 0
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
							&& <div
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
