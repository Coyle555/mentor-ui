import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

export const InsertListItem = ({ onClick }) => {
	return (
		<Button
			className="insert-btn"
			onClick={onClick}
			type="button"
		>
			<i className="fas fa-plus" /> Add Items
		</Button>
	);
};

InsertListItem.propTypes = {
	onClick: PropTypes.func
};
