import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';

import './styles.less';

export const ColorCell = (props) => (
	<div
		className="mui-table-color-cell"
		style={{ backgroundColor: props.color }}
	/>
);

ColorCell.propTypes = {
	color: PropTypes.string,
};

ColorCell.defaultProps = {
	color: '#fff'
};
