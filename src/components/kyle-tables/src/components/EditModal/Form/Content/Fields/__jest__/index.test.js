jest.mock('../Field', () => {
	return { Field: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { Fields } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

const data = {
	id: 'data_id',
	foo: 'foo_value',
	bar: 'bar_value'
};

test('Fields with an empty list of fields', () => {
	const tree = renderer.create(<Fields data={data} fields={[]} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Fields with a list of fields', () => {
	const fields = [
		{ id: 'foo', label: 'Foo' }, 
		{ id: 'bar', label: 'Bar' }
	];
	const tree = renderer.create(<Fields data={data} fields={fields} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Fields with a not updateable field', () => {
	const fields = [
		{ id: 'foo', label: 'Foo', updateable: false }, 
		{ id: 'bar', label: 'Bar' }
	];
	const tree = renderer.create(<Fields data={data} fields={fields} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Fields with a selected field', () => {
	const fields = [
		{ id: 'foo', label: 'Foo' }, 
		{ id: 'bar', label: 'Bar' }
	];
	const tree = renderer.create(<Fields data={data} fields={fields} selectedField="Foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Fields with a fields that link to each other', () => {
	const fields = [
		{ id: 'foo', label: 'Foo', linkToNext: true }, 
		{ id: 'bar', label: 'Bar', linkToPrev: true }
	];
	const tree = renderer.create(<Fields data={data} fields={fields} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Fields with a field that links to a field with no value', () => {
	const fields = [
		{ id: 'foo', label: 'Foo', linkToNext: true }, 
		{ id: 'bar', label: 'Bar', linkToPrev: true }
	];
	const data = { id: 'data', foo: null };
	const tree = renderer.create(<Fields data={data} fields={fields} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Fields with a field that links to a field with empty string value', () => {
	const fields = [
		{ id: 'foo', label: 'Foo', linkToNext: true }, 
		{ id: 'bar', label: 'Bar', linkToPrev: true }
	];
	const data = { id: 'data', foo: '', };
	const tree = renderer.create(<Fields data={data} fields={fields} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Fields with a field that links to a field with undefined value', () => {
	const fields = [
		{ id: 'foo', label: 'Foo', linkToNext: true }, 
		{ id: 'bar', label: 'Bar', linkToPrev: true }
	];
	const data = { id: 'data', foo: undefined };
	const tree = renderer.create(<Fields data={data} fields={fields} />).toJSON();

	expect(tree).toMatchSnapshot();
});
