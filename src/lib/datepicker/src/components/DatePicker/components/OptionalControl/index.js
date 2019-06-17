import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { composeClass } from '../../../../../../components/utils';

import './style.less';


export function OptionalControl(props) {
	const {
		onClick,
		iconClass,
		children,
		className,
	} = props;

	const cc = composeClass(
		'APMOptionalControl',
		className,
	);

	return (
		<button
			className={cc()}
			onClick={onClick}
		>
			<i className={cn(
				cc('icon'),
			 { [cc('icon-rm')]: !!children },
				iconClass,
			)}/>
			{children}
		</button>
	)
}

OptionalControl.propTypes = {
	onClick: PropTypes.func.isRequired,
	iconClass: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.string,
}
