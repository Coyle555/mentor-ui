import React from 'react'
import PropTypes from 'prop-types';

import { InsertListItem } from './InsertListItem';

export const Title = ({ classes, insertable, insertItemLabel, onInsertClick, title }) => (
	<div className={classes}>
		{ !!title && <h2 className="title">{title}</h2> }
		{ insertable &&
			<InsertListItem
				label={insertItemLabel}
				onClick={onInsertClick}
			/>
		}
	</div>
);
