import React from 'react';
import PropTypes from 'prop-types';
import { composeNamespace } from 'compose-namespace';
import cn from 'classnames';

import './style.less';

export function TabNav(props) {
	const {
		className,
		tabs,
		activeTab,
		onClick,
	} = props;

	const cc = composeNamespace('APMTabNav', className);

	const renderTabs = (tabs, activeTab) => {
		return tabs.map(tData => {
			return (
			<button
				key={tData.label + 'apm'}
				className={cn(
					cc('tab'),
				 { [cc('tab-is-active')] : tData.label === activeTab },
				)}
				onClick={handleTabClick(
					onClick,
					tData.label,
				)}
			>
				<i className={cn(
					cc('tab-icon'),
					tData.iconClass,
				)}/>
				{tData.label}
			</button>
		)});
	};

	return (
		<div className={cc('container')}>
			{renderTabs(tabs, activeTab)}
		</div>
	);
};

function handleTabClick(onClick, label) {
	return (event) => {
		onClick(label);
	}
}

TabNav.propTypes = {
	className: PropTypes.string,
	tabs: PropTypes.array,
	initialTab: PropTypes.string,
	onClick: PropTypes.func,
};
