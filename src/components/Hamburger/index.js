import React from 'react';

import cn from 'classnames';

import './style.less';

export const Hamburger = (props) => {
	const { isOpen } = props;

	return (
		<button className="APMHamburger">
			<div className={
				cn(
					"APMHamburger-inner",
				  { "APMHamburger-inner-open": isOpen }
				)}
			/>
		</button>
	)
}


