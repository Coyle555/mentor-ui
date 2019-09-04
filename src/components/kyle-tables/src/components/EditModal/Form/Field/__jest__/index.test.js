jest.mock('mentor-inputs', () => {
	return { getMentorInput: () => props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../Color', () => {
	return { ColorField: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../File', () => {
	return { FileField: props => <div>{JSON.stringify(props)}</div> };
});
jest.mock('../Image', () => {
	return { ImageField: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { Field } from '../index';
import renderer from 'react-test-renderer';

const props = {
	id: 'bar',
	onBlur: () => {},
	onDeleteFileClick: () => {},
	onOptionMatch: () => {},
	updateable: true,
	uploadFile: () => {},
	value: ''
};

test('Rendering an image field', () => {
	const tree = renderer.create(<Field type="image" {...props} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering a file field', () => {
	const tree = renderer.create(<Field type="file" {...props} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering an color field', () => {
	const tree = renderer.create(<Field type="color" {...props} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering options that is not a list filter', () => {
	const tree = renderer.create(<Field options={['foo']} {...props} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering options that is a list filter', () => {
	const tree = renderer.create(<Field options={['foo']} type="listfilter" {...props} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering text field', () => {
	const tree = renderer.create(<Field type="string" {...props} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering field with a parse', () => {
	const parse = jest.fn(val => val.name);
	const tree = renderer.create(
		<Field parse={parse} type="string" value={{ name: 'foo' }} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});
