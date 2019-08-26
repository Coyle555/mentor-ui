import React from 'react';
import PropTypes from 'prop-types';

import { Field } from './Field';
import { Footer } from './Footer';

export const Form = ({
	currentIndex,
	data,
	fields,
	hasNext,
	hasPrevious,
	onNextClick,
	onPreviousClick,
	title,
	totalRecords
}) => {

	const leftFields = fields.slice(0, Math.floor(fields.length / 2));
	const rightFields = fields.slice(Math.floor(fields.length / 2));

	return (
		<div className="edit-form">
			<h2 className="title">{title}</h2>
			<div className="field-container">
				<div className="left-fields">
					{ leftFields.map(field => (
						<div className="field" key={field.id}>
							<label>{field.label}</label>
							{ field.updateable === false
								&& <span className="cannot-update">
									Field cannot be changed
								</span>
							}
							<Field
								{...field}
								value={data[field.id]}
							/>
						</div>
					))}
				</div>
				<div className="right-fields">
					{ rightFields.map(field => (
						<div className="field" key={field.id}>
							<label>{field.label}</label>
							{ field.updateable === false
								&& <span className="cannot-update">
									Field cannot be changed
								</span>
							}
							<Field
								{...field}
								value={data[field.id]}
							/>
						</div>
					))}
				</div>
			</div>
			<Footer
				currentIndex={currentIndex + 1}
				hasNext={hasNext}
				hasPrevious={hasPrevious}
				onNextClick={onNextClick}
				onPreviousClick={onPreviousClick}
				totalRecords={totalRecords}
			/>
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
