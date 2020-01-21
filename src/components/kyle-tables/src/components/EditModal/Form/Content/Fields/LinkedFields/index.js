import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Field } from '../Field';

export const LinkedFields = ({
	data,
	fields,
	onDeleteFileClick,
	selectedField,
	uploadFile,
	...props
}) => {
	const containerEl = useRef(null);
	const allRequired = useRef(fields.some(field => !!field.required));
	const notUpdateable = useRef(fields.some(field => field.updateable === false));

	// updates get fired only when all fields are valid and the user blurs from the
	// linked fields
	const [newData, setNewData] = useState(() => (
		fields.reduce((acc, field) => {
			acc[field.id] = data[field.id] !== undefined && data[field.id] !== null
				? data[field.id]
				: '';

			return acc;
		}, {})
	));
	const [errors, setErrors] = useState({});

	useLayoutEffect(() => {
		if (!containerEl.current) return;

		for (let i = 0; i < containerEl.current.children.length; i++) {
			if (containerEl.current.children[i].className.includes('field-highlighted')) {
				containerEl.current.children[i].scrollIntoView({ behavior: 'smooth' });
				break;
			}
		}
	}, [selectedField]);

	const onChange = (err, value, name) => {
		const data = Object.assign({}, newData, { [name]: value });
		const errors = Object.assign({}, errors, { [name]: !!err });
		const fieldIndex = fields.findIndex(field => field.id === name);
		const required = fields[fieldIndex].required;

		if (value !== '' || (value === '' && required)) {
			for (let i = fieldIndex + 1; i < fields.length; i++) {
				data[fields[i].id] = '';
				errors[fields[i].id] = true;
			}
		}

		setNewData(data);
		setErrors(errors);
	}

	const onBlur = (err, value, name) => {
		if (Object.values(errors).includes(true)) return;

		Object.entries(newData).forEach(([fieldId, value]) => {
			props.onBlur(false, value, fieldId);
		});
	};

	const onOptionMatch = (value, name) => {
		const data = Object.assign({}, newData, { [name]: value });
		const errors = Object.assign({}, errors, { [name]: false });
		const fieldIndex = fields.findIndex(field => field.id === name);

		for (let i = fieldIndex + 1; i < fields.length; i++) {
			data[fields[i].id] = '';
			errors[fields[i].id] = true;
		}
		
		setNewData(data);
		setErrors(errors);

		if (Object.values(errors).includes(true)) return;

		Object.entries(data).forEach(([fieldId, value]) => {
			props.onBlur(false, value, fieldId);
		});
	};

	return (
		<div
			className="linked-fields"
			ref={containerEl}
		>
			{ fields.map((field, i, arr) => {
				const fieldClasses = classNames({
					'field': true,
					'field-highlighted': field.label === selectedField
				});

				let disabled = field.updateable === false;
				let required;

				if (i > 0) {
					const prevVal = newData[arr[i - 1].id];
					disabled = prevVal === '';
					required = prevVal !== '';
				}

				return (
					<div
						className={fieldClasses}
						key={'field' + field.id}
					>
						<label>{field.label}</label>
						<i className="fal fa-link fa-xs linked" />
						{ notUpdateable.current 
							&& <span className="cannot-update">
								Field cannot be changed
							</span>
						}
						<Field
							{...field}
							disabled={notUpdateable.current || disabled}
							fieldId={field.id}
							onBlur={onBlur}
							onChange={onChange}
							onDeleteFileClick={onDeleteFileClick}
							onOptionMatch={onOptionMatch}
							required={required || allRequired.current}
							rowId={data.id}
							uploadFile={uploadFile}
							value={newData[field.id]}
						/>
					</div>
				);
			})}
		</div>
	);
}
