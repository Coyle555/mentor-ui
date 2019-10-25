import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { composeClass } from 'utils/composeClass';
import { Panel } from '../index';

import './style.less';

export const PanelSeries = props => {
	const { className, children, isFlat, ...rest } = props;
	const cc = composeClass('APMPanelSeries', className);

	return (
		<Panel
			className={cc()}
			{...rest}
		>
			<div className={cn(
				cc('main'),
				{ [cc('main-flat')] : isFlat },
			)} >
				{children}
			</div>
		</Panel>
	)
};

PanelSeries.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};
