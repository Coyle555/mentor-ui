import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

export const InsertListItem = (props) => {
	return (
		<Button
			className="insert-btn"
			type="button"
		>
			<i className="fas fa-plus" /> Add Item
		</Button>
	);
};
