import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

export class EditImageCell extends PureComponent {

	static propTypes = {
		colId: PropTypes.string,
		onDeleteClick: PropTypes.func,
		rowId: PropTypes.string,
		value: PropTypes.string
	}

	onDeleteClick = (event) => {
		const { colId, onDeleteClick, rowId } = this.props;

		onDeleteClick(rowId, colId);
	}

	render() {
		const { value } = this.props;

		return (
			<Fragment>
				<img src={value} style={{ maxWidth: '50px' }} />
				<i
					className="fa fa-times table-cell-edit-image"
					data-testid="table-image-delete"
					onClick={this.onDeleteClick}
				/>
			</Fragment>
		);
	}
};
