import React from 'react';

function ToggleButton({ isOpen }) {
	return (
		<div
			className="apm-toggle-navigation"
			onClick={toggleNav}
		>
			<i
				className={cn(
					"fal fa-angle-right",
				  { "apm-toggle-navigation-icon-open" : navigationOpen },
				)}
				key="apm-nav-toggle-arrow"
			/>
		</div>
	)
}

export ToggleButton;
