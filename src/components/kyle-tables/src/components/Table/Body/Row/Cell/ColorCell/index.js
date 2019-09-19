import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.less';

export const ColorCell = (props) => (
	<div
		className={classNames({"mui-table-color-cell": !!props.color})}
		style={{ backgroundColor: !!props.color ? props.color : '' }}
	/>
);

ColorCell.propTypes = {
	color: PropTypes.string,
};
