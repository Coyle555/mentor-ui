import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fuzzy from 'fuzzy';
import { useSpring, animated } from 'react-spring';

import { ListOfFields } from './ListOfFields';
import { TextInput } from 'mentor-inputs';

export const Sections = ({ fields, fieldsOpen, openSection, sections }) => {
	return (
		<ul className="sections">
			{ sections.map((section, i) => (
				<Fragment>
					<li
						className="section-label"
						key={section.label + i}
						onClick={() => openSection(section)}
					>
						{section.label}
					</li>
					{ fieldsOpen
						&& section.label === 'Fields'
						&& <li><ListOfFields fields={fields} /></li>
					}
				</Fragment>
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
