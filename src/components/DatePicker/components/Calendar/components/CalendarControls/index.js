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
					className={cn(
						cc('button'),
						cc('button-left'),
					 { [cc('button-left-disabled')]: leftButtonDisabled }
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
					className={cn(
						cc('button'),
						cc('button-right'),
					 { [cc('button-right-disabled')]: rightButtonDisabled }
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
