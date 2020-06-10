import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const TextareaInput = React.forwardRef(({ validate, ...props }, ref) => {

	const inputState = useInputState({ validate, ...props });
	const textareaClasses = classNames('mui-textarea-resize-vert', inputState.className);

	return (
		<textarea
			autoComplete="false"
			cols={15}
			rows={5}
			placeholder="Enter text"
			{...props}
			{...inputState}
			className={textareaClasses}
			ref={ref}
		/>
	);
});

export default TextareaInput;
