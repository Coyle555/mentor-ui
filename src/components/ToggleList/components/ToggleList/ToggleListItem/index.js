import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import classNames from 'classnames';

export const ToggleListItem = ({ content, customClasses, expanded, title }) => {
	const [toggleExpand, setToggleExpand] = useState(expanded);

	const titleClasses = classNames(
		'title',
		{ [customClasses.title]: !!customClasses.title }
	);
	const contentClasses = classNames(
		'content',
		{ [customClasses.content]: !!customClasses.content }
	);

	return (
		<div className="mui-toggle-list-item">
			<div className={titleClasses} onClick={() => setToggleExpand(!toggleExpand)}>
				<Spring
					from={{ transform: 'rotate(0deg)' }}
					to={{ transform: `rotate(${toggleExpand ? 90 : 0}deg)` }}
				>
					{ props => <i className="fas fa-caret-right icon" style={props} /> }
				</Spring>
				{title}
			</div>
			{ toggleExpand &&
				<Spring
					from={{ opacity: 0 }}
					to={{ opacity: 1 }}
				>
					{ props => (
						<div className={contentClasses} style={props}>
							{content}
						</div>
					)}
				</Spring>
			}
		</div>
	);
};

ToggleListItem.propTypes = {
	content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
	customClasses: PropTypes.shape({
		content: PropTypes.string,
		title: PropTypes.string
	}),
	expanded: PropTypes.bool,
	title: PropTypes.string.isRequired
};

ToggleListItem.defaultProps = {
	customClasses: {},
};
