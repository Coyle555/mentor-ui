import React from 'react';
import {
	getMentorInput,
	ListFilter,
	TableInput,
	TextareaInput,
	SelectInput
} from 'mentor-inputs';

export function getInputComponent(field, props) {
	if (!!field.filter || field.type === 'listfilter') {
		delete props.onBlur;

		return (
			<ListFilter
				{...props}
				filter={field.filter}
				options={field.options}
				parse={field.parse}
			/>
		);

	} else if (!!field.options) {
		delete props.onMatch;

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

	} else if (field.multiline) {
		delete props.onMatch;

		return <TextareaInput {...props} />;

	} else {
		delete props.onMatch;
		const Input = getMentorInput(field.type);

		return <Input {...props} />;
	}

}
