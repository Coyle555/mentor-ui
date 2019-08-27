import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Portal } from './Portal';
import { Form } from './Form';
import { NextRecord } from './NextRecord';
import { PreviousRecord } from './PreviousRecord';

import './styles.less';

export const EditModal = ({ data, fields, editMode }) => {

	const [recordIndex, setRecordIndex] = useState(0);

	const onNextClick = useCallback(() => {
		if (recordIndex + 1 >= data.length) return;

		setRecordIndex(recordIndex + 1);
	});

	const onPreviousClick = useCallback(() => {
		if (recordIndex - 1 < 0) return;

		setRecordIndex(recordIndex - 1);
	});

	const hasPrevious = recordIndex > 0;
	const hasNext = recordIndex + 1 < data.length;

	return (
		<Portal>
			<PreviousRecord
				label={hasPrevious
					? data[recordIndex - 1].name
					: 'No Previous Record'
				}
				hasPrevious={hasPrevious}
				onPreviousClick={onPreviousClick}
			/>
			<Form
				changeRecord={(newIndex) => setRecordIndex(newIndex)}
				currentIndex={recordIndex}
				data={data[recordIndex]}
				fields={fields}
				hasPrevious={hasPrevious}
				hasNext={hasNext}
				onNextClick={onNextClick}
				onPreviousClick={onPreviousClick}
				title={data[recordIndex].name || 'Title'}
				totalRecords={data.length}
			/>
			<NextRecord
				hasNext={hasNext}
				onClick={onNextClick}
			/>
		</Portal>
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
