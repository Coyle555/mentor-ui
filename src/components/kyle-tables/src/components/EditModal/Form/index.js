import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import { Field } from './Field';
import { FieldList } from './FieldList';
import { Footer } from './Footer';

export const Form = ({
	currentIndex,
	data,
	fields,
	hasNext,
	hasPrevious,
	onBlur,
	onDeleteFileClick,
	onNextClick,
	onOptionMatch,
	onPreviousClick,
	title,
	totalRecords,
	uploadFile
}) => {
	const direction = useRef(currentIndex);
	const leftFields = fields.slice(0, Math.floor(fields.length / 2));
	const rightFields = fields.slice(Math.floor(fields.length / 2));

	// determine which direction the modal should slide in the next/prev record
	const x = currentIndex < direction.current ? -200 : 200;
	direction.current = currentIndex;

	const motionProps = useSpring({
		from: { opacity: 0, transform: `translateX(${x}px)` },
		to: { opacity: 1, transform: 'translateX(0px)' },
		reset: true
	});

	return (
		<animated.div className="edit-form" style={motionProps}>
			<h2 className="title">{title}</h2>
			<div className="field-container">
				<div className="list-of-fields">
					<FieldList fields={fields} />
				</div>
				<div className="fields">
					{ fields.map(field => (
						<div className="field" key={'field' + field.id}>
							<label>{field.label}</label>
							{ field.updateable === false
								&& <span className="cannot-update">
									Field cannot be changed
								</span>
							}
							<Field
								{...field}
								fieldId={field.id}
								onBlur={onBlur}
								onDeleteFileClick={onDeleteFileClick}
								onOptionMatch={onOptionMatch}
								rowId={data.id}
								value={data[field.id]}
								uploadFile={uploadFile}
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
		</animated.div>
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
