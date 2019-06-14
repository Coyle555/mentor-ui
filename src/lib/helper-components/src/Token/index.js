import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

// Token component displays a users query
class Token extends Component {

	static propTypes = {
		actionType: PropTypes.string,
		children: PropTypes.string,
		className: PropTypes.string,
		onRemoveCallback: PropTypes.func,
		onRemoveCallbackArgs: PropTypes.array
	}

	static defaultProps = {
		children: {},
		className: ''
	}

	onRemoveClick = (event) => {
		event.stopPropagation();

		const { onRemoveCallback, onRemoveCallbackArgs } = this.props;
		onRemoveCallback(...onRemoveCallbackArgs);
	};

	render() {
		const {
			className,
			actionType,
			children
		} = this.props;

		return (
			<div className={classNames(
				"APMToken",
				{
					"APMToken-action-buffer" : actionType,
					[className]: !!className
				}
			)}>
				{children}
				{ actionType &&
					<a
						className="APMToken-action"
						onClick={this.onRemoveClick}
					>
						<i className={classNames(
							{ "fal fa-times" : actionType === 'close' },
							"APMToken-action-icon"
						)} />
					</a>
				}
			</div>
		);
	}
}

export default Token;
