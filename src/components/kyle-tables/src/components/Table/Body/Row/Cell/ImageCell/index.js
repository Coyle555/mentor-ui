import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

export const ImageCell = ({ colId, editMode, onDeleteClick, rowId, value }) => (

	!editMode
		? <img className="table-image-cell" src={value} />
		: <Fragment>
			<img className="table-image-cell" src={value} />
			<i
				className="fa fa-times table-cell-edit-image"
				data-testid="table-image-delete"
				onClick={() => onDeleteClick(rowId, colId)}
			/>
		</Fragment>
);

ImageCell.propTypes = {
	colId: PropTypes.string,
	editMode: PropTypes.bool,
	onDeleteClick: PropTypes.func,
	rowId: PropTypes.string,
	value: PropTypes.string
};

ImageCell.defaultProps = {
	editMode: false,
	value: ''
}
