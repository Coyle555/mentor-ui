import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

const Button = (props) => {
  const {
    className = '',
    children,
	  medium,
    isLight,
	  isMini,
    isOutline,
    isLeftEndCap,
    isRightEndCap,
    isCapless,
    isDisabled,
    onClick, 
    ...btnAttributes
  } = props;

  return (
    <button
		  {...btnAttributes}
      onClick={!isDisabled ? onClick : () => {}}
      className={classNames(
        "APMButton",
      { "APMButton-light": isLight },
      { "APMButton-outline": isOutline },
      { "APMButton-is-mini": isMini },
      { "APMButton-end-cap-left": isLeftEndCap },
      { "APMButton-end-cap-right": isRightEndCap },
      { "APMButton-is-capless": isCapless },
      { "APMButton-is-disabled": isDisabled },
      { "APMButton-is-medium": medium },
        className,
      )}>
      { children }
    </button>
  )
}

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	onClick: PropTypes.func,
	medium: PropTypes.bool,
	isLight: PropTypes.bool,
	isMini: PropTypes.bool,
	isOutline: PropTypes.bool,
	isLeftEndCap: PropTypes.bool,
	isRightEndCap: PropTypes.bool,
	isCapless: PropTypes.bool,
	isDisabled: PropTypes.bool
}

export default Button;
