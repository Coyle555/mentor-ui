import React from 'react';
import PropTypes from 'prop-types';

import { Field } from './Field';
import { Footer } from './Footer';

export const Form = ({ data, fields, title }) => {

	return (
		<div className="edit-form">
			<h2 className="title">{title}</h2>
			<div className="field-container">
				{ fields.map(field => (
					<div
						className="field"
						key={field.id}
					>
						{field.label}
						<Field {...field} />
					</div>
				))}
			</div>
			<Footer />
		</div>
	);
};

Form.propTypes = {
	data: PropTypes.object,
	fields: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		label: PropTypes.string
	})),
	title: PropTypes.string
};

Form.defaultProps = {
	data: {},
	fields: [],
	title: ''
};
