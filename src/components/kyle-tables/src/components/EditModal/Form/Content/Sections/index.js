import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ListOfFields } from './ListOfFields';

export const Sections = ({
	fields,
	fieldsOpen,
	openSection,
	sections,
	selectedSectionLabel,
	selectField
}) => {
	const iconClasses = classNames({
		'fas': true,
		'fa-chevron-left': !fieldsOpen,
		'fa-chevron-down': fieldsOpen,
	});

	return (
		<ul className="sections">
			<li
				className={classNames({
					'section-label': true,
					'section-highlighted': selectedSectionLabel === 'Fields'
				})}
				onClick={() => openSection({ content: null, label: 'Fields' })}
			>
				Fields
				<i className={iconClasses} />
			</li>
			{ fieldsOpen && (
				<li>
					<ListOfFields
						fields={fields}
						selectField={selectField}
					/>
				</li>
			)}
			{ sections.map((section, i) => (
				<li
					className={classNames({
						'section-label': true,
						'section-highlighted': section.label === selectedSectionLabel
					})}
					key={section.label + i}
					onClick={() => openSection(section)}
				>
					{section.label}
				</li>
			))}
		</ul>
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
