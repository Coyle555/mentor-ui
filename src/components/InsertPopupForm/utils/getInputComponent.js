import React from 'react';
import {
	getMentorInput,
	ListFilter,
	TableInput,
	TextareaInput,
	SelectInput
} from 'mentor-inputs';

export function getInputComponent(field, props) {
	if (!!field.options) {

		return (
			<SelectInput
				{...props}
				options={field.options}
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

	} else if (!!field.customFilter || field.type === 'listfilter') {
		delete props.onBlur;

		return (
			<ListFilter
				{...props}
				customFilter={filter}
				onMatch={this._handleOptionMatch}
			/>
		);
	} else if (field.multiline) {

		return <TextareaInput {...props} />;

	} else {
		const Input = getMentorInput(field.type);

		return <Input {...props} />;
	}

}
