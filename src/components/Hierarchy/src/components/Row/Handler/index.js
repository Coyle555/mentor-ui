import React from 'react';
import PropTypes from 'prop-types';

export const Handler = ({ canDrag, loading, img }) => {
	let handlerIcon = <i className="far fa-bars fa-lg" />;

	if (!!loading) {
		handlerIcon = <i className="far fa-spinner mui-loading-spinner" />;
	} else if (!!img) {
		handlerIcon = <img src={img} />;
	}

	return (
		<div className="mui-node-handler">
			<div className="node-handler">
				{handlerIcon}
			</div>
		</div>
	);
};

Handler.propTypes = {
	canDrag: PropTypes.bool,
	loading: PropTypes.bool,
	img: PropTypes.string
};
