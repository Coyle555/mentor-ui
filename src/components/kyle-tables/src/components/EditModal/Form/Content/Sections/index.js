import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fuzzy from 'fuzzy';
import { useSpring, animated } from 'react-spring';

import { ListOfFields } from './ListOfFields';
import { TextInput } from 'mentor-inputs';

export const Sections = ({ fields, openSection, sections }) => {
	const [fieldsOpen, setFieldsOpen] = useState(true);

	const fieldClasses = classNames({
		'fas': true,
		'fa-chevron-left': !fieldsOpen,
		'fa-chevron-down': fieldsOpen,
		'fa-sm': true
	});

	return (
		<div className="sections">
			<div
				className="section-label"
				onClick={() => setFieldsOpen(!fieldsOpen)}
			>
				Fields
				<i className={fieldClasses} style={{ marginRight: '3px' }} />
			</div>
			{ fieldsOpen && <ListOfFields fields={fields} /> }
			{ sections.map((section, i) => (
				<div
					className="section-label"
					key={section.label + i}
					onClick={() => openSection(section.content)}
				>
					{section.label}
				</div>
			))}
		</div>
	);
};

Sections.propTypes = {
	fields: PropTypes.array,
	openSection: PropTypes.func,
	sections: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired
	}))
};

Sections.defaultProps = {
	sections: []
};
