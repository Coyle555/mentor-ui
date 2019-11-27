import React from 'react';

import { Field } from './Field';

export const Fields = ({
	data,
	fields,
	onBlur,
	onDeleteFileClick,
	onOptionMatch,
	uploadFile
}) => (
	fields.map(field => (
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
	))
);
