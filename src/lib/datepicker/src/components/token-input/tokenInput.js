import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListFilter from '../list-filter';
import Token from './token';
import '../../styles/index.less';

class TokenInput extends Component {

	onDeleteClick = (token) => {
		if (typeof this.props.onDeleteClick === 'function') {
			this.props.onDeleteClick(token, this.props.name);
		}
	}
	
	render() {
		const { onDeleteClick, readOnly, tokens, ...rest } = this.props;

		return (
			<Fragment>
				{ tokens.map(token => (
					<Token
						key={token.name + Math.random()}
						name={token.name}
						onDeleteClick={this.onDeleteClick}
						token={token}
						readOnly={readOnly || typeof onDeleteClick !== 'function'}
					/>
				))}
				{ !readOnly && <ListFilter {...rest} /> }
			</Fragment>
		);
	}
};

TokenInput.propTypes = {
	onDeleteClick: PropTypes.func,
	readOnly: PropTypes.bool,
	tokens: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired
	}))
};

TokenInput.defaultProps = {
	onDeleteClick: null,
	readOnly: true,
	tokens: []
};

export default TokenInput;
