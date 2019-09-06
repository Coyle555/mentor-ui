import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useInputState } from '../../hooks/index';
import '../../styles/index.less';

const TextInput = ({ validate, ...props }) => {

	const inputState = useInputState({ validate, ...props });

	return (
		<input
			autoComplete="false"
			placeholder="Enter text"
			type="text"
			{...props}
			{...inputState}
		/>
	);
}

export default TextInput;

