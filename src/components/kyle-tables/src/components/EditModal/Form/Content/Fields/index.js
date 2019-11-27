import React from 'react';
import classNames from 'classnames';

import { Field } from './Field';

export const Fields = ({
	data,
	fields,
	onBlur,
	onDeleteFileClick,
	onOptionMatch,
	selectedField,
	uploadFile
}) => (
	fields.map(field => {
		const fieldClasses = classNames({
			'field': true,
			'field-highlighted': field.label === selectedField
		});

		return (
			<div className={fieldClasses} key={'field' + field.id}>
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
		);
	})
);
