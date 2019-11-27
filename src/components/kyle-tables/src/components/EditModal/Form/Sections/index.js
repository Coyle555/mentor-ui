import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fuzzy from 'fuzzy';
import { useSpring, animated } from 'react-spring';

import { ListOfFields } from './ListOfFields';
import { TextInput } from 'mentor-inputs';

export const Sections = ({ fields }) => {
	const [fieldsOpen, setFieldsOpen] = useState(true);

	const fieldClasses = classNames({
		'fas': true,
		'fa-chevron-left': !fieldsOpen,
		'fa-chevron-down': fieldsOpen,
		'fa-sm': true
	});

	return (
		<Fragment>
			<div
				onClick={() => setFieldsOpen(!fieldsOpen)}
				style={{
					borderBottom: '2px solid green',
					cursor: 'pointer',
					marginBottom: '5px',
					paddingBottom: '2px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				Fields
				<i className={fieldClasses} style={{ marginRight: '3px' }} />
			</div>
			{ fieldsOpen && <ListOfFields fields={fields} /> }
		</Fragment>
	);
};
