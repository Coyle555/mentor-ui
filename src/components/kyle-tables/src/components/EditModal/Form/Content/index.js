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
	const [content, setContent] = useState(
		<Fields
			data={data}
			fields={fields}
			onBlur={onBlur}
			onDeleteFileClick={onDeleteFileClick}
			onOptionMatch={onOptionMatch}
			uploadFile={uploadFile}
		/>
	);

	const openSection = (content) => {
		if (React.isValidElement(content)) {
			setContent(React.cloneElement(content, { row: data }));
		} else if (typeof content === 'function') {
			setContent(content(data));
		} else {
			setContent(null);
		}
	};

	return (
		<div className="content-container">
			<Sections
				fields={fields}
				openSection={openSection}
				sections={sections}
			/>
			<div className="content">
				{content}
			</div>
		</div>
	);
};
