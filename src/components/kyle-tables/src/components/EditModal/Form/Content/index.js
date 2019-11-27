import React from 'react'
import PropTypes from 'prop-types';

import { Field } from './Field';
import { Sections } from './Sections';

export const Content = ({
	data,
	fields,
	onBlur,
	onDeleteFileClick,
	onOptionMatch,
	sections,
	uploadFile
}) => {

	return (
		<div className="content-container">
			<Sections fields={fields} sections={sections} />
			<div className="content">
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
	);
};
