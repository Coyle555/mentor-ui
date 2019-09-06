import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ColorField } from './Color';
import { FileField } from './File';
import { ImageField } from './Image';
import { getMentorInput } from 'mentor-inputs';

export const Field = ({
	fieldId,
	onDeleteFileClick,
	options,
	parse,
	parseMatchedValue,
	required,
	rowId,
	type,
	updateable,
	uploadFile,
	value,
	...props
}) => {
	type = Array.isArray(options) && type !== 'listfilter' ? 'select' : type;

	const onBlur = useCallback((error, value, name) => {
		if (error) return;

		props.onBlur(rowId, name, value);
	});

	const onOptionMatch = useCallback((value, name) => {
		props.onOptionMatch(rowId, name, value);
	});

	let Input;
	let inputProps = {
		disabled: !updateable,
		name: fieldId,
		onBlur,
		required,
		type,
		value
	};

	if (type === 'image') {
		Input = (
			<ImageField
				{...inputProps}
				fieldId={fieldId}
				onDeleteClick={onDeleteFileClick}
				rowId={rowId}
				uploadFile={uploadFile}
			/>
		);
	} else if (type === 'file') {
		Input = (
			<FileField
				{...inputProps}
				fieldId={fieldId}
				onDeleteClick={onDeleteFileClick}
				rowId={rowId}
				uploadFile={uploadFile}
			/>
		);
	} else if (type === 'color') {

		Input = (
			<ColorField
				{...inputProps}
				fieldId={fieldId}
				onColorChange={props.onBlur}
				rowId={rowId}
			/>
		);

	} else {

		Input = getMentorInput(type);

		if (type === 'select') {

			inputProps.options = options;
			inputProps.parse = parse;
			inputProps.parseMatchedValue = parseMatchedValue;

		} else if (type === 'listfilter') {

			delete inputProps.onBlur;
			inputProps.onMatch = onOptionMatch;
			inputProps.options = options;
			inputProps.parse = parse;
			inputProps.parseMatchedValue = parseMatchedValue;

		}

		Input = <Input {...inputProps} />;
	}

	return Input;
}

Field.propTypes = {
	fieldId: PropTypes.string,
	onBlur: PropTypes.func,
	onDeleteFileClick: PropTypes.func,
	onOptionMatch: PropTypes.func,
	options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
	parse: PropTypes.func,
	required: PropTypes.bool,
	type: PropTypes.string,
	updateable: PropTypes.bool,
	uploadFile: PropTypes.func,
	value: PropTypes.any
};

Field.defaultProps = {
	updateable: true
};
