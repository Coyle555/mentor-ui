import React from 'react';

import cn from 'classnames';

import './style.less';

function Hamburger(props) {
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

export default Hamburger;
