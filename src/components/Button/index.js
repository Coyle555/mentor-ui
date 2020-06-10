import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

/**
	A simple button component with some preset styles
*/
const Button = React.forwardRef((props, ref) => {
	const {
		block,
		className = '',
		children,
		medium,
		isLight,
		isMini,
		isOutline,
		isLeftEndCap,
		isRightEndCap,
		isCapless,
		theme,
		...btnAttributes
	} = props;

	const btnClass = classNames(
		'APMButton',
		{ 'APMButton-default': theme === 'default' },
		{ 'APMButton-default-light': theme === 'default' && isLight },
		{ 'APMButton-primary': theme === 'primary' },
		{ 'APMButton-primary-light': theme === 'primary' && isLight },
		{ 'APMButton-success': theme === 'success' },
		{ 'APMButton-success-light': theme === 'success' && isLight },
		{ 'APMButton-danger': theme === 'danger' },
		{ 'APMButton-danger-light': theme === 'danger' && isLight },
		{ 'APMButton-block': block },
		{ 'APMButton-outline': isOutline },
		{ 'APMButton-is-mini': isMini },
		{ 'APMButton-end-cap-left': isLeftEndCap },
		{ 'APMButton-end-cap-right': isRightEndCap },
		{ 'APMButton-is-capless': isCapless },
		{ 'APMButton-is-medium': medium },
		className,
	);

	return (
		<button
			{...btnAttributes}
			className={btnClass}
			ref={ref}
		>
			{children}
		</button>
	);
});

Button.propTypes = {
	block: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	medium: PropTypes.bool,
	isLight: PropTypes.bool,
	isMini: PropTypes.bool,
	isOutline: PropTypes.bool,
	isLeftEndCap: PropTypes.bool,
	isRightEndCap: PropTypes.bool,
	isCapless: PropTypes.bool,
	theme: PropTypes.oneOf(['primary', 'danger', 'success', 'default'])
};

Button.defaultProps = {
	theme: 'default'
};


export { Button, Button as default };
