import React from 'react';
import { upperFirst } from 'lodash';

const TABLE_INPUT_RE = /^\/?(\w+)/;

// Converts a cell value to a string
//
// @value(string|object|null|[object]) - the value passed into a cell
// @return(string) - the value in string format
export function convertCellToString(value) {
	if (value === null || value === undefined) {
		return '';
	}

	const valueType = typeof value;

	// handle primitive data types
	if (valueType === 'string' || valueType === 'number') {
		return value.toString();
	} else if (valueType === 'boolean') {
		return value.toString();
	// handle objects with a name field
	} else if (valueType === 'object' && value.name) {
		return value.name;
	}

	return '';
};

// An adapter that converts a model from the back end for use on the
// front end. Takes in a nested object and returns an array of objects
//
// @model(Object) - Has the following properties
// 	[id]: {
// 		asyncFilter(func): async filter for loading in options in a list filter
// 		category(string): name of the column
// 		collection([object]): if a column has a list of values to tokenize
// 		display(bool): true if column is viewed; false otherwise
// 		file(object): an object describing a file; has key image if its
// 			an image file; path key to tell where to upload a file
// 		id(string): unique identifier of a column
// 		insertable(bool): true to use this field when inserting a new 
// 			record; false otherwise
// 		options([string]): list of options to filter with
// 		order(number): the order in which a column is shown
// 		required(bool): true if the field is required when inserting or
// 			editing a record
// 		type(string): data type of the column
// 		updateable(bool): true if the user can edit the column in the
// 			record; false otherwise
//	}
// @return([Object]) - An array with objects
// 	[{
// 		id: id,
// 		category: displayName, 
// 		display: display,
// 		type: type,
// 		options: enum,
// 	}]
export function convertModel(model) {
	if (!model || typeof model !== 'object'
		|| (typeof model === 'object' && Array.isArray(model))) {

		return;
	}

	const columns = [];
	console.log({ model });

	Object.keys(model).forEach((key, i) => {
		columns.push({
			asyncFilter: model[key].asyncFilter,
			category: model[key].displayName || upperFirst(key),
			collection: !!model[key].collection,
			display: !model[key].hidden && model[key].display !== false,
			file: !!model[key].upload
				? {
					image: model[key].image,
					path: model[key].path
				}
				: undefined, 
			hidden: !!model[key].hidden,
			id: key,
			insertable: model[key].insertable,
			lookup: model[key].lookup,
			multiline: !!model[key].multiline,
			options: model[key].enum,
			required: !!model[key].required,
			tableOnInsert: model[key].drilldown && model[key].asyncFilter
				? {
					apiPath: model[key].asyncFilter,
					name: TABLE_INPUT_RE.exec(model[key].asyncFilter)[1]
				}
				: undefined,
			tokenize: !!model[key].collection || !!model[key].tokenize,
			type: model[key].type,
			updateable: model[key].updateable !== false
		});
	});

	return columns;
};
