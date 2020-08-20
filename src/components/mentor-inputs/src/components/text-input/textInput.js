import React from 'react';
import PropTypes from 'prop-types';

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

TextInput.propTypes = {
	validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)])
};

export default TextInput;
