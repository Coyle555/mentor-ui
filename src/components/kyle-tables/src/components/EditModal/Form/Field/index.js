import React from 'react';
import PropTypes from 'prop-types';

import { ColorField } from './Color';
import { DateField } from './Date';
import {
	getMentorInput,
	EmailInput,
	FileInput,
	FloatInput,
	IntegerInput,
	ListFilter,
	MoneyInput,
	SelectInput,
	TextInput,
	TextareaInput,
	UrlInput
} from 'mentor-inputs';

export const Field = ({ color, options, type, updateable, value }) => {

	if (type === 'listfilter') {

		return (
			<ListFilter
				disabled={!updateable}
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
				color={value}
				disabled={!updateable}
				value={value}
			/>
		);

	} else if (type === 'date' || type === 'datetime') {

		return (
			<DateField
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
			<div style={{display: 'flex', height: '100px', alignItems: 'center'}}>
				<div style={{ textAlign: 'center', width: '25%'}}>
					<img style={{ maxHeight: '75px' }} src={value} />
					<p style={{ color: 'red', margin: '15px 0 0 0', fontSize: '.7rem', fontWeight: 400, cursor: 'pointer' }}>Delete Image</p>
					{/*onClick={() => onDeleteClick(rowId, colId)}*/}
				</div>
				<div style={{height: '100%', width: '75%'}}>
					<FileInput label="Upload Image" />
				</div>
			</div>
		);

	} else if (type === 'file') {
		
		return (
			<div style={{display: 'flex', height: '100px', alignItems: 'center'}}>
				<div style={{ textAlign: 'center', width: '25%'}}>
					<a href={value} download style={{ fontSize: '.9rem', fontWeight: 500 }}>File</a>
					<p style={{ color: 'red', margin: '15px 0 0 0', fontSize: '.7rem', fontWeight: 400, cursor: 'pointer' }}>Delete File</p>
					{/*onClick={() => onDeleteClick(rowId, colId)}*/}
				</div>
				<div style={{height: '100%', width: '75%'}}>
					<FileInput label="Upload File" />
				</div>
			</div>
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
	color: PropTypes.bool,
	type: PropTypes.string,
	updateable: PropTypes.bool
};

Field.defaultProps = {
	color: false,
	updateable: true
};
