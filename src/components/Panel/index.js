import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeClass } from 'utils/composeClass';

import './style.less';

export const PanelButton = ({
	className,
	iconClass,
	iconStyle,
	tip,
	onClick,
	style,
	isActive,
	...props
}) => (
	<button
		className={cn(
			className,
			{ "APMPanel-buttons-active": isActive },
			"btn",
		)}
		data-for="apm-tooltip"
		data-tip={tip}
		key={tip}
		onClick={onClick}
		style={style}
		{...props}
	>
		<i className={iconClass} style={props.iconStyle}/>
	</button>
);

PanelButton.propTypes = {
	iconClass: PropTypes.string,
	onClick: PropTypes.func,
	tip: PropTypes.string.isRequired,
}

export const Panel = ({
	className,
	isDraggable,
	...props }) => {
	const cc = composeClass('APMPanel', className);

	return (
		<div
			className={cn(
				cc(),
				{ 'APMPanel-draggable': isDraggable },
			)}
			style={props.containerStyle}
		>
			<div
				className={cc('header')}
				style={props.headerStyle}
			>
				<div className={cc('header-title')} >
					{props.title}
				</div>
				<div className={cc('header-buttons')}>
					{ props.customButtons }
				</div>
			</div>
			{ props.children }
		</div>
	);
};

Panel.propTypes = {
	containerClassName: PropTypes.string,
	containerStyle: PropTypes.object,
	customButtons: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]),
	className: PropTypes.string,
	title: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.string
	])
};

Panel.defaultProps = {
	title: ''
};
