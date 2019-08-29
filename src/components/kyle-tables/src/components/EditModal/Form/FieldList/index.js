import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';

import { TextInput } from 'mentor-inputs';

export const FieldList = ({ fields }) => {
	const [fieldLabels, setFieldLabels] = useState(fields);
	const [searchValue, setSearchValue] = useState('');

	const onInputChange = useCallback((error, value, name) => {
		const newFields = fuzzy.filter(value, fields, { extract: val => val.label });

		setSearchValue(value);
		setFieldLabels(newFields.map(field => field.original));
	});

	return (
		<Fragment>
			<TextInput
				onChange={onInputChange}
				placeholder="Search fields"
				value={searchValue}
			/>
			<ul className="fields-ul">
				{ fieldLabels.map(field => (
					<li
						className="field-li"
						key={'label' + field.id}
					>
						{field.label}
					</li>
				))}
			</ul>
		</Fragment>
	);
};
