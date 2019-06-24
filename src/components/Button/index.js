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
    isLight,
	  isMini,
    isOutline,
    isLeftEndCap,
    isRightEndCap,
    isCapless,
    text,
    ...btnAttributes
  } = props;

  const btnClass = classNames(
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
  );

  return (
    <button
		  {...btnAttributes}
      className={btnClass}>
      { children }
    </button>
  )
}

Button.propTypes = {
  /**
    Makes the component have more prominent text with a width that spans it's container
  */
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
	isCapless: PropTypes.bool
}


export default Button;
