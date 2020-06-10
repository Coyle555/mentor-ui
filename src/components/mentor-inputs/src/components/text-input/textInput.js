import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const TextInput = React.forwardRef(({ validate, ...props }, ref) => {

  const inputState = useInputState({ validate, ...props });

  return (
    <input
      autoComplete="false"
      placeholder="Enter text"
      type="text"
      {...props}
      {...inputState}
      ref={ref}
    />
  );
});

export default TextInput;

