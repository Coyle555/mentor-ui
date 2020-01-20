import React, { useCallback, useState } from 'react';
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

	const onChange = (err, value, name) => {
		console.log('changing field', err, value, name);
		const data = Object.assign({}, newData, { [name]: value });
		const errors = Object.assign({}, errors, { [name]: !!err });
		const fieldIndex = fields.findIndex(field => field.id === name);

		for (let i = fieldIndex + 1; i < fields.length && value !== ''; i++) {
			data[fields[i].id] = '';
			errors[fields[i].id] = true;
		}

		setNewData(data);
		setErrors(errors);
	}

	const onBlur = useCallback((err, value, name) => {
		console.log('blurring field', err, value, name);
		props.onBlur(Object.values(errors).includes(true), value, name);
	}, [props.onBlur]);

	const onOptionMatch = useCallback((value, name) => {
		console.log('changing field', value, name);

		const data = Object.assign({}, newData, { [name]: value });
		const errors = Object.assign({}, errors, { [name]: !!err });
		const fieldIndex = fields.findIndex(field => field.id === name);

		for (let i = fieldIndex + 1; i < fields.length && value !== ''; i++) {
			data[fields[i].id] = '';
			errors[fields[i].id] = true;
		}

		setNewData(data);
		setErrors(errors);

		if (Object.values(errors).includes(true)) return;

		props.onOptionMatch(value, name);
	}, [props.onOptionMatch]);

	return (
		<div className="linked-fields">
			{ fields.map((field, i, arr) => {
				const fieldClasses = classNames({
					'field': true,
					'field-highlighted': field.label === selectedField
				});

				let disabled = field.updateable === false;

				if (i > 0) {
					const prevVal = arr[i - 1].id;
					disabled = newData[prevVal] === '';
				}

				return (
					<div
						className={fieldClasses}
						key={'field' + field.id}
					>
						<label>{field.label}</label>
						{ field.updateable === false
							&& <span className="cannot-update">
								Field cannot be changed
							</span>
						}
						<Field
							{...field}
							disabled={disabled}
							fieldId={field.id}
							onBlur={onBlur}
							onChange={onChange}
							onDeleteFileClick={onDeleteFileClick}
							onOptionMatch={onOptionMatch}
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