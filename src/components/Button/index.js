import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

const Button = (props) => {
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
    ...btnAttributes
  } = props;

  return (
    <button
		  {...btnAttributes}
      className={classNames(
        "APMButton",
      { "APMButton-block": block },
      { "APMButton-light": isLight },
      { "APMButton-outline": isOutline },
      { "APMButton-is-mini": isMini },
      { "APMButton-end-cap-left": isLeftEndCap },
      { "APMButton-end-cap-right": isRightEndCap },
      { "APMButton-is-capless": isCapless },
      { "APMButton-is-medium": medium },
        className,
      )}>
      { children }
    </button>
  )
}

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
	isDisabled: PropTypes.bool
}

export default Button;
