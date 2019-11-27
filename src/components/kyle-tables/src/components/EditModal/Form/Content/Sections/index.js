import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fuzzy from 'fuzzy';
import { useSpring, animated } from 'react-spring';

import { ListOfFields } from './ListOfFields';
import { TextInput } from 'mentor-inputs';

const secStyle = {
	borderBottom: '2px solid green',
	cursor: 'pointer',
	marginBottom: '5px',
	paddingBottom: '2px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center'
};

export const Sections = ({ fields, sections }) => {
	const [fieldsOpen, setFieldsOpen] = useState(true);
	console.log('sections', sections);

	const fieldClasses = classNames({
		'fas': true,
		'fa-chevron-left': !fieldsOpen,
		'fa-chevron-down': fieldsOpen,
		'fa-sm': true
	});

	return (
		<div className="sections">
			<div
				onClick={() => setFieldsOpen(!fieldsOpen)}
				style={secStyle}
			>
				Fields
				<i className={fieldClasses} style={{ marginRight: '3px' }} />
			</div>
			{ fieldsOpen && <ListOfFields fields={fields} /> }
			{ sections.map(section => (
				<div style={secStyle}>{section.label}</div>
			))}
		</div>
	);
};

Sections.propTypes = {
	sections: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired
	}))
};

Sections.defaultProps = {
	sections: []
};
