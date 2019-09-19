jest.mock('../Field', () => {
	return { Field: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../FieldList', () => {
	return { FieldList: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../Footer', () => {
	return { Footer: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { Form } from '../index';
import renderer from 'react-test-renderer';

describe('Rendering edit modal form', () => {
	test('Title of the form', () => {
		const tree = renderer.create(<Form title="Test Record" />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Fields in the form with one not updateable', () => {
		const fields = [
			{ id: 'foo', label: 'Foo', updateable: false }, 
			{ id: 'bar', label: 'Bar' }
		];
		const tree = renderer.create(<Form fields={fields} />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('Fields in the form', () => {
		const fields = [{ id: 'foo', label: 'Foo' }, { id: 'bar', label: 'Bar' }];
		const tree = renderer.create(<Form fields={fields} />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
