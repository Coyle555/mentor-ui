import React from 'react'
import PropTypes from 'prop-types';

import { InsertListItem } from './InsertListItem';

export const Title = ({ insertable, title }) => (
	<div className="title-container">
		{ !!title && <h2 className="title">{title}</h2> }
		{ insertable && <InsertListItem /> }
	</div>
);
