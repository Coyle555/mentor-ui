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
	const [section, setSection] = useState({ content: null, label: 'Fields' });

	const openSection = (section) => {
		setFieldsOpen(section.label === 'Fields');
		setSelectedField('');
		setSection(section);
	};

	return (
		<div className="content-container">
			<Sections
				fields={fields}
				fieldsOpen={fieldsOpen}
				openSection={openSection}
				sections={sections}
				selectedSectionLabel={section.label}
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
				{ React.isValidElement(section.content)
					? React.cloneElement(section.content, { row: data })
					: typeof section.content === 'function'
						? section.content(data)
						: null
				}
			</div>
		</div>
	);
};
