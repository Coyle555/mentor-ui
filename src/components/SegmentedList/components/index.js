import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spring, config } from 'react-spring/renderprops';

import { Title } from './Title';
import { ListItem } from './ListItem';

import '../styles.less';

export const SegmentedList = ({ InsertItemComponent, items, title }) => {
	const [listItems, setListItems] = useState(items);
	const [insertingListItem, setInsertingListItem] = useState(false);
	const [display, setDisplay] = useState('none');

	const onInsertClick = () => {
		setDisplay('block');
		setInsertingListItem(!insertingListItem);
	};

	const addItem = (item) => {
		setListItems(listItems.concat(item));
	};

	return (
		<div className="mui-segmented-list">
			{ (title || typeof InsertItemComponent === 'function') &&
				<Title
					insertable={typeof InsertItemComponent === 'function'}
					onInsertClick={onInsertClick}
					title={title}
				/>
			}
			<ul className="mui-segmented-list-ul">
				{ listItems.map((item, i) => (
					<ListItem key={`mui-sl-item-${title}-${i}`}>
						{item}
					</ListItem>
				))}
				{ typeof InsertItemComponent === 'function' &&
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
								<InsertItemComponent addItem={addItem} />
							</ListItem>
						)}
					</Spring>
				}
			</ul>
		</div>
	);
};

SegmentedList.propTypes = {
	InsertItemComponent: PropTypes.func,
	items: PropTypes.array.isRequired,
	title: PropTypes.string
};

SegmentedList.defaultProps = {
	InsertItemComponent: null,
	items: [],
	title: ''
};
