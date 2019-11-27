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
	const [fieldsOpen, setFieldsOpen] = useState(true);
	const [selectedField, setSelectedField] = useState('');
	const [content, setContent] = useState(null);

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
				selectField={setSelectedField}
			/>
			<div className="content">
				{ fieldsOpen &&
					<Fields
						data={data}
						fields={fields}
						onBlur={onBlur}
						onDeleteFileClick={onDeleteFileClick}
						onOptionMatch={onOptionMatch}
						selectedField={selectedField}
						uploadFile={uploadFile}
					/>
				}
				{content}
			</div>
		</div>
	);
};
