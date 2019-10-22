import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

/**
	A simple button component with some preset styles
*/
const Button = (props) => {
	const {
		block,
		className = '',
		children,
		medium,
		isBlue,
		isCircular,
		isLight,
		isMini,
		isOutline,
		isLeftEndCap,
		isRightEndCap,
		isCapless,
		...btnAttributes
	} = props;

	const btnClass = classNames(
		"APMButton",
		{ "APMButton-blue": isBlue },
		{ "APMButton-block": block },
		{ "APMButton-light": isLight && !isBlue },
		{ "APMButton-light-blue": isLight && isBlue },
		{ "APMButton-outline": isOutline },
		{ "APMButton-is-mini": isMini },
		{ "APMButton-end-cap-left": isLeftEndCap },
		{ "APMButton-end-cap-right": isRightEndCap },
		{ "APMButton-is-capless": isCapless },
		{ "APMButton-is-medium": medium },
		{ "APMButton-is-circular": isCircular },
		className,
	);

	return (
		<button
			{...btnAttributes}
			className={btnClass}
		>
			{ children }
		</button>
	);
}

Button.propTypes = {
	block: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	medium: PropTypes.bool,
	isBlue: PropTypes.bool,
	isCircular: PropTypes.bool,
	isLight: PropTypes.bool,
	isMini: PropTypes.bool,
	isOutline: PropTypes.bool,
	isLeftEndCap: PropTypes.bool,
	isRightEndCap: PropTypes.bool,
	isCapless: PropTypes.bool
}


export default Button;
