import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DEFAULT_HANDLER = <i className="far fa-bars fa-lg" />;

export const Handler = forwardRef(({ canDrag, customHandle, loading, node }, ref) => {
	const handlerClasses = classNames({
		'mui-node-handler': true,
		'mui-node-handler-draggable': canDrag
	});

	const handlerIcon = useMemo(() => {
		let customComponent;

		if (typeof customHandle === 'function') {
			customComponent = customHandle(node);
		} 
		
		if (customComponent) return customComponent;
		
		if (node.level === 0) {
			return null;
		}

		return DEFAULT_HANDLER;

	}, [customHandle, node]);


	return (
		<div 
			className={handlerClasses}
			ref={canDrag ? ref : null}
		>
			<div className="node-handler-icon">
				{
					loading 
						? <i className="far fa-spinner mui-loading-spinner" />
						: handlerIcon
				}
			</div>
		</div>
	);
});

Handler.propTypes = {
	canDrag: PropTypes.bool,
	customHandle: PropTypes.func,
	loading: PropTypes.bool,
	node: PropTypes.object
};
