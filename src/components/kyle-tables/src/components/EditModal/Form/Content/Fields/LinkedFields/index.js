import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Field } from '../Field';

export const LinkedFields = ({
	data,
	fields,
	onBlur,
	onDeleteFileClick,
	onOptionMatch,
	selectedField,
	uploadFile
}) => {

	const onChange = (err, val, name) => {

	}

	return (
		<div className="linked-fields">
			{ fields.map((field, i, arr) => {
				const fieldClasses = classNames({
					'field': true,
					'field-highlighted': field.label === selectedField
				});

				let disabled = field.updateable === false;

				if (i > 0) {
					const prevVal = data[arr[i - 1].id];

					disabled = prevVal === ''
						|| prevVal === undefined
						|| prevVal === null;
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
							value={data[field.id]}
						/>
					</div>
				);
			})}
		</div>
	);
}
