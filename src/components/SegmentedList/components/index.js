import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spring, config } from 'react-spring/renderprops';

import { Title } from './Title';
import { ListItem } from './ListItem';

import '../styles.less';

export const SegmentedList = ({ InsertItemComponent, insertable, items, title }) => {
	const [insertingListItem, setInsertingListItem] = useState(false);
	const [display, setDisplay] = useState('none');

	const onInsertClick = () => {
		setDisplay('block');
		setInsertingListItem(!insertingListItem);
	};

	return (
		<div className="mui-segmented-list">
			{ (title || (insertable && React.isValidElement(InsertItemComponent))) &&
				<Title
					insertable={insertable && React.isValidElement(InsertItemComponent)}
					onInsertClick={onInsertClick}
					title={title}
				/>
			}
			<ul className="mui-segmented-list-ul">
				{ items.map((item, i) => (
					<ListItem key={`mui-sl-item-${i}`}>
						{item}
					</ListItem>
				))}
				{ insertable && React.isValidElement(InsertItemComponent) &&
					<Spring
						config={key => (key === 'left'
							? config.slow
							: config.default
						)}
						from={{ left: 75, opacity: 0 }}
						to={{ left: 0, opacity: 1 }}
						onRest={() => !insertingListItem && setDisplay('none')}
						reset={true}
						reverse={!insertingListItem}
					>
						{ props => (
							<ListItem style={{
								display,
								position: 'relative',
								...props
							}}>
								{ React.cloneElement(InsertItemComponent) }
							</ListItem>
						)}
					</Spring>
				}
			</ul>
		</div>
	);
};

SegmentedList.propTypes = {
	insertable: PropTypes.bool,
	items: PropTypes.array,
	title: PropTypes.string
};

SegmentedList.defaultProps = {
	insertable: false,
	items: [],
	title: ''
};
