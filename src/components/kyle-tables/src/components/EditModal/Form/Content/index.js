import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { Fields } from './Fields';
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
	const FieldsSectionComponent = (
		<Fields
			data={data}
			fields={fields}
			onBlur={onBlur}
			onDeleteFileClick={onDeleteFileClick}
			onOptionMatch={onOptionMatch}
			uploadFile={uploadFile}
		/>
	);

	const [fieldsOpen, setFieldsOpen] = useState(true);
	const [content, setContent] = useState(FieldsSectionComponent);
	sections = [{ label: 'Fields', content: FieldsSectionComponent }].concat(sections);

	const openSection = ({ content, label }) => {
		setFieldsOpen(label === 'Fields');
		setContent(React.isValidElement(content)
			? React.cloneElement(content, { row: data })
			: typeof content === 'function'
				? content(data)
				: null);
	};

	return (
		<div className="content-container">
			<Sections
				fields={fields}
				fieldsOpen={fieldsOpen}
				openSection={openSection}
				sections={sections}
			/>
			<div className="content">
				{content}
			</div>
		</div>
	);
};
