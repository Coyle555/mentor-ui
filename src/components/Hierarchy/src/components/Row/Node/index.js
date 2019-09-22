import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tether from 'react-tether';

export const Node = ({ node, onNodeClick, selected, subtitle, title }) => {
	const [buttonMenuOpen, setButtonMenuOpen] = useState(false);

	const openButtonMenu = useCallback(evt => {
		evt.stopPropagation();

		setButtonMenuOpen(!buttonMenuOpen);
	});

	const nodeClasses = classNames({
		'mui-node-content': true,
		'mui-node-selected': selected,
		'mui-node-clickable': typeof onNodeClick === 'function'
	});

	return (
		<div
			className={nodeClasses}
			onClick={() => { onNodeClick(node) }}
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
			<Tether
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
				renderElement={ref => (
					buttonMenuOpen &&
						<div style={{ border: '1px solid red' }} ref={ref}>
							<h2>Content</h2>
						</div>
					)
				}
			/>
		</div>
	);
};

Node.propTypes = {
	node: PropTypes.object,
	onNodeClick: PropTypes.func,
	selected: PropTypes.bool,
	subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	title: PropTypes.string
};

Node.defaultProps = {
	selected: false,
	subtitle: '',
	title: ''
};
