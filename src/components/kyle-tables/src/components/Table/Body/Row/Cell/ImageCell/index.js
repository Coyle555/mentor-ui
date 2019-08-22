import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

export const ImageCell = ({ value }) => (
	!!value
		? <img className="table-image-cell" src={value} />
		: ''
);

ImageCell.propTypes = {
	value: PropTypes.string
};

ImageCell.defaultProps = {
	value: ''
}
