import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './style.less';

export const Hamburger = ({ isOpen }) => {
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

Hamburger.propTypes = {
	isOpen: PropTypes.bool
};
