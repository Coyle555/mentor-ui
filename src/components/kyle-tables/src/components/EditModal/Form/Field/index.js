import React from 'react';
import PropTypes from 'prop-types';

import { ColorField } from './Color';
import { FileField } from './File';
import { ImageField } from './Image';
import { getMentorInput } from 'mentor-inputs';

export const Field = ({
	onBlur,
	onDeleteFileClick,
	onOptionMatch,
	options,
	parse,
	required,
	type,
	updateable,
	uploadFile,
	value,
	...props
}) => {
	type = Array.isArray(options) && type !== 'listfilter' ? 'select' : type;

	let Input;
	let inputProps = {
		disabled: !updateable,
		required,
		type,
		value: typeof parse === 'function'
			? parse(value)
			: value
	};

	if (type === 'image') {
		Input = (
			<ImageField
				{...inputProps}
				onDeleteClick={onDeleteFileClick}
				uploadFile={uploadFile}
			/>
		);
	} else if (type === 'file') {
		Input = (
			<FileField
				{...inputProps}
				onDeleteClick={onDeleteFileClick}
				uploadFile={uploadFile}
			/>
		);
	} else if (type === 'color') {

		Input = <ColorField {...inputProps} />;

	} else {

		Input = getMentorInput(type);

		inputProps.onBlur = onBlur;
		inputProps.onMatch = type === 'listfilter' ? onOptionMatch: undefined;
		inputProps.options = Array.isArray(options) ? options: undefined;

		Input = <Input {...inputProps} />;
	}

	return Input;
}

Field.propTypes = {
	onBlur: PropTypes.func,
	onDeleteFileClick: PropTypes.func,
	onOptionMatch: PropTypes.func,
	options: PropTypes.array,
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
