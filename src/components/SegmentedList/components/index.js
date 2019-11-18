import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Title } from './Title';
import { ListItem } from './ListItem';

import '../styles.less';

export const SegmentedList = ({ customClasses, InsertItemComponent, insertOrientation, items, title }) => {
	const [listItems, setListItems] = useState(items);
	const [insertingListItem, setInsertingListItem] = useState(false);

	const onInsertClick = () => {
		setInsertingListItem(!insertingListItem);
	};

	const addItem = (item) => {
		setListItems(listItems.concat(item));
	};

	const containerClasses = classNames(
		'mui-segmented-list',
		{ [customClasses.container]: !!customClasses.container }
	);

	const titleClasses = classNames(
		'title-container',
		{ [customClasses.title]: !!customClasses.title }
	);

	const listClasses = classNames(
		'mui-segmented-list-ul',
		{ [customClasses.list]: !!customClasses.list }
	);

	return (
		<div className={containerClasses}>
			{ (title || typeof InsertItemComponent === 'function') &&
				<Title
					classes={titleClasses}
					insertable={typeof InsertItemComponent === 'function'}
					onInsertClick={onInsertClick}
					title={title}
				/>
			}
			<ul className={listClasses}>
				{ typeof InsertItemComponent === 'function' && insertOrientation === 'before' && insertingListItem
					? <ListItem>
						<InsertItemComponent addItem={addItem} />
					</ListItem>
					: null
				}
				{ listItems.map((item, i) => (
					<ListItem
						customClasses={customClasses}
						key={`mui-sl-item-${title}-${i}`}
					>
						{item}
					</ListItem>
				))}
				{ typeof InsertItemComponent === 'function' && insertOrientation === 'after' && insertingListItem
					?  <ListItem>
						<InsertItemComponent addItem={addItem} />
					</ListItem>
					: null
				}
			</ul>
		</div>
	);
};

SegmentedList.propTypes = {
	customClasses: PropTypes.shape({
		container: PropTypes.string,
		list: PropTypes.string,
		title: PropTypes.string
	}),
	InsertItemComponent: PropTypes.func,
	insertOrientation: PropTypes.oneOf(['after', 'before']),
	items: PropTypes.array.isRequired,
	title: PropTypes.string
};

SegmentedList.defaultProps = {
	customClasses: {},
	InsertItemComponent: null,
	insertOrientation: 'after',
	items: [],
	title: ''
};
