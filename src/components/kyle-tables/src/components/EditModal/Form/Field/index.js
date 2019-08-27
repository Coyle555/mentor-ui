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
	type,
	updateable,
	uploadFile,
	value
}) => {

	if (type === 'listfilter') {

		return (
			<ListFilter
				disabled={!updateable}
				onOptionMatch={onOptionMatch}
				options={options}
				value={value}
			/>
		);

	} else if (Array.isArray(options)) {

		return (
			<SelectInput
				disabled={!updateable}
				options={options}
				value={value}
			/>
		);

	} else if (type === 'color') {

		return (
			<ColorField
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'date' || type === 'datetime') {

		return (
			<DatePickerInput
				disabled={!updateable}
				type={type}
			/>
		);

	} else if (type === 'integer') {

		return (
			<IntegerInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'float') {

		return (
			<FloatInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'multiline') {

		return (
			<TextareaInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'money') {

		return (
			<MoneyInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'url') {

		return (
			<UrlInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'email') {

		return (
			<EmailInput
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'image') {
		
		return (
			<ImageField
				onDeleteClick={onDeleteFileClick}
				uploadFile={uploadFile}
				value={value}
			/>
		);

	} else if (type === 'file') {
		
		return (
			<FileField
				onDeleteClick={onDeleteFileClick}
				uploadFile={uploadFile}
				value={value}
			/>
		);

	} else {

		return (
			<TextInput
				disabled={!updateable}
				value={value}
			/>
		);

	}
}

Field.propTypes = {
	type: PropTypes.string,
	updateable: PropTypes.bool
};

Field.defaultProps = {
	updateable: true
};
