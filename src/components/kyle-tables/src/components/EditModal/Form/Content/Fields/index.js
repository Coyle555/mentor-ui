import React, { useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';

import { Field } from './Field';

export const Fields = ({
	data,
	fields,
	onBlur,
	onDeleteFileClick,
	onOptionMatch,
	selectedField,
	uploadFile
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

	return (
		<div ref={containerEl}>
			{ fields.map((field, i, arr) => {
				const fieldClasses = classNames({
					'field': true,
					'field-highlighted': field.label === selectedField,
					'field-link-to-next': !!field.linkToNext,
					'field-link-to-prev': !!field.linkToPrev,
				});

				let disabled = field.updateable === false;

				if (field.linkToPrev) {
					const prevVal = data[arr[i - 1].id];

					disabled = prevVal === ''
						|| prevVal === undefined
						|| prevVal === null;
				}

				return (
					<div
						className={fieldClasses}
						key={'field' + field.id}
					>
						<label>{field.label}</label>
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
							value={data[field.id]}
							uploadFile={uploadFile}
						/>
					</div>
				);
			})}
		</div>
	);
};
