import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import './styles.less';

export const FileCell = ({ value }) => (
	!!value
		? <a download={true} href={value}>{value}</a>
		: ''
);

FileCell.propTypes = {
	value: PropTypes.string
};
