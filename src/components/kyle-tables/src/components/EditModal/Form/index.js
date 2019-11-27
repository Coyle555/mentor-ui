import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import classNames from 'classnames';

import { Field } from './Field';
import { Footer } from './Footer';
import { Sections } from './Sections';

export const Form = ({
	closeEditMode,
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
			<div className="title-container">
				<h2 className="title">{title}</h2>
				<i className="fal fa-times fa-lg close-form" onClick={closeEditMode} />
			</div>
			<div className="field-container">
				<div className="sections">
					<Sections fields={fields} />
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
	currentIndex: PropTypes.number,
	data: PropTypes.object,
	fields: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		label: PropTypes.string
	})),
	hasNext: PropTypes.bool,
	hasPrevious: PropTypes.bool,
	onBlur: PropTypes.func,
	onDeleteFileClick: PropTypes.func,
	onNextClick: PropTypes.func,
	onOptionMatch: PropTypes.func,
	onPreviousClick: PropTypes.func,
	title: PropTypes.string,
	totalRecords: PropTypes.number,
	uploadFile: PropTypes.func
};

Form.defaultProps = {
	data: {},
	fields: [],
	title: ''
};
