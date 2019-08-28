import React from 'react';
import PropTypes from 'prop-types';

import { ColorField } from './Color';
import { FileField } from './File';
import { ImageField } from './Image';
import {
	getMentorInput,
	DatePickerInput,
	EmailInput,
	FloatInput,
	IntegerInput,
	ListFilter,
	MoneyInput,
	SelectInput,
	TextInput,
	TextareaInput,
	UrlInput
} from 'mentor-inputs';

export const Field = ({
	onBlur,
	onDeleteFileClick,
	onOptionMatch,
	options,
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
		value
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

		inputProps.onMatch = type === 'listfilter' ? onOptionMatch: undefined;
		inputProps.options = Array.isArray(options) ? options: undefined;

		Input = <Input {...inputProps} />;
	}

	return Input;
}

Field.propTypes = {
	type: PropTypes.string,
	updateable: PropTypes.bool
};

Field.defaultProps = {
	updateable: true
};
