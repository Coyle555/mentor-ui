import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spring, config } from 'react-spring/renderprops';

import { Title } from './Title';
import { ListItem } from './ListItem';

import '../styles.less';

export const SegmentedList = ({ children, insertable, title }) => {
	const [insertingListItem, setInsertingListItem] = useState(false);
	const [display, setDisplay] = useState('none');

	const onInsertClick = () => {
		setDisplay('block');
		setInsertingListItem(!insertingListItem);
	};

	return (
		<div className="mui-segmented-list">
			{ (title || insertable) &&
				<Title
					insertable={insertable}
					onInsertClick={onInsertClick}
					title={title}
				/>
			}
			<ul className="mui-segmented-list-ul">
				{children}
				<Spring
					config={key => (key === 'left' ? config.slow : config.default)}
					from={{ left: 75, opacity: 0 }}
					to={{ left: 0, opacity: 1 }}
					onRest={() => !insertingListItem && setDisplay('none')}
					reset={true}
					reverse={!insertingListItem}
				>
					{ props => (
						<ListItem style={{ display, position: 'relative', ...props }}>
							Custom insert list item goes here
						</ListItem>
					)}
				</Spring>
			</ul>
		</div>
	);
};

SegmentedList.propTypes = {
	insertable: PropTypes.bool,
	title: PropTypes.string
};

SegmentedList.defaultProps = {
	insertable: false,
	title: ''
};
