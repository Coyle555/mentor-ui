import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// used for tokenizing an array of objects
export class TokenCell extends PureComponent {

	static propTypes = {
		colId: PropTypes.string,
		editMode: PropTypes.bool,
		onClick: PropTypes.func,
		rowId: PropTypes.string,
		token: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	}

	onClick = () => {
		const { colId, onClick, rowId, token } = this.props;

		onClick(rowId, colId, token);
	}

	render() {
		const { editMode, rowSelected, token } = this.props;
		const val = typeof token === 'object' ? token.name : token;

		return (
			<span className="table-token" title={val}>
				{ val }
				{ editMode && rowSelected &&
					<i
						className="fa fa-times token-delete"
						data-testid="token-delete"
						onClick={this.onClick}
					/>
				}
			</span>
		);
	}
};
