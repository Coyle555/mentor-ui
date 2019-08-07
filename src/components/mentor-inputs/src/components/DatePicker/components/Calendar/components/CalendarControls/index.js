import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeNamespace } from 'compose-namespace';

import './style.less';

export function CalendarControls(props) {
	const {
		className,
		leftButtonOnClick,
		leftButtonDisabled,
		rightButtonOnClick,
		rightButtonDisabled,
		title,
	} = props;

	const cc = composeNamespace('APMCalendarControls', className);

	return (
		<div className={cc('container')}>
			<span className={cc('title')}>
				{title}
			</span>
			<div>
				<button
					type="button"
					data-testid="left-button"
					className={cn(
						cc('button'),
					 { [cc('button-disabled')]: leftButtonDisabled }
					)}
					onClick={leftButtonOnClick}
					disabled={leftButtonDisabled}
				>
					<i className={cn(
						cc('button-icon'),
						"far fa-angle-left",
					)}/>
				</button>
				<button
					type="button"
					data-testid="right-button"
					className={cn(
						cc('button'),
					 { [cc('button-disabled')]: rightButtonDisabled }
					)}
					onClick={rightButtonOnClick}
					disabled={rightButtonDisabled}
				>
					<i className={cn(
						cc('button-icon'),
						"far fa-angle-right",
					)}/>
				</button>
			</div>
		</div>
	);
};

CalendarControls.propTypes = {
	className: PropTypes.string,
	leftButtonOnClick: PropTypes.func.isRequired,
	leftButtonDisabled: PropTypes.bool,
	rightButtonOnClick: PropTypes.func.isRequired,
	rightButtonDisabled: PropTypes.bool,
	title: PropTypes.string.isRequired,
}
