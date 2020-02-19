import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DEFAULT_HANDLER = <i className="far fa-bars fa-lg" />;

export const Handler = forwardRef(({ canDrag, customHandle, loading, node }, ref) => {
	const handlerClasses = classNames({
		'mui-node-handler': true,
		'mui-node-handler-draggable': canDrag
	});

	let handlerIcon = DEFAULT_HANDLER;

	if (!!loading) {
		handlerIcon = <i className="far fa-spinner mui-loading-spinner" />;
	} else if (typeof customHandle === 'function') {
		handlerIcon = customHandle(node);

		if (!handlerIcon) {
			handlerIcon = DEFAULT_HANDLER;
		}
	}

	return (
		<div 
			className={handlerClasses}
			ref={ref}
		>
			<div className="node-handler-icon">
				{handlerIcon}
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
