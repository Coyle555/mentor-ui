jest.mock('../Content', () => {
	return { Content: props => <div>{JSON.stringify(props)}</div> };
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

	test('Fields in the form', () => {
		const fields = [{ id: 'foo', label: 'Foo' }, { id: 'bar', label: 'Bar' }];
		const tree = renderer.create(<Form fields={fields} />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
