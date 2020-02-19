import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ColorField } from './Color';
import { FileField } from './File';
import { ImageField } from './Image';
import { getMentorInput } from 'mentor-inputs';

export const Field = ({
	disabled,
	fieldId,
	onBlur,
	onChange,
	onDeleteFileClick,
	onOptionMatch,
	options,
	parse,
	parseMatchedValue,
	required,
	rowId,
	type,
	uploadFile,
	value,
	...props
}) => {
	type = Array.isArray(options) && type !== 'listfilter' ? 'select' : type;

	let Input;
	let inputProps = {
		disabled,
		name: fieldId,
		onBlur,
		onChange,
		type,
		value,
		...props.inputProps,
		required,
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
				onColorChange={onBlur}
				rowId={rowId}
			/>
		);

	} else {

		Input = getMentorInput(type);

		if (type === 'select') {

			inputProps.options = options;
			inputProps.parse = parse;

		} else if (type === 'listfilter') {

			delete inputProps.onBlur;
			inputProps.onMatch = onOptionMatch;
			inputProps.options = options;
			inputProps.parse = parse;

		} else if (type === 'date' || type === 'datetime') {

			inputProps.isUtc = !!props.utc;

		}

		Input = (
			<Input
				{...inputProps}
				{...props.inputProps}
				required={required}
			/>
		);
	}

	return Input;
}

Field.propTypes = {
	disabled: PropTypes.bool,
	fieldId: PropTypes.string,
	inputProps: PropTypes.object,
	onBlur: PropTypes.func,
	onDeleteFileClick: PropTypes.func,
	onOptionMatch: PropTypes.func,
	options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
	parse: PropTypes.func,
	required: PropTypes.bool,
	type: PropTypes.string,
	uploadFile: PropTypes.func,
	value: PropTypes.any
};

Field.defaultProps = {
	inputProps: {}
};
