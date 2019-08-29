jest.mock('../Portal', () => {
	return { Portal: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../NextRecord', () => {
	return { NextRecord: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../PreviousRecord', () => {
	return { PreviousRecord: props => <div>{JSON.stringify(props)}</div> };
});

jest.mock('../Form', () => {
	return { Form: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { EditModal } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

test('Edit mode disabled', () => {
	const tree = renderer.create(<EditModal editMode={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

