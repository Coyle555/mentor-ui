import React, { useCallback, useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';

import { Field } from './Field';
import { LinkedFields } from './LinkedFields';

export const Fields = ({
	data,
	fields,
	onDeleteFileClick,
	selectedField,
	uploadFile,
	...props
}) => {
	const containerEl = useRef(null);

	useLayoutEffect(() => {
		if (!containerEl.current) return;

		for (let i = 0; i < containerEl.current.children.length; i++) {
			if (containerEl.current.children[i].className.includes('field-highlighted')) {
				containerEl.current.children[i].scrollIntoView({ behavior: 'smooth' });
				break;
			}
		}
	}, [selectedField]);

	const onBlur = useCallback((error, value, name) => {
		if (error) return;

		const field = fields.find(field => field.id === name);

		if (typeof field.parseMatchedValue === 'function') {
			value = field.parseMatchedValue(value);
		}

		props.onBlur(data.id, name, value);
	}, [data, props.onBlur]);

	const onOptionMatch = useCallback((value, name) => {
		const field = fields.find(field => field.id === name);

		if (typeof field.parseMatchedValue === 'function') {
			value = field.parseMatchedValue(value);
		}

		props.onOptionMatch(data.id, name, value);
	}, [data, props.onOptionMatch]);

	const fieldsToRender = [];
	let linkedFields = [];

	fields.forEach((field, i, arr) => {
		const fieldClasses = classNames({
			'field': true,
			'field-highlighted': field.label === selectedField
		});

		let disabled = field.updateable === false;

		// collect all linked fields to be processed together
		if (field.linkToNext || field.linkToPrev) {
			linkedFields.push(field);
		} else {
			if (linkedFields.length > 0) {
				fieldsToRender.push(
					<LinkedFields
						data={data}
						fields={linkedFields}
						key={'linkedfields' + i}
						onBlur={onBlur}
						onDeleteFileClick={onDeleteFileClick}
						onOptionMatch={onOptionMatch}
						selectedField={selectedField}
						uploadFile={uploadFile}
					/>
				);

				linkedFields = [];
			}

			fieldsToRender.push(
				<div
					className={fieldClasses}
					key={'field' + field.id}
				>
					<label>
						{field.label}
						{ field.required
							&& <span className="required">Required</span> }
					</label>
					{ field.updateable === false
						&& <span className="cannot-update">
							Field cannot be changed
						</span>
					}
					<Field
						{...field}
						disabled={disabled}
						fieldId={field.id}
						onBlur={onBlur}
						onDeleteFileClick={onDeleteFileClick}
						onOptionMatch={onOptionMatch}
						rowId={data.id}
						uploadFile={uploadFile}
						value={data[field.id]}
					/>
				</div>
			);
		}
	});

	// flush linked fields if they are at the end of the list of fields
	if (linkedFields.length > 0) {
		fieldsToRender.push(
			<LinkedFields
				data={data}
				fields={linkedFields}
				key="linkedFieldFlush"
				onBlur={onBlur}
				onDeleteFileClick={onDeleteFileClick}
				onOptionMatch={onOptionMatch}
				selectedField={selectedField}
				uploadFile={uploadFile}
			/>
		);
	}

	return (
		<div ref={containerEl}>
			{ fieldsToRender }
		</div>
	);
};
