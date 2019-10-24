import React from 'react';
import {
	getMentorInput,
	DatePickerInput,
	ListFilter,
	TableInput,
	SelectInput
} from 'mentor-inputs';

export function getInputComponent(field, props) {
	if (field.type === 'listfilter') {
		delete props.onBlur;

		return (
			<ListFilter
				{...props}
				options={field.options}
				parse={field.parse}
			/>
		);

	} else if (!!field.options && Array.isArray(field.options)) {
		delete props.onMatch;

		return (
			<SelectInput
				{...props}
				options={field.options}
				parse={field.parse}
			/>
		);

	} else if (field.type === 'date' || field.type === 'datetime') {

		return (
			<DatePickerInput
				{...props}
				type={field.type}
			/>
		);

	/*} else if (!!field.tableOnInsert) {

		InputComponent = (
			<TableInput
				{...props}
				apiInfo={field.tableOnInsert}
				onSelectData={this._handleOptionMatch}
			/>
		);*/

	} else {
		delete props.onMatch;
		const Input = getMentorInput(field.type);

		return <Input {...props} />;
	}

}
