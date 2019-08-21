import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { Form } from './Form';
import { NextRecord } from './NextRecord';
import { PreviousRecord } from './PreviousRecord';

import './styles.less';

export const EditModal = ({ data, fields, editMode }) => {

	const [recordIndex, setRecordIndex] = useState(0);

	useEffect(() => {
		const editRoot = document.getElementById('mui-table-edit-root');

		if (editMode) {
			editRoot.style.display = 'flex';
			editRoot.style.justifyContent = 'space-between';
			editRoot.style.alignItems = 'center';
		} else {
			editRoot.style.display = 'none';
		}
	}, [editMode]);

	return createPortal(
		<Fragment>
			<PreviousRecord
				label={recordIndex > 0
					? data[recordIndex - 1].name
					: 'No Previous Record'
				}
				hasPrevious={recordIndex > 0}
			/>
			<Form
				fields={fields}
				data={data}
				title={data[recordIndex].name || 'Title'}
			/>
			<NextRecord onClick={() => setRecordIndex(recordIndex + 1)} />
		</Fragment>,
		document.getElementById('mui-table-edit-root')
	);
};

EditModal.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	editMode: PropTypes.bool,
	fields: PropTypes.arrayOf(PropTypes.object),
};

EditModal.defaultProps = {
	data: [],
	fields: [],
};
